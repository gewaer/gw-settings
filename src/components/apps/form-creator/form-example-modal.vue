<template>
    <modal
        :adaptive="true"
        :scrollable="true"
        class="form-example-modal"
        name="form-example-modal"
        height="auto"
        width="900"
        @before-open="beforeOpen"
    >
        <h4>Form Example Modal</h4>
        <custom-fields-form
            v-if="fieldsSchema"
            ref="customFields"
            :form-fields="fieldsSchema"
            :form-options="formOptions"
            class="d-flex h-100 flex-column"
            form-name="customFields"
            @formCancelled="$modal.hide('form-example-modal')"
        />
    </modal>
</template>

<script>
export default {
    name: "FormExampleModal",
    data() {
        return {
            fieldData: null,
            fieldsSchema: [],
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
            this.fieldData = event.params.data;
            this.fieldsSchema = event.params.schema;
        }
    }
}
</script>

<style lang="scss">
.form-example-modal {
    .v--modal {
        padding: 35px;
    }
}
</style>
