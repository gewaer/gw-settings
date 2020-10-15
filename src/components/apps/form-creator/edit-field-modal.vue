<template>
    <modal
        :adaptive="true"
        :scrollable="true"
        class="custom-fields-conf-modal"
        name="edit-field-modal"
        height="auto"
        width="900"
        @before-open="beforeOpen"
    >
        <h4>Customize the {{ fieldsType }} field</h4>
        <custom-fields-form
            v-if="fieldsSchema"
            ref="customFields"
            :emit-values-on-update="true"
            :form-fields="fieldsSchema"
            :form-options="formOptions"
            class="d-flex h-100 flex-column"
            form-name="customFields"
            @form-cancelled="$modal.hide('edit-field-modal')"
            @form-submitted="submit"
            @form-values-updated="updated"
        />
    </modal>
</template>

<script>
export default {
    name: "EditFieldModal",
    data() {
        return {
            fieldData: null,
            fieldIndex: null,
            fieldsSchema: [],
            fieldsType: null,
            formOptions: {
                actionsWrapperClass: "d-flex justify-content-end mt-auto",
                buttons: {
                    cancel: {
                        class: "btn btn-danger mr-2",
                        text: "Cancel"
                    },
                    submit: {
                        class: "btn btn-primary",
                        text: "Save"
                    }
                }
            }
        }
    },
    methods: {
        beforeOpen(event) {
            this.fieldData = event.params.field;
            this.fieldIndex = event.params.index;
            this.fieldsSchema = event.params.schema;
            this.fieldsType = event.params.type;
        },
        submit({ values }) {
            this.$emit("update-field", values, this.fieldData, this.fieldsType, this.fieldIndex);
        },
        updated(values) {
            // While not the best solution due to design. It's something that can be worked with.
            if (this.fieldsType == "select" && values.values) {
                const options = values.values.split("\n").map(option => option.trim());

                this.$refs.customFields.$refs.control[2].$children[0].options = options;
            }
        }
    }
}
</script>

<style lang="scss">
.custom-fields-conf-modal {
    .v--modal {
        padding: 35px;

        h4 {
            font-family: 'Lato', sans-serif;
            /* font-size: 18px; */
            margin-bottom: 25px;
        }
    }
}
</style>
