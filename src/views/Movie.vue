<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
const route = useRoute();
const params = route.params.id;
const movie = ref([]);
const API_KEY = "63ef9c1da41cd3c843dcec9ed2264b73";
const baseURL = "https://image.tmdb.org/t/p/original/";
const searchMovieUrl = `https://api.themoviedb.org/3/movie/${params}?api_key=${API_KEY}&language=en-US`;
const getMovie = async () => {
    const response = await axios.get(searchMovieUrl);
    movie.value = response.data
};
getMovie();

</script>

<template>
  <div class="w-full min-h-screen">
     <div class="absolute top-0 bottom-0 -z-10 w-full">
        <img :src="`${baseURL}${movie?.backdrop_path}`" class="w-full h-full object-cover" />
      </div>

      <div>
        <button class="btn bg-red-500 hover:bg-red-600 mt-1 md:mt-2 text-white md:ml-2 "> <router-link to="/movies"><i class="fa-solid fa-arrow-left mr-2"></i> Back</router-link></button>
      </div>

     <div class="grid place-items-start md:pt-20 pt-14">

        <div class=" md:w-[800px] bg-black rounded-md md:ml-2 bg-opacity-20 backdrop-blur-xl w-80 h-96 pt-10 flex md:justify-center justify-around items-center">
            <div class="md:w-72 w-32">
                <img :src="`${baseURL}${movie?.poster_path}`" :alt="`${movie.title}`" class="w-62 h-72 md:ml-2">
            </div>

            <div class="md:w-96 w-32 h-72 md:-ml-5 overflow-y-scroll md:overflow-hidden">
                <h2 class="font-bold md:text-3xl mb-2 text-white">{{movie.title}}</h2>
                <p class="text-white">- {{movie.overview}}</p>
            </div>
        </div>

     </div>
  </div>

</template>