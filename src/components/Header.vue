<script setup>
import NetflixHeader from "../assets/Netflix-Header.png";
import {  BellIcon } from "@heroicons/vue/solid"
import { SearchIcon } from "@heroicons/vue/outline";
import { watchEffect, ref } from "vue";
import { auth, db } from "../firebase/firebaseConfig";
import { getDoc, doc } from "@firebase/firestore";
import { signOut } from "@firebase/auth";
import { useRouter } from "vue-router";
const user = ref([]);
const scrolled = ref(false);
const router = useRouter();
const currentUser = auth.currentUser?.uid;
watchEffect(() => {
    getDoc(doc(db, "users", currentUser)).then((docSnap) => {
        if(docSnap.exists()) {
            user.value.push(docSnap.data())
        }
});

const handleScroll = () => {
        if(window.scrollY > 0) {
            scrolled.value = true;
        } else {
            scrolled.value = false;
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
});

const handleLogOut = async () => {
    await signOut(auth);
    router.push("/")
};

</script>
<template>
<header class="w-full z-10 fixed">
    <nav :class="[scrolled ? 'bg-black text-white w-full h-14 px-2 flex justify-between items-center p-2' : 'bg-transparent w-full h-10 flex justify-between items-center p-2']">
        <div class="flex items-center">
            <img :src="NetflixHeader" alt="Netflix-Header" class="w-32 h-14">
                    <div class="ml-2 hidden xl:block">
        <ul class="flex justify-center items-center space-x-3">
                    <li class="headerLink">Home</li>
                    <li class="headerLink">Tv Shows</li>
                    <li class="headerLink">Movies</li>
                    <li class="headerLink">New & Popular</li>
                    <li class="headerLink">My List</li>
                </ul>
        </div>
        </div>

        <div class="flex items-center space-x-3">
            <p><SearchIcon class="text-white h-6 w-6"/></p>
            <p><BellIcon class="text-white h-6 w-6"/></p>
           <div v-for="currentUser in user" :key="currentUser.id">
            <img :src="currentUser.profile" alt="" class="w-8 h-8 rounded-full cursor-pointer" @click="handleLogOut"/>
           </div>
        </div>

    </nav>
</header>
</template>