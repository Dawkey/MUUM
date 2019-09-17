import Vue from 'vue';
import Router from 'vue-router';

import Songs from "views/Songs.vue";
import Login from "views/Login.vue";
import Home from "views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/songs",
      name: "songs",
      component: Songs
    },

    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
})
