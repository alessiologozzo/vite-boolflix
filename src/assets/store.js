import { reactive } from "vue";

export let store = reactive({
    datas: [],
    query: "",
    start: true,
    focus: {isFocused: false, hasQueried: false},
    lastSearch: "",
    filter: "popularity"
});