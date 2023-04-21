<template>
    <header>
        <div class="d-flex align-items-center">
            <i v-if="store.focus.isFocused" class="fa-solid fa-chevron-left al-back" @click="onClick()"></i>
            <h1 class="text-danger m-0">boolflix</h1>
        </div>
        <div class="d-flex flex-column">
            <div class="position-relative">
                <input type="text" placeholder="Search..."  v-model="input" @keyup.enter="search()">
                <div class="img-container" @click="search()">
                    <img src="../assets/img/magnifying-glass.svg" alt="magnyfing-glass">
                </div>
            </div>

            <div class="d-flex justify-content-end pt-1">
                <select @change="changeFilter($event)" class="p-1">
                    <option value="popularity">Popularity</option>
                    <option value="vote">Vote</option>
                    <option value="review">Reviews Number</option>
                    <option value="movie">Only movies</option>
                    <option value="tv">Only tv shows</option>
                </select>
            </div>
        </div>
    </header>
</template>

<script>
    import { store } from "../assets/store.js";

    export default {
        name: "AppHeader",

        data() {
            return {
                input: "",
                store
            }
        },

        methods: {
            search(){
                if(this.isInputValid(this.input)){
                    this.store.query = this.input;
                    this.store.lastSearch = this.input;
                    this.input = "";
                    this.$emit("searched");
                }
            },

            isInputValid(s){
                let result = false;

                if(s.length > 0)
                    if(!this.areAllSpaces(s))
                        result = true;

                return result;
            },

            areAllSpaces(s){
                let result = true;

                for(let i = 0; i < s.length && result; i++)
                    if(s[i] != " ")
                        result = false;

                return result;
            },

            changeFilter(e){
                this.store.filter = e.target.value;
                if(this.isInputValid(this.store.query) && !this.store.focus.isFocused){
                    this.$emit("searched");
                }
            },

            onClick(){
                store.focus.isFocused = false; 
                store.focus.hasQueried = false; 
                this.$emit("searched");
            }
        },
    }
</script>

<style lang="scss" scoped>
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(20, 20, 20);
        text-transform: uppercase;
        padding: 1.5rem 1rem;
    }

    input[type="text"]{
        width: 230px;
        height: 2.5rem;
        padding: 0 3.5rem 0 0.4rem;
        background-color: white;
        color: black;
        border: 1px solid lightgrey;
        border-radius: 5px;
    }

    ::placeholder{
        color: black;
        opacity: 0.7;
    }

    select{
        cursor: pointer;
    }

    .img-container{
        background-color: lightgray;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 5px 5px 0;
    }

    img{
        width: 1.5rem;

    }

    h1{
        font-family: 'Alkatra', cursive;
    }

    .al-back{
        font-size: 1.5rem;
        transition: all 300ms;
        cursor: pointer;
        padding: 0 0.5rem;
        margin-right: 0.5rem;

        &:hover{
            transform: scale(1.2);
            color: lightgreen;
        }
    }

    @media screen and (min-width: 576px) {
        input[type="text"]{
            width: 280px;
        }
    }

    @media screen and (min-width: 768px) {
        input[type="text"]{
            width: 360px;
        }
    }

    @media screen and (min-width: 992px) {
        input[type="text"]{
            width: 450px;
        }
    }

    @media screen and (min-width: 1200px) {
        input[type="text"]{
            width: 520px;
        }
    }

    @media screen and (min-width: 1400px) {
        input[type="text"]{
            width: 580px;
        }
    }
</style>