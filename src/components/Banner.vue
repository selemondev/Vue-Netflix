<script setup>
import requests from '../Requests/requests';
import { ref } from 'vue';
import axios from "../Axios/axios";
const baseURL = "https://image.tmdb.org/t/p/original/";
const randomMovie = ref([]);
const fetchRandomMovie = async () => {
    const response = await axios.get(requests.fetchTrending);
    randomMovie.value = response.data.results[Math.floor(Math.random() * response.data.results.length - 1)];
}
fetchRandomMovie();

function truncate(str,n) {
        return str?.length > n ? str.substr(0,n-1) + "..." : str;
}
</script>

<template>
    <div className="flex flex-col space-y-2 pt-32 md:pt-40 md:pb-32 pb-40">
      <div className="absolute top-0 left-0  -z-10 h-[95vh] w-full">
        <img :src="`${baseURL}${randomMovie?.backdrop_path || randomMovie?.poster_path}`" class="w-full h-full object-cover" />
      </div>
           <div  class="mb-5">
              <h2 class="text-white text-5xl">{{randomMovie?.name || randomMovie?.original_name || randomMovie?.title || randomMovie?.original_title}}</h2>
           </div>

      <div class="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        <h4 class="text-white">{{truncate(randomMovie.overview,250)}}....</h4>
      </div>

    <div className="flex space-x-3 mt-8">
        <button className="btn bg-white text-black hover:bg-red-600">
          <i class="fa-solid fa-play"></i>
          Play
        </button>

        <button className="btn bg-[gray]/90 hover:bg-gray-500">
            <i class="fa-solid fa-circle-info"></i>
          More Info
        </button>
      </div>
    </div>

</template>