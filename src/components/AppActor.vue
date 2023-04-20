<template>
    <div class="py-4">
        <div class="al-img-container">
            <img :src="actorData.profileSrc" alt="">
        </div>
        <div class="d-flex flex-column align-items-center text-center pt-3">
            <h4>{{ actorData.character }}</h4>

            <h5>{{ actorData.actor }}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppActor",

        props: {
            actorData: {
                actor: String, 
                character: String,
                profileSrc: String
            }
        }
    }
</script>

<style lang="scss" scoped>

    .al-img-container{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    img{
        object-fit: cover;
        width: 95%;
        height: 95%;
        border: 3px groove lightgray;
        background-color: black;
    }
</style>