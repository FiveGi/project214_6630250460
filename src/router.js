import { createRouter, createWebHistory } from 'vue-router';
// import MyProfile from './components/MyProfile.vue'; // หน้าโปรไฟล์
import EditProfile from './components/EditProfile.vue';
import EditCourse from './components/EditCourse.vue';
import STDPort from './components/STDPort.vue';
const routes = [
  { path: '/', 
    name: 'STDPort',
    component: STDPort },
  // {
  //   path: '/student-list',
  //   name: 'MyProfile',
  //   component: MyProfile
  // },
  {
    path: '/my-contact',
    name: 'EditProfile',
    component: EditProfile
  },
  {
    path: '/course-list',
    name: 'EditCourse',
    component: EditCourse
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
