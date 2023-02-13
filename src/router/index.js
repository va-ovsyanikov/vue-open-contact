import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/:repo',
          name: 'IssuesRepo',
          component: () => import('../components/IssuesRepo.vue'),
        },
        {
          path: '/:repo/:id',
          name: 'CommentsIssues',
          component: () => import('../components/CommentsIssues.vue'),
        },
      ],
    },
  ],
})

export default router
