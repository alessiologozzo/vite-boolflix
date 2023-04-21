<template>
    <main class="w-100">

        <div v-if="!store.focus.isFocused" class="row w-100 px-3 pt-4 pb-5">
            <div v-if="store.start" class=" d-flex justify-content-center align-items-center">
                <h3 class="al-welcome">Use the search bar to search for all the movies and tv shows you want!</h3>
            </div>
            <div v-else class="px-4 pb-4">
                <h4 class="al-found">Found {{ store.datas.length }}  {{ witchWord() }} for <i>"{{ store.lastSearch }}"</i></h4>
            </div>
            <div v-for="data in store.datas" class="col-12 col-sm-6 col-md-4 col-lg-3 pb-5 px-4">
                <AppCard :cardData="data" @focusFilm="onFocus($event)"/>
            </div>
        </div>
        <div v-else class="row px-3 pt-4 pb-5">
            <AppFocus :data="focusData"/>
        </div>
    </main>
</template>

<script >
    import { store } from "../assets/store.js";

    import AppCard from "./AppCard.vue";
    import AppFocus from "./AppFocus.vue";

    export default {
        name: "AppMain",

        components: {
            AppCard,
            AppFocus
        },

        data() {
            return {
                store,
                focusData: null
            }
        },

        methods: {
            witchWord(){
                let result = "result";
                if(this.store.datas.length > 1 || this.store.datas.length == 0)
                    result += "s";

                return result;
            },

            onFocus(e){
                this.store.focus.isFocused = true;
                this.focusData = e;
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/colors.scss";

    main{
        background-color: $main_color;
        overflow: hidden;
    }

    .al-welcome{
        background-color: rgb(107, 107, 107);
        border: 1px solid lightgray;
        border-radius: 20px;
        padding: 0.3rem 1.5rem;
        text-align: center;
        margin-top: 2rem;
    }

    .al-found{
        display: inline-block;
        background-color: rgb(107, 107, 107);
        border: 1px solid lightgray;
        border-radius: 4px;
        padding: 1rem 2rem;
    }
</style>