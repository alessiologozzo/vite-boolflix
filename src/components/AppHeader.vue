<template>
    <header>
        <h1 class="text-danger">boolflix</h1>
        <div class="position-relative">
            <input type="text" placeholder="Search..."  v-model="input" @keyup.enter="search()">
            <div class="img-container" @click="search()">
                <img src="../assets/img/magnifying-glass.svg" alt="magnyfing-glass">
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
                if(this.isInputValid()){
                    this.store.query = this.input;
                    this.$emit("searched");
                }
            },

            isInputValid(){
                let result = false;

                if(this.input.length > 0)
                    result = true;

                return result;
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
        padding: 2rem 1rem;
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
    @media screen and (min-width: 576px) {
        input[type="text"]{
            width: 250px;
        }
    }

    @media screen and (min-width: 768px) {
        input[type="text"]{
            width: 320px;
        }
    }

    @media screen and (min-width: 992px) {
        input[type="text"]{
            width: 400px;
        }
    }
</style>