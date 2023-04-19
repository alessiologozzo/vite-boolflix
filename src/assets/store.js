import { reactive } from "vue";

export let store = reactive({
    movies: [],
    query: "",
    dim: 0,
    start: true
});