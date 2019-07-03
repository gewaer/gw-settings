export default {
    methods: {
        getTableData(apiUrl, options) {
            return axios({
                url: apiUrl,
                params: options.params
            });
        },
        initialize() {
            this.$refs.Vuetable.refresh();
        }
    }
}
