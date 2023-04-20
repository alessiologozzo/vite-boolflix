<template>
    <div v-if="!store.focus.hasQueried && store.focus.isFocused">
        {{ queryServer() }}
    </div>
    <div class="col-12 col-lg-6">
        <img :src="movieData.backdropSrc" alt="">
    </div>
    <div class="col-12 col-lg-6 d-flex flex-lg-column justify-content-center align-items-center align-items-lg-start gap-5 gap-lg-3 ps-4 pr-3 flex-wrap text-center pt-4 pt-lg-0">
        <h2>{{ movieData.title }}</h2>
        <h4 v-if="movieData.title != movieData.originalTitle">{{ movieData.originalTitle }}</h4>
        <h4 class="text-warning">
            <span v-if="howManyStars() == -1">Not Available</span>
                <span v-else-if="howManyStars() == 0">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </span>
                <span v-else-if="howManyStars() == 0.5">
                    <i class="fa-regular fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </span>
                <span v-else-if="howManyStars() == 1">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </span>
                <span v-else-if="howManyStars() == 1.5">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </span>
                <span v-else-if="howManyStars() == 2">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </span>
                <span v-else-if="howManyStars() == 2.5">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </span>
                <span v-else-if="howManyStars() == 3">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </span>
                <span v-else-if="howManyStars() == 3.5">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                </span>
                <span v-else-if="howManyStars() == 4">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </span>
                <span v-else-if="howManyStars() == 4.5">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star-half-stroke"></i>
                </span>
                <span v-else-if="howManyStars() == 5">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </span>
        </h4>

        <h4>{{ movieData.voteCount }} Reviews</h4>

        <h4>{{ movieData.releaseDate }}</h4>

        <h4>{{ movieData.popularity }} Popularity</h4>
    </div>

    <hr>

    <div v-if="additionalData.tagline != ''" class="pb-4">
        <h5><i>"{{ additionalData.tagline }}"</i></h5>
    </div>

    <div class="col-12">{{ movieData.overview }}</div>

    <div class="pt-5"> 
        <h6 class="d-inline pe-2 text-decoration-underline">{{ witchWord() }}</h6>  <h5 class="d-inline pe-5">{{ genresIdsToString() }}</h5>
    </div>
    <div class="pt-2">
        <h6 class="d-inline pe-2 text-decoration-underline">Runtime:</h6> <h5 class="d-inline">{{ additionalData.runtime }} minutes</h5>
    </div>
    
    <div v-if="additionalData.budget > 0 && additionalData.revenue > 0">
        <div class="pt-2">
            <h6 class="d-inline pe-2 text-decoration-underline">Budget:</h6> <h5 class="d-inline"> {{ showNumber(additionalData.budget) }}</h5>
        </div>
        <div class="pt-2">
            <h6 class="d-inline pe-2 text-decoration-underline">Revenue:</h6> <h5 class="d-inline"> {{ showNumber(additionalData.revenue) }}</h5>
        </div>

    </div>

    <hr>

    <div class="col-12">
        <div class="row">
            <div v-for="creditsData in creditsDatas" class="col-6 col-sm-4 col-md-3 col-lg-2">
                <AppActor :actorData="creditsData" />
            </div>
        </div>
    </div>
</template>

<script>
    import "../../node_modules/axios/dist/axios.js";
    import { store } from "../assets/store";
    import AppActor from "./AppActor.vue";

    export default {
        name: "AppFocus",

        components: {
            AppActor
        },

        data() {
            return {
                store,
                creditsDatas: [],
                additionalData: {runtime: String, budget: String, revenue: String, tagline: String}
            }
        },

        props: {
            movieData: {
                title: String,
                originalTitle: String,
                lang: String,
                overview: String,
                imgSrc: String,
                vote: Number,
                id: Number,
                voteCount: Number,
                popularity: Number,
                releaseDate: String,
                backdropSrc: String,
                genreIds: []
            },
        },
        
        methods: {
            queryServer(){
                this.store.focus.hasQueried = true;
                let query = "https://api.themoviedb.org/3/movie/" + this.movieData.id + "/credits?api_key=8e04c36a1cc28b9de10fdbac8041b534";

                axios.get(query).then((response) => {

                    for(let i = 0; i < response.data.cast.length && i < 12; i++)
                        this.creditsDatas.push({actor: response.data.cast[i].name, character: response.data.cast[i].character, profileSrc: "https://image.tmdb.org/t/p/original" + response.data.cast[i].profile_path});
                });

                query = "https://api.themoviedb.org/3/movie/" + this.movieData.id + "?api_key=8e04c36a1cc28b9de10fdbac8041b534";

                axios.get(query).then((response) => {
                    this.additionalData.runtime = response.data.runtime.toString();
                    this.additionalData.budget = response.data.budget.toString();
                    this.additionalData.revenue = response.data.revenue.toString();
                    this.additionalData.tagline = response.data.tagline.toString();
                });

            },

            howManyStars(){
                let result = -1;

                if(this.movieData.vote < 1)
                    result = 0;
                else if(this.movieData.vote >= 1 && this.movieData.vote < 2)
                    result = 0.5;
                else if(this.movieData.vote >= 2 && this.movieData.vote < 3)
                    result = 1;
                else if(this.movieData.vote >= 3 && this.movieData.vote < 4)
                    result = 1.5;
                else if(this.movieData.vote >= 4 && this.movieData.vote < 5)
                    result = 2;
                else if(this.movieData.vote >= 5 && this.movieData.vote < 6)
                    result = 2.5
                else if(this.movieData.vote >= 6 && this.movieData.vote < 7)
                    result = 3;
                else if(this.movieData.vote >= 7 && this.movieData.vote < 8)
                    result = 3.5;
                else if(this.movieData.vote >= 8 && this.movieData.vote < 9)
                    result = 4;
                else if(this.movieData.vote >= 9 && this.movieData.vote < 10)
                    result = 4.5;
                else if(this.movieData.vote >= 10)
                    result = 5;

                return result;
            },

            genresIdsToString(){
                let result = "";

                for(let i = 0; i < this.movieData.genreIds.length; i++){
                    switch(this.movieData.genreIds[i]){
                        case 28:
                            result += "Action";
                            break;

                        case 12:
                            result += "Adventure"
                            break;

                        case 16:
                            result += "Animation";
                            break;

                        case 35:
                            result += "Comedy";
                            break;

                        case 80:
                            result += "Crime";
                            break;

                        case 99:
                            result += "Documentary";
                            break;

                        case 18:
                            result += "Drama";
                            break;

                        case 10751:
                            result += "Family";
                            break;

                        case 14:
                            result += "Fantasy";
                            break;

                        case 36:
                            result += "History";
                            break;

                        case 27:
                            result += "Horror";
                            break;

                        case 10402:
                            result += "Music";
                            break;

                        case 9648:
                            result += "Mystery";
                            break;

                        case 10749:
                            result += "Romance";
                            break;

                        case 878:
                            result += "Science Fiction";
                            break;

                        case 10770:
                            result += "TV Movie";
                            break;

                        case 53:
                            result += "Thriller";
                            break;

                        case 10752:
                            result += "War";
                            break;

                        case 37:
                            result += "Western";
                            break;
                    }

                    if(i + 1 < this.movieData.genreIds.length)
                        result += ", "; 
                }

                return result;
            },

            witchWord(){
                let result = "Genre"
                if(this.movieData.genreIds.length > 1)
                    result += "s";

                result += ":";

                return result;
            },

            showNumber(s){
                let result = "";
                let c = 1;
                for(let i = s.length - 1; i >= 0; i--){
                    result += s[i];
                    if(c == 3){
                        c = 0;
                        if(i - 1 >= 0)
                            result += '.';
                    }
                    c++;
                }
                result += '$';
                return this.reverseString(result);
            },

            reverseString(s){
                let charArray = [];

                for(let i = 0; i < s.length; i++)
                    charArray.push(s[s.length - i - 1]);

                let result = charArray.join("");
                return result;
            }
        }
    }
</script>

<style lang="scss" scoped>
    img{
        object-fit: cover;
        width: 100%;
        height: 100%;
        border: 3px groove lightgray;
    }

    hr{
        margin: 2.7rem 0 1.8rem;
        width: 100vw;
    }
</style>