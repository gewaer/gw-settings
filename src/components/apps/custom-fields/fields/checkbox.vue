<template>
    <div class="col" @click="sendSchema()">
        <div class="custom-field">
            <div class="custom-field__image">
                <img src="/img/settings/custom-fields/checkbox.png" class="img-fluid">
            </div>
            <span>Text</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "FieldsCheckbox",
    props: {
        fieldData: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            schemaData: {
                attributes: {}
            }
        }
    },
    methods: {
        generateFieldsSchema() {
            return [
                {
                    field: "label",
                    label: "Field Label",
                    type: "text",
                    value: this.schemaData.label || "",
                    attributes: {
                        class: {
                            "form-control": true
                        }
                    },
                    wrapperAttributes: {
                        class: {
                            "form-group": true,
                            "form-group-default": true,
                            required: true
                        }
                    },
                    validations: {
                        required: true
                    }
                },
                {
                    field: "checkbox_value",
                    label: "Value",
                    type: "text",
                    value: this.schemaData.values || "",
                    attributes: {
                        class: {
                            "form-control": true
                        }
                    },
                    wrapperAttributes: {
                        class: {
                            "form-group": true,
                            "form-group-default": true,
                            required: true
                        }
                    },
                    validations: {
                        required: true
                    }
                }
            ];
        },
        sendSchema() {
            if (this.fieldData) {
                this.schemaData = this.fieldData;
            }

            this.$emit("schema", this.generateFieldsSchema(), "checkbox", 3);
        }
    }
}
</script>
