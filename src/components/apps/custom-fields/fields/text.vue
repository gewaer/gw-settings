<template>
    <div class="col" @click="sendSchema()">
        <div class="custom-field">
            <div class="custom-field__image">
                <img src="/img/settings/custom-fields/text-field.png" class="img-fluid">
            </div>
            <span>Text</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "FieldsText",
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
                    field: "attributes:maxlength",
                    label: "Max Length",
                    type: "number",
                    value: this.schemaData.attributes.maxlength || 255,
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
                        required: true,
                        min_value: 1,
                        max_value: 255
                    }
                }
            ];
        },
        sendSchema() {
            if (this.fieldData) {
                this.schemaData = this.fieldData;
            }

            this.$emit("schema", this.generateFieldsSchema(), "text", 1);
        }
    }
}
</script>
