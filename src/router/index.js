import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NigeriaNews from '../views/NigeriaNews.vue'
import InternationalNews from '../views/InternationalNews.vue'
import CategoryPage from '../views/CategoryPage.vue'
import ArticleDetail from '../views/ArticleDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/nigeria',
      name: 'nigeria-news',
      component: NigeriaNews
    },
    {
      path: '/international',
      name: 'international-news',
      component: InternationalNews
    },
    {
      path: '/category/:category',
      name: 'category',
      component: CategoryPage,
      props: true
    },
    {
      path: '/article/:id',
      name: 'article',
      component: ArticleDetail,
      props: true
    }
  ]
})

export default router