import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: '首頁' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: '關於' },
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('@/views/MemberView.vue'),
      meta: { title: '社團成員' },
    },
    {
      path: '/lecture',
      name: 'lecture',
      component: () => import('@/views/LectureView.vue'),
      meta: { title: '社課' },
    },
    {
      path: '/project',
      name: 'project',
      component: () => import('@/views/ProjectView.vue'),
      meta: { title: '活動' },
    },
    {
      path: '/equipment',
      name: 'equipment',
      component: () => import('@/views/equipment.vue'), // 確保檔案名稱對應
      meta: { title: '器材清單' },
    },
    {
      path: '/exhibition-2026',
      name: 'exhibition',
      component: () => import('@/views/ExhibitionView.vue'),
      meta: { title: '光影之間' },
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/GameView.vue'),
      meta: { title: '彩蛋遊戲' },
    },
    { path: '/m/home', name: 'm-home', component: () => import('../views/mobile/HomeViewForPhone.vue') },
    { path: '/m/about', name: 'm-about', component: () => import('../views/mobile/AboutViewForPhone.vue') },
    { path: '/m/member', name: 'm-member', component: () => import('../views/mobile/MemberViewForPhone.vue') },
    { path: '/m/equipment', name: 'm-equipment', component: () => import('../views/mobile/EquipmentViewForPhone.vue') },
    { path: '/m/exhibition', name: 'm-exhibition', component: () => import('../views/mobile/ExhibitionViewForPhone.vue') },
    { path: '/m/project', name: 'm-project', component: () => import('../views/mobile/ProjectViewForPhone.vue') },
    
    {
      path: '/qrcode',
      redirect: '/',
    },
  ],
})

export default router
