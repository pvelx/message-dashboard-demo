const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/MessageList.vue')},
      {path: '/ScheduleMessage', component: () => import('pages/ScheduleMessage.vue')},
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
