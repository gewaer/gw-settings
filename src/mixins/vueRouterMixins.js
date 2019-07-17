import isEmpty from "lodash/isEmpty";
import some from "lodash/some";
import pickBy from "lodash/pickBy";
import ModalsUnsavedChanges from "../components/modals/unsaved-changes";

export default {
    computed: {
        hasChanged() {
            return some(this.vvFields, field => field.changed);
        }
    },
    beforeRouteLeave(to, from, next) {
        const vvFields = this.removeIgnoreUnsavedFields();
        const formFields = pickBy(vvFields, field => field.changed);

        if (!isEmpty(formFields)) {
            this.$modal.show(ModalsUnsavedChanges, {
                buttons: [{
                    title: "Discard",
                    handler: () => {
                        this.$modal.hide("unsaved-changes");
                        next();
                    }
                }, {
                    title: "Cancel",
                    class: "btn-primary",
                    handler: () => {
                        this.$modal.hide("unsaved-changes");
                        next(false);
                    }
                }],
                fields: formFields
            }, {
                adaptive: true,
                clickToClose: false,
                height: "auto",
                name: "unsaved-changes",
                scrollable: true
            });
        } else {
            next();
        }
    },
    methods: {
        removeIgnoreUnsavedFields() {
            const vvFields = {};

            Object.keys(this.vvFields).forEach(field => {
                const $el = document.querySelector(`input[name="${field}"]`);

                if (!$el.hasAttribute("data-vv-ignore-unsaved")) {
                    vvFields[field] = this.vvFields[field];
                }
            });

            return vvFields;
        }
    }
}
