import Vue from 'vue';
import Router from 'vue-router';

import Player from 'views/Player.vue';
import Songs from "views/Songs.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/player",
      name: "player",
      component: Player
    },

    {
      path: "/songs",
      name: "songs",
      component: Songs
    }
  ]
})
