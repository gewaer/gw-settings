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

        this.checkForUnsavedChanges(formFields, next);
    },
    methods: {
        checkForUnsavedChanges(formFields, next) {
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
        removeIgnoreUnsavedFields() {
            const vvFields = {};

            Object.keys(this.vvFields).forEach(field => {
                let $el = document.querySelector(`[name="${field}"]`);

                if ($el.className.includes("multiselect__")) {
                    $el = $el.closest("div.multiselect");
                }

                if (!$el.hasAttribute("data-vv-ignore-unsaved")) {
                    vvFields[field] = this.vvFields[field];
                }
            });

            return vvFields;
        },
        clearChangedFields() {
            this.$validator._base.fields.items.forEach(item => {
                item.flags.changed = false
            });
        }
    }
}
