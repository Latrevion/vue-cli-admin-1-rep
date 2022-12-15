import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path:'/',
    name:'index',
    component:( )=>import('@/views/index.vue'),
    meta:{title:'admin'},
    children:[
        {

            path:'/index',
            name:'index',
            component:()=>import('@/views/index.vue'),
            meta:{title:'首页'}
        },
        {
            path:'/user',
            name:'user',
            component:()=>import('@/views/user.vue'),
            meta:{title:'用户管理'},
        }
        ,
        {
            path:'/portal',
            name:'portal',
            component:()=>import('@/views/portal.vue'),
            meta:{title:'门户管理'},
        },
        {
            path:'/edit',
            name:'edit',
            component:()=>import('@/views/edit.vue'),
            meta:{title:'编辑'},
        }
    ]
  },
];

export default new Router({
  base: process.env.BASE_URL,
  routes,
});
