let { fetch } = require('./fetch')
let { writePreprocessedData } = require('../utils/')
let BEARER_TOKEN = process.env.STRAVA_API_TOKEN // comes off the CLI or from github secrets
let STRAVA_URL = 'https://www.strava.com/api/v3/athlete/activities'
let pageSize = 200

async function main() {
  // keep requesting until we get a partial length repsonse (we're at the end)
  let fullRecordSet = await new Promise(async (res, rej) => {
    let requestAfter = 0
    let fullRecordSet = []
    while (true) {
      let response = await fetchStravaRecords(requestAfter)
      fullRecordSet.push(...response)
      requestAfter = +new Date(response[response.length - 1].start_date) / 1000
      if (response.length !== pageSize) {
        res(fullRecordSet)
        break
      }
    }
  })

  const formatted = processData(fullRecordSet)
  // now we have the full record set, we want to filter out types of activities we dont want
  // and then shrink the json to the smallest required size
  writePreprocessedData(formatted, 'routes')
}

async function fetchStravaRecords(fetchAfterThisDate) {
  let queryParams = new URLSearchParams({
    after: fetchAfterThisDate,
    per_page: 200,
  })

  console.log({ queryParams })

  return fetch(`${STRAVA_URL}?${queryParams}`, {
    headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
  })
    .then((res) => res.json())
    .catch(console.error)
}

function processData(_data) {
  return _data
    .filter((a) => a.type === 'Ride')
    .filter((a) => a.map.summary_polyline !== '') // nontrivial polylines only
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
    .map((a) => ({
      [a.id]: {
        id: a.id,
        type: a.type,
        map: {
          id: a.map.id,
          summary_polyline: a.map.summary_polyline,
          resource_state: a.map.resource_state,
        },
        start_date: a.start_date,
      },
    })) // this is the format in which the map layer expects to recieve the data
    .reduce((a, i) => {
      let [key, value] = Object.entries(i)[0]
      a[key] = value
      return a
    }, {})
}

main()
