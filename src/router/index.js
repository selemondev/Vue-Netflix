import { createRouter, createWebHistory } from 'vue-router'
import Movies from "@/views/Movies.vue";
import Login from '@/views/Login.vue';
import Movie from '@/views/Movie.vue';
import { auth } from '@/firebase/firebaseConfig';
import { onAuthStateChanged } from '@firebase/auth';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      name: "Login",
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies,
      meta: {
        title: "Movies",
        auth: true,
      }
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: Movie,
      meta: {
        auth: true,
      }
    }
  ]
});

const currentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    },
    reject
    )
  })
};

router.beforeEach( async (to,from,next) => {
  if(to.matched.some((record) => record.meta.auth)) {
    if(await currentUser()) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});
export default router;
