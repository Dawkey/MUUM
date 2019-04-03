import Vue from 'vue';
import Router from 'vue-router';

import Songs from "views/Songs.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/songs",
      name: "songs",
      component: Songs
    }
  ]
})
