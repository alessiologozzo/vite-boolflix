<template>
  <div class="wrapper">
    <AppHeader @searched="queryServer()" />
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

                  this.store.focus.isFocused = false;
                  this.store.focus.hasQueried = false;
                  this.store.datas = [];
                  let objReference = {data: undefined};

                  if(this.store.filter != "tv"){
                    let query = "https://api.themoviedb.org/3/search/movie?api_key=8e04c36a1cc28b9de10fdbac8041b534&language=en-US&query=" + this.store.query + "&include_adult=false";
                    axios.get(query).then( (response) => {
                      for(let i = 0; i < response.data.results.length; i++)
                          this.store.datas.push({type: "movie", title: response.data.results[i].title, originalTitle: response.data.results[i].original_title, lang: response.data.results[i].original_language, overview: response.data.results[i].overview, imgSrc: "https://image.tmdb.org/t/p/original" + response.data.results[i].poster_path, vote: response.data.results[i].vote_average, id: response.data.results[i].id, voteCount: response.data.results[i].vote_count, popularity: response.data.results[i].popularity, releaseDate: response.data.results[i].release_date, backdropSrc: "https://image.tmdb.org/t/p/original" + response.data.results[i].backdrop_path, genreIds: response.data.results[i].genre_ids});

                      objReference.data = this.store.datas;
                      
                      switch(store.filter){

                        case "vote":
                          this.orderByVote(objReference);
                          break;

                        case "review":
                          this.orderByReview(objReference);
                          break;

                        default:
                          this.orderByPopularity(objReference);
                      }
                      
                      this.store.datas = objReference.data;
                    });
                  }

                  if(this.store.filter != "movie"){
                    let query = "https://api.themoviedb.org/3/search/tv?api_key=8e04c36a1cc28b9de10fdbac8041b534&language=en-US&query=" + this.store.query + "&include_adult=false";
                    axios.get(query).then( (response) => {
                      for(let i = 0; i < response.data.results.length; i++)
                        this.store.datas.push({type: "tv show", title: response.data.results[i].name, originalTitle: response.data.results[i].original_name, lang: response.data.results[i].original_language, overview: response.data.results[i].overview, imgSrc: "https://image.tmdb.org/t/p/original" + response.data.results[i].poster_path, vote: response.data.results[i].vote_average, id: response.data.results[i].id, voteCount: response.data.results[i].vote_count, popularity: response.data.results[i].popularity, releaseDate: response.data.results[i].first_air_date, backdropSrc: "https://image.tmdb.org/t/p/original" + response.data.results[i].backdrop_path, genreIds: response.data.results[i].genre_ids});
                      
                      objReference.data = this.store.datas;

                      switch(store.filter){

                      case "vote":
                        this.orderByVote(objReference);
                        break;

                      case "review":
                        this.orderByReview(objReference);
                        break;

                      default:
                        this.orderByPopularity(objReference);
                      }

                      this.store.datas = objReference.data;
                      });
                    }
    },

    orderByPopularity(obj){
      let array = obj.data;
      let newArray = [];
      let pop = 0;
      let index = 0;
      let ids = [];
      let push = false;

      for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length; j++){
          if(array[j].popularity >= pop && (!this.isNullImage(array[j].imgSrc) && !this.isNullImage(array[j].backdropSrc)) && !this.isPresent(ids, array[j].id)){
            index = j;
            pop = array[j].popularity;
            push = true;
          }
        }
        if(push){
          newArray.push(array[index]);
          ids.push(array[index].id);
          pop = 0;
          push = false;
        }
      }

      obj.data = newArray;
    },

    orderByVote(obj){
      let array = obj.data;
      let newArray = [];
      let vote = 0;
      let index = 0;
      let ids = [];
      let push = false;

      for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length; j++){
          if(array[j].vote >= vote && (!this.isNullImage(array[j].imgSrc) && !this.isNullImage(array[j].backdropSrc)) && !this.isPresent(ids, array[j].id)){
            index = j;
            vote = array[j].vote;
            push = true;
          }
        }
        if(push){
          newArray.push(array[index]);
          ids.push(array[index].id);
          vote = 0;
          push = false;
        }
      }

      obj.data = newArray;
    },

    orderByReview(obj){
      let array = obj.data;
      let newArray = [];
      let review = 0;
      let index = 0;
      let ids = [];
      let push = false;

      for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length; j++){
          if(array[j].voteCount >= review && (!this.isNullImage(array[j].imgSrc) && !this.isNullImage(array[j].backdropSrc)) && !this.isPresent(ids, array[j].id)){
            index = j;
            review = array[j].voteCount;
            push = true;
          }
        }
        if(push){
          newArray.push(array[index]);
          ids.push(array[index].id);
          review = 0;
          push = false;
        }
      }

      obj.data = newArray;
    },

    isPresent(ids, element){
      let result = false;

      for(let i = 0; i < ids.length && !result; i++)
        if(ids[i] == element)
          result = true;

        return result;
    },

    isNullImage(src){
      let result = false;

      let s = src.split("null");
      if(s[1] != undefined )
        result = true;

        return result;
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