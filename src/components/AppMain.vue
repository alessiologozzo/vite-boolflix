<template>
    <main class="row w-100 px-3 pt-4 pb-5">

        <div v-if="store.start" class=" d-flex justify-content-center align-items-center">
            <h3 class="al-welcome">Use the search bar to search for all the movies you want!</h3>
        </div>
        <div v-else class="px-4 pb-4">
            <h4 class="al-found">Found {{ store.dim }}  {{ wichWord() }}</h4>
        </div>
        <div v-for="movie in store.movies" class="col-12 col-sm-6 col-md-4 col-lg-3 pb-5 px-4">
            <AppCard :cardData="movie" />
        </div>
    </main>
</template>

<script >
    import { store } from "../assets/store.js";
    import AppCard from "./AppCard.vue";

    export default {
        name: "AppMain",

        components: {
            AppCard
        },

        data() {
            return {
                store
            }
        },

        methods: {
            wichWord(){
                let result = "result";
                if(this.store.dim > 1 || this.store.dim == 0)
                    result += "s";

                return result;
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/colors.scss";

    main{
        background-color: $main_color;
    }

    .al-welcome{
        background-color: rgb(107, 107, 107);
        border: 1px solid lightgray;
        border-radius: 20px;
        padding: 0.3rem 1.5rem;
        text-align: center;
    }

    .al-found{
        display: inline-block;
        background-color: rgb(107, 107, 107);
        border: 1px solid lightgray;
        border-radius: 4px;
        padding: 1rem 2rem;
    }
</style>