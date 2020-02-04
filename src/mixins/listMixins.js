import Vuetable from "vuetable-2";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";

export default {
    components: {
        Vuetable,
        VuetablePagination
    },
    data() {
        return {
            appendParams: {
                format: "true",
                q: "(is_deleted:0)"
            },
            baseURL: process.env.VUE_APP_BASE_API_URL,
            isLoading: false,
            queryParams: {
                sort: "sort",
                page: "page",
                perPage: "limit"
            },
            resource: {
                name: "Branches",
                slug: "companies-branches"
            },
            token: this.$store.state.User.token || Cookies.get("token")
        }
    }
    // methods: {
    //     getTableData(apiUrl, options) {
    //         return axios({
    //             url: apiUrl,
    //             params: options.params
    //         });
    //     },
    //     initialize() {
    //         this.$refs.Vuetable.refresh();
    //     }
    // }
}
