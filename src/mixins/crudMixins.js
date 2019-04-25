import some from "lodash/some";
import pickBy from "lodash/pickBy";

export default {
    methods: {
        triggerCancel() {
            if (some(this.formFields, field => field.changed)) {
                this.$modal.show("unsaved-changes", {
                    buttons: [{
                        title: "Discard",
                        handler: () => {
                            this.$modal.hide("unsaved-changes");
                            this.cancel();
                        }
                    }, {
                        title: "Cancel",
                        class: "btn-primary",
                        handler: () => {
                            this.cancel();
                            this.$modal.hide("unsaved-changes");
                        }
                    }],
                    fields: pickBy(this.formFields, field => field.changed)
                });
            } else {
                this.cancel();
            }
        }
    },
    watch: {
        formFields: {
            handler(formFields) {
                this.$emit("form-fields", formFields)
            },
            deep: true
        }
    }
}
