import Vue from "vue";
import VueRouter from "vue-router";
import User from "@/views/User"
import store from '@/store';
import axios from 'axios';
Vue.use(VueRouter);

const routes = [
  {
    component:User,
    path:"/user"
  }
];

const router = new VueRouter({
  routes
});







export default router;
