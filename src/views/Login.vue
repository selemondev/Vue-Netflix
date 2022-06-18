<script setup>
import NetflixBg from "../assets/Netflix-bg.jpg";
import NetflixHeader from "../assets/Netflix-Header.png";
import NetflixLogo from "../assets/Netflix-Icon.png";
import { auth, db } from "../firebase/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { useRouter } from "vue-router";
import { setDoc, doc } from "@firebase/firestore";
const router = useRouter();
const handleGoogleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider)
    await setDoc(doc(db, "users", response.user.uid), {
      id: response.user.uid,
      user: response.user.displayName,
      profile: response.user.photoURL
    });
     router.push("/movies")
  } catch(err) {
    console.log(err)
  };
};
</script>

<template>
<div class="min-h-screen w-full">
  <img :src="NetflixBg" alt="Netflix" class="w-full h-full bg-cover bg-center bg-no-repeat absolute -z-20">
  <header>
    <nav class="flex justify-between items-center md:px-3 px-1">
      <div>
       <img :src="NetflixHeader" alt="Netflix-Header" class="md:w-48 md:h-20 w-40 h-18"/>
      </div>

      <div>
        <button class="md:py-2 md:px-6 py-1.5 px-4 bg-red-600 text-white hover:bg-red-700 rounded-md">Sign In</button>
      </div>
    </nav>
  </header>

  <div class="grid place-items-center">
    <div class="mt-32">
      <img :src="NetflixLogo" alt="NetflixLogo" class="w-24 h-32 ml-8">
      <button @click="handleGoogleSignIn" class="relative mt-6 inline-flex items-center justify-start px-14 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
        <span class="w-48 h-48 rounded rotate-[-40deg] bg-red-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white font-bold">Sign In</span>
        </button>
    </div>
  </div>
</div>
</template>