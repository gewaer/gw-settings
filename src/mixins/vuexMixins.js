import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters("Company", ["currentCompanyId"])
    },
    watch: {
        currentCompanyId() {
            if (this.hasOwnProperty("initialize")) {
                this.initialize();
            } else {
                console.warn("Component expects a defined initialize() method to respond properly to a currentCompanyId change");
            }
        }
    }
}
