import Vue from 'vue'
import Router from 'vue-router'     
import Hotshow from './views/Hotshow.vue' 
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/', 
      name: 'hotshow', 
      component: Hotshow 
    },
    {
      path: '/release', //
      name: 'release',
      // route level code-splitting
      // this generates a separate chunk(分包) (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // 路由被访问时才加载进来 （路由懒加载）打包时会分离对应的文件
      component: () => import(/* webpackChunkName: "about" */ './views/Release.vue')
    },
    {
        path: '/movie_detail/:movieId', 
        name: 'movie_detail',
        component: () => import('@/components/MovieDetail.vue')
    },
    {
        path: '/cinemadetail/:cinemaId', 
        name: 'cinemadetail',
        component: ()=> import('@/components/cinemaDetail.vue')
    },
    {
        path: '/city', 
        name: 'city',
        component: ()=> import('@/components/city.vue')
    },
    {
      path: '/movies/:movieId', 
      name: 'movies',
      component: ()=> import('@/components/movies.vue')
    }
    
  ]
})
