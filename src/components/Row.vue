<script setup>
import axios from "../Axios/axios";
import { ref } from "vue";
const baseURL = "https://image.tmdb.org/t/p/original/";
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    fetchUrl: {
        type: String,
        required: true
    }
});
const movies = ref([]);

const fetchMovies = async () => {
    const response = await axios.get(props.fetchUrl);
    response.data.results.forEach((movie) => {
        movies.value.push(movie)
    });
};
fetchMovies()
</script>
<template>
<div>
    <div class="pb-4 pt-2 md:mt-10">
        <h2 class="text-white font-bold md:text-2xl text-lg">{{props.title}}</h2>
    </div>
    <div class="flex items-center overflow-x-scroll scrollbar-hide">
    <div v-for="movie in movies" :key="movie.id">
    <router-link :to="{name:'movie', params:{id: movie.id}}">
    <img :src="`${baseURL}${movie.poster_path}`" :alt="`${movie.name}`" class="hover:scale-125 ease-in duration-500 h-48 min-w-[180px] p-2">
    </router-link>
    </div>
    </div>
</div>
</template>