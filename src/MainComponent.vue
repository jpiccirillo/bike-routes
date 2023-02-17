<template>
  <footer class="o-container">
    Plaintext here
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: ["copyright"],
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap");

footer {
  font-family: Source Sans Pro;
}

.o-container {
  background-color: #3d3d3d;
  line-height: 1.25;
  font-size: 14px;
  padding: 2em 0;
  margin-top: 2em;
}

.o-container aside {
  line-height: 1;
  margin-bottom: 1.8em;
}

.o-container aside a {
  color: white !important;
  text-decoration: underline;
}

.o-container aside > h2 {
  font-size: 1.2rem;
  font-family: "Libre Baskerville", "Times New Roman", serif;
  font-weight: 400;
  text-transform: none;
  margin: 0px 0px 10px 0px;
}

.o-container aside > p {
  margin: 5px 0px;
}

.o-container .copyright {
  margin-top: 1em;
  margin-bottom: 0px;
  text-align: left;
}
</style>
