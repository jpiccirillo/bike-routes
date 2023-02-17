import MainComponent from "./MainComponent.vue";

export default {
  install(Vue, options) {
    Vue.component("bike-routes", MainComponent);
  },
};
