<template>
    <div class="col" @click="sendSchema()">
        <div class="custom-field">
            <div class="custom-field__image">
                <img src="/img/settings/custom-fields/autocomplete.png" class="img-fluid">
            </div>
            <span>Pick List</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "FieldsSelect",
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
                    field: "values",
                    label: "Field Options",
                    type: "textarea",
                    value: this.schemaData.values || "",
                    attributes: {
                        class: {
                            "form-control": true
                        },
                        style: {
                            height: "100px"
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
                    field: "default_value",
                    label: "Default Option",
                    type: "select",
                    options: [],
                    attributes: {
                        "show-labels": false
                    },
                    wrapperAttributes: {
                        class: {
                            "form-group": true
                        }
                    }
                }
            ]
        },
        sendSchema() {
            if (this.fieldData) {
                this.schemaData = this.fieldData;
            }

            this.$emit("schema", this.generateFieldsSchema(), "select", 2);
        }
    }
}
</script>
