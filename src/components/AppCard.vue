<template>
    <div class="al-card" @mouseleave="scrollUp($event)" @click="focusFilm()">
        <img :src="cardData.imgSrc" alt="">
        <div class="al-info">
            <div class="pb-2 text-capitalize">
                <strong><i>{{ cardData.type }}</i></strong>
            </div>
            <div class="pb-2">
                <strong>Title: </strong>
                <span>{{ cardData.title }}</span>
            </div>

            <div v-if="cardData.title != cardData.originalTitle" class="pb-2">
                <strong>Original Title: </strong>
                <span>{{ cardData.originalTitle }}</span>
            </div>

            <div class="pb-2 text-warning">
                <strong class="al-white">Vote: </strong>
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
            </div>

            <div class="pb-2">
                <strong>Overview: </strong>
                <span>{{ cardData.overview }}</span>
            </div>
        </div>
    </div>
</template>

<script >
    export default {
        name: "AppCard",

        props: { 
            cardData: {}
        },

        methods: {
            scrollUp(e){
                e.target.scrollTop = 0;
            },

            howManyStars(){
                let result = -1;

                if(this.cardData.vote < 1)
                    result = 0;
                else if(this.cardData.vote >= 1 && this.cardData.vote < 3)
                    result = 0.5;
                else if(this.cardData.vote >= 3 && this.cardData.vote < 3.6)
                    result = 1;
                else if(this.cardData.vote >= 3.6 && this.cardData.vote < 4.2)
                    result = 1.5;
                else if(this.cardData.vote >= 4.2 && this.cardData.vote < 5)
                    result = 2;
                else if(this.cardData.vote >= 5 && this.cardData.vote < 6)
                    result = 2.5
                else if(this.cardData.vote >= 6 && this.cardData.vote < 7)
                    result = 3;
                else if(this.cardData.vote >= 7 && this.cardData.vote < 7.55)
                    result = 3.5;
                else if(this.cardData.vote >= 7.55 && this.cardData.vote < 8)
                    result = 4;
                else if(this.cardData.vote >= 8 && this.cardData.vote < 8.5)
                    result = 4.5;
                else if(this.cardData.vote >= 8.5)
                    result = 5;

                return result;
            },

            focusFilm(){
                this.$emit("focusFilm", this.cardData);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .al-card{
        width: 100%;
        height: 100%;
        position: relative;
        cursor: pointer;
        border: 3px groove lightgray;
        overflow: hidden;
        background-color: black;

        &:hover{
            overflow: auto;
        }

        &::after{
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: black;
            opacity: 0;
            transition: opacity 300ms;
        }

        &:hover::after{
            opacity: 0.8;
        }

        .al-info{
            opacity: 0;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1rem 0.5rem;
            z-index: 10;
            transition: opacity 300ms;
        }
        
        &:hover .al-info{
            opacity: 1;
        }
    }

    img{
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    strong{
        font-size: 1.1rem;
    }
</style>