<template>
    <div v-if="!store.focus.hasQueried && store.focus.isFocused">
        {{ queryServer() }}
    </div>
    <div class="col-12 col-lg-6">
        <img :src="data.backdropSrc" alt="">
    </div>
    <div class="col-12 col-lg-6 d-flex flex-lg-column justify-content-center align-items-center align-items-lg-start gap-5 gap-lg-3 ps-4 pr-3 flex-wrap text-center pt-4 pt-lg-0">
        <h2>{{ data.title }}</h2>
        <h4 v-if="data.title != data.originalTitle">{{ data.originalTitle }}</h4>
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

        <h4>{{ data.voteCount }} Reviews</h4>

        <h4>{{ data.releaseDate }}</h4>

        <h4>{{ displayPopularity() }} Popularity Score</h4>
    </div>

    <hr>

    <div v-if="data.type == 'movie' && additionalMovieData.tagline != ''" class="pb-4">
        <h5><i>"{{ additionalMovieData.tagline }}"</i></h5>
    </div>

    <div class="col-12">{{ data.overview }}</div>

    <div v-if="genresIdsToString().length > 2" class="pt-5 text-capitalize"> 
        <h5><i>{{ data.type }}</i></h5>
    </div>

    <div v-if="genresIdsToString().length > 2" class="pt-2"> 
        <h6 class="d-inline pe-2 text-decoration-underline">{{ witchGenreWord() }}</h6>  <h5 class="d-inline pe-5">{{ genresIdsToString() }}</h5>
    </div>

    <div v-if="data.type=='movie'" class="pt-2">
        <h6 class="d-inline pe-2 text-decoration-underline">Runtime:</h6> <h5 class="d-inline">{{ additionalMovieData.runtime }} minutes</h5>
    </div>
    
    <div v-if="additionalTvData.showRunners.length > 0" class="pt-2">
        <h6 class="d-inline pe-2 text-decoration-underline">Status: </h6> <h5 class="d-inline"> {{ displayStatus() }}</h5>
    </div>

    <div v-if="data.type == 'movie' && additionalMovieData.budget > 0 && additionalMovieData.revenue > 0">
        <div class="pt-2">
            <h6 class="d-inline pe-2 text-decoration-underline">Budget:</h6> <h5 class="d-inline"> {{ showNumber(additionalMovieData.budget) }}</h5>
        </div>
        <div class="pt-2">
            <h6 class="d-inline pe-2 text-decoration-underline">Revenue:</h6> <h5 class="d-inline"> {{ showNumber(additionalMovieData.revenue) }}</h5>
        </div>
    </div>
    <div v-else-if="data.type == 'tv show' && additionalTvData.seasonNumber > 0 && additionalTvData.episodeNumber > 0">
        <div class="pt-2">
            <h6 class="d-inline pe-2 text-decoration-underline">Seasons:</h6> <h5 class="d-inline"> {{ additionalTvData.seasonNumber }}</h5>
        </div>
        <div class="pt-2">
            <h6 class="d-inline pe-2 text-decoration-underline">Episodes:</h6> <h5 class="d-inline"> {{ additionalTvData.episodeNumber }}</h5>
        </div>
    </div>

    <div v-if="additionalTvData.runtime > 0">
        <div class="pt-2">
            <h6 class="d-inline pe-2 text-decoration-underline">Episode runtime:</h6> <h5 class="d-inline">{{ additionalTvData.runtime }} minutes</h5>
        </div>
    </div>

    <div v-if="additionalTvData.showRunners.length > 0" class="pt-2">
        <h6 class="d-inline pe-2 text-decoration-underline">{{ witchShowRunnerWord() }}</h6> <h5 class="d-inline"> {{ displayShowRunners() }}</h5>
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
                additionalMovieData: {runtime: String, budget: String, revenue: String, tagline: String},
                additionalTvData: {runtime: String, inProduction: String, seasonNumber: Number, episodeNumber: Number, showRunners: []}
            }
        },

        props: {
            data: {}
        },
        
        methods: {
            queryServer(){
                this.store.focus.hasQueried = true;
                let query;
                if(this.data.type == "movie")
                    query = "https://api.themoviedb.org/3/movie/" + this.data.id + "/credits?api_key=8e04c36a1cc28b9de10fdbac8041b534";
                else
                    query = "https://api.themoviedb.org/3/tv/" + this.data.id + "/credits?api_key=8e04c36a1cc28b9de10fdbac8041b534";

                axios.get(query).then((response) => {

                    let d = 12;
                    for(let i = 0; i < response.data.cast.length && i < d; i++)
                        if(!this.isNullImage("https://image.tmdb.org/t/p/original" + response.data.cast[i].profile_path))
                            this.creditsDatas.push({actor: response.data.cast[i].name, character: response.data.cast[i].character, profileSrc: "https://image.tmdb.org/t/p/original" + response.data.cast[i].profile_path});
                        else
                            d++;
                });

                if(this.data.type == "movie"){
                    query = "https://api.themoviedb.org/3/movie/" + this.data.id + "?api_key=8e04c36a1cc28b9de10fdbac8041b534";

                    axios.get(query).then((response) => {
                    this.additionalMovieData.runtime = response.data.runtime.toString();
                    this.additionalMovieData.budget = response.data.budget.toString();
                    this.additionalMovieData.revenue = response.data.revenue.toString();
                    this.additionalMovieData.tagline = response.data.tagline.toString();
                    });
                }
                else{
                    query = "https://api.themoviedb.org/3/tv/" + this.data.id + "?api_key=8e04c36a1cc28b9de10fdbac8041b534";

                    axios.get(query).then((response) => {
                    this.additionalTvData.runtime = response.data.episode_run_time.toString();
                    this.additionalTvData.inProduction = response.data.in_production;
                    this.additionalTvData.seasonNumber = response.data.number_of_seasons;
                    this.additionalTvData.episodeNumber = response.data.number_of_episodes;
                    this.additionalTvData.showRunners = response.data.created_by;
                    });
                }

            },

            howManyStars(){
                let result = -1;

                if(this.data.vote < 1)
                    result = 0;
                else if(this.data.vote >= 1 && this.data.vote < 3)
                    result = 0.5;
                else if(this.data.vote >= 3 && this.data.vote < 3.6)
                    result = 1;
                else if(this.data.vote >= 3.6 && this.data.vote < 4.2)
                    result = 1.5;
                else if(this.data.vote >= 4.2 && this.data.vote < 5)
                    result = 2;
                else if(this.data.vote >= 5 && this.data.vote < 6)
                    result = 2.5
                else if(this.data.vote >= 6 && this.data.vote < 7)
                    result = 3;
                else if(this.data.vote >= 7 && this.data.vote < 7.55)
                    result = 3.5;
                else if(this.data.vote >= 7.55 && this.data.vote < 8)
                    result = 4;
                else if(this.data.vote >= 8 && this.data.vote < 8.5)
                    result = 4.5;
                else if(this.data.vote >= 8.5)
                    result = 5;

                return result;
            },

            genresIdsToString(){
                let result = "";

                for(let i = 0; i < this.data.genreIds.length; i++){
                    switch(this.data.genreIds[i]){
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

                        case 10759:
                            result += "Action & Adventure";
                            break;

                        case 10762:
                            result += "Kids";
                            break;

                        case 10763:
                            result += "News";
                            break;

                        case 10764:
                            result += "Reality";
                            break;

                        case 10765:
                            result += "Sci-Fi & Fantasy"
                            break;

                        case 10766:
                            result += "Soap";
                            break;

                        case 10767:
                            result += "Talk";
                            break;

                        case 10768:
                            result += "War & Politics";
                            break;
                    }

                    if(i + 1 < this.data.genreIds.length)
                        result += ", "; 
                }

                return result;
            },

            witchGenreWord(){
                let result = "Genre"
                if(this.data.genreIds.length > 1)
                    result += "s";

                result += ":";

                return result;
            },

            witchShowRunnerWord(){
                let result = "Showrunner";

                if(this.additionalTvData.showRunners.length > 1)
                    result += "s";

                result += ":";

                return result;
            },

            displayShowRunners(){
                let result = "";

                for(let i = 0; i < this.additionalTvData.showRunners.length; i++){
                    result += this.additionalTvData.showRunners[i].name;
                    if(i + 1 < this.additionalTvData.showRunners.length)
                        result += ", ";
                }
                    
                return result;
            },

            displayPopularity(){
                let s = this.data.popularity.toString();
                let result = s.split(".");

                return result[0];
            },

            displayStatus(){
                let result = "";

                if(this.additionalTvData.inProduction)
                    result = "In Production";
                else
                    result = "Ended";

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
            },

            isNullImage(src){
                let result = false;

                let s = src.split("null");
                if(s[1] != undefined )
                    result = true;

                return result;
    },
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