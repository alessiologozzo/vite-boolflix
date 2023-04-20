import { reactive } from "vue";

export let store = reactive({
    datas: [],
    query: "",
    dim: 0,
    start: true,
    focus: {isFocused: false, hasQueried: false},
    lastSearch: "",
    filter: "popularity"
});