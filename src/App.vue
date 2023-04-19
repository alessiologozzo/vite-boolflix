<template>
  <div class="wrapper">
    <AppHeader @searched="queryServer()"/>
    <AppMain />
  </div>
</template>

<script >
  import "../node_modules/axios/dist/axios.js";
  import { store } from "./assets/store.js";

  import AppHeader from './components/AppHeader.vue';
  import AppMain from './components/AppMain.vue';

  export default {
    name: "App",

    data() {
      return {
        store
      }
    },
    components: {
    AppHeader,
    AppMain
  },

  methods: {
    queryServer(){
                  if(this.store.start)
                    this.store.start = false;

                  this.store.movies = [];
                  let query = "https://api.themoviedb.org/3/search/movie?api_key=8e04c36a1cc28b9de10fdbac8041b534&language=en-US&query=" + this.store.query + "&include_adult=false";
                  axios.get(query).then( (response) => {
                    for(let i = 0; i < response.data.results.length; i++)
                        this.store.movies.push({title: response.data.results[i].title, originalTitle: response.data.results[i].original_title, lang: response.data.results[i].original_language, overview: response.data.results[i].overview, imgSrc: "https://image.tmdb.org/t/p/original" + response.data.results[i].poster_path, vote: response.data.results[i].vote_average});
                    this.store.dim = response.data.results.length;
                  });
                }
  },
    
  }
</script>

<style lang="scss" scoped>
  @import "./assets/colors.scss";

  .wrapper{
    min-height: 100vh;
    background-color: $main_color;
  }
</style>