<script setup>
import Header from '@/components/Header.vue';
import Row from '../components/Row.vue';
import Banner from '../components/Banner.vue';
import requests from '../Requests/requests';
</script>

<template>
<div class="relative min-h-sceen w-full">
<header>
     <Header/>
</header>
    <main class="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
      <Banner/>
    <div class="pt-5 md:pt-1">
        <Row title="Trending" largeImage :fetchUrl="requests.fetchTrending"/>
        <Row title="Netflix Originals" :fetchUrl="requests.fetchNetflixOriginals"/>
        <Row title="Top Rated" :fetchUrl="requests.fetchTopRated"/>
        <Row title="Action Movies" :fetchUrl="requests.fetchActionMovies"/>
        <Row title="Comedy Movies" :fetchUrl="requests.fetchComedyMovies"/>
        <Row title="Horror Movies" :fetchUrl="requests.fetchHorrorMovies"/>
  </div>
  </main>
</div>
</template>