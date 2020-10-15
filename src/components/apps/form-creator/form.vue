<template>
    <container-template>
        <div slot="tab-content" class="custom-fields-settings">
            <h5>Apps settings</h5>
            <tabs-menu slot="tab-menu" />
            <template v-if="module">
                <div class="card">
                    <edit-field-modal @update-field="updateField" />
                    <form-example-modal />
                    <h5>{{ module.name }}</h5>
                    <div class="row">
                        <div class="col-4">
                            <div class="custom-fields-picker">
                                <h4>Add a Field</h4>
                                <p>Drag and drop the fields you want to add them to the module.</p>
                                <p>Edit their options after you add them.</p>
                                <draggable
                                    :clone="setField"
                                    :group="{ name: 'fieldTypes', pull: 'clone', put: false }"
                                    :list="fieldTypes"
                                    :sort="false"
                                    class="custom-fields-draggable row"
                                >
                                    <div
                                        v-for="type in fieldTypes"
                                        :key="type.id"
                                        class="col-6"
                                    >
                                        <div class="custom-field">
                                            {{ type.name | capitalize }}
                                            <i :class="type.icon" />
                                        </div>
                                    </div>
                                </draggable>
                            </div>
                        </div>
                        <div class="col">
                            <div class="selected-custom-fields">
                                <h4>Current Fields</h4>
                                <draggable
                                    :list="formSchema"
                                    :group="{ name: 'fieldTypes' }"
                                    class="row h-100 align-content-start"
                                    @add="add"
                                >
                                    <div
                                        v-for="(field, index) in formSchema"
                                        :key="field.field + (index + 1)"
                                        class="col-6 d-flex"
                                    >
                                        <div
                                            :class="{ 'system-field': field.system_field }"
                                            class="custom-field flex-fill"
                                        >
                                            {{ field.label | capitalize }}
                                            <i :class="fieldIcons[field.fields_type_id]" />
                                        </div>
                                        <div v-if="!field.system_field" class="edit-custom-field" @click="editField(field, index)">
                                            <i class="fas fa-ellipsis-v" />
                                        </div>
                                    </div>
                                </draggable>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="d-flex justify-content-end mt-4">
                                <button
                                    type="button"
                                    class="btn btn-danger mr-2"
                                    @click="cancel()"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    @click="save()"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-secondary ml-2"
                                    @click="example()"
                                >
                                    Example
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </container-template>
</template>

<script>
import { mapState } from "vuex";
import { v4 as uuidv4 } from "uuid";
import _capitalize from "lodash/capitalize";
import _chunk from "lodash/chunk";
import _clone from "lodash/clone";
import _range from "lodash/range";
import _zipObject from "lodash/zipObject";
import ContainerTemplate from "../../../container";
import EditFieldModal from "./edit-field-modal";
import FormExampleModal from "./form-example-modal";
import draggable from "vuedraggable";
import TabsMenu from "../tabs";
import fieldsSchemas from "./fields-schemas";
import fieldsTypesSchema from "./fields-types";

export default {
    name: "Form",
    components: {
        ContainerTemplate,
        draggable,
        EditFieldModal,
        FormExampleModal,
        TabsMenu
    },
    filters: {
        capitalize(value) {
            return _capitalize(value);
        }
    },
    data() {
        return {
            fieldIcons: {},
            fieldReference: {},
            fieldTracks: {},
            fieldTypes: [],
            formData: {},
            formSchema: [],
            customFields: [],
            module: null
        }
    },
    computed: {
        ...mapState({
            appId: state => state.Application.data.id,
            companyId: state => state.Company.data.id,
            userId: state => state.User.data.id
        })
    },
    created() {
        this.getFieldTypes();
        this.getFormData();
        this.getModuleData();
    },
    methods: {
        add(event) {
            this.editField(event.item._underlying_vm_, event.newIndex);
        },
        cancel() {
            this.$router.push({ name: "settingsAppsCustomFieldsList" });
        },
        change(event) {
            switch (Object.keys(event)[0]) {
                case "added":
                    this.editField(event.added.element, event.added.newIndex);
                    break;
                case "moved":
                    break;
                default:
                    break;
            }
        },
        editField(field, index) {
            const fieldData = _clone(field);
            const type = this.fieldReference[fieldData.fields_type_id];

            if (["select"].includes(type) && fieldData.values) {
                fieldData.values = fieldData.values.reduce((valuesArray, value) => {
                    valuesArray[+value.value] = value.label;
                    return valuesArray;
                }, []).join("\n");
            }

            const schema = fieldsSchemas(type, fieldData);

            this.$modal.show("edit-field-modal", {
                schema,
                type,
                field: fieldData,
                index
            });
        },
        async getFieldTypes() {
            await axios({
                url: `/custom-fields-types`
            }).then(({ data }) => {
                const fieldIds = data.map(field => field.id);
                const fieldNames = data.map(field => field.name);

                this.fieldIcons = _zipObject(fieldIds, data.map(field => field.icon));
                this.fieldReference = _zipObject(fieldIds, fieldNames);
                this.fieldTracks = _zipObject(fieldNames, _range(1, data.length + 1, 0));
                this.fieldTypes = data;
            })
        },
        async getFormData() {
            await axios({
                url: `/custom-forms/${this.$route.query.name}`
            }).then(response => {
                this.formData = response.data;

                const formSchema = JSON.parse(response.data.form_schema);
                this.formSchema = [].concat(...formSchema);
            });
        },
        async getModuleData() {
            await axios({
                url: `/custom-fields-modules/${this.$route.params.moduleId}`
            }).then(({ data }) => {
                this.customFields = data.custom_fields;
                delete data.fields;
                this.module = data;
            });
        },
        example() {
            const schema = _chunk(this.formSchema, 2);

            this.$modal.show("form-example-modal", {
                schema,
                data: {}
            });
        },
        async processCustomFields() {
            const promises = [];

            this.formSchema.forEach((field, index) => {
                if (!field.system_field) {
                    const customFieldData = this.setCustomFieldData(field);
                    promises.push(this.saveCustomField(customFieldData, index));
                }
            });

            await Promise.all(promises);
        },
        async save() {
            await this.processCustomFields();

            const schema = _chunk(this.formSchema, 2);
            const data = {
                ...this.formData,
                form_schema: JSON.stringify(schema)
            };

            axios({
                url: `/custom-forms/${this.formData.id}`,
                method: "PUT",
                data
            });
        },
        saveCustomField(data, index) {
            const url = "/custom-fields" + (data.id ? `/${data.id}` : "");
            const method = data.id ? "PUT" : "POST";

            // Temporary
            return axios({
                url,
                method,
                data
            }).then(({ data }) => {
                this.formSchema[index].id = data.id;
            });
        },
        setCustomFieldData(field) {
            return {
                ...field,
                custom_fields_modules_id: this.module.id,
                type: {
                    name: field.type
                },
                // These three fields should be populated by the API.
                users_id: Number.parseInt(this.userId),
                companies_id: Number.parseInt(this.companyId),
                apps_id: Number.parseInt(this.appId)
            }
        },
        setField(field) {
            const fieldData = {
                name: `${field.name}-${this.fieldTracks[field.name]}`,
                label: `${_capitalize(field.name)} ${this.fieldTracks[field.name]}`,
                // This field is used on select fields.
                values: ""
            };

            const fieldSchema = {
                ...fieldsTypesSchema(field.name, fieldData),
                name: uuidv4(),
                fields_type_id: Number.parseInt(field.id)
            };

            this.fieldTracks[field.name]++;

            return fieldSchema;
        },
        updateField(values, field, type, index) {
            Object.keys(values).forEach((key) => {
                if (key.startsWith("attributes:")) {
                    field.attributes[key.split(":")[1]] = values[key];
                } else {
                    if (type == "select" && key == "values") {
                        field[key] = values[key].split("\n");
                    } else {
                        field[key] = values[key];
                    }
                }
            });

            this.$set(this.formSchema, index, field);
            this.$modal.hide("edit-field-modal");
        }
    }
}
</script>

<style lang="scss" scoped>
.custom-fields {
    .custom-fields-container /deep/ {
        padding-top: 40px;

        .selected {
            border:1px solid var(--base-color);
        }

        .col-3 {
            padding-left: 20px;
            padding-right: 20px;
        }

        .custom-field {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            margin-bottom: 20px;
            padding: 15px;

            &__image {
                width: 120px;
            }

            span {
                margin-top: 10px;
                font-size: 15px;
                font-weight: bold;
            }

            &.selected {
                outline: 1px solid #e5e5e5;
                box-shadow: 2px 2px 2px #e5e5e5;
            }
        }
    }

    .form-control {
        height: 43px;
    }
}
</style>

<style lang="scss">
.custom-fields-settings {
    h5 {
        text-transform: capitalize;
        margin-top: 0 !important;
    }

    .custom-field {
        background-color: white;
        border-radius: 3px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding: 10px 15px;
        font-size: 14px;
        cursor: all-scroll;

        &.system-field {
            background-color: #e4e4e4;
        }
    }

    .custom-fields-picker {
        padding: 50px;
        background-color: var(--darken-base-color);

        h4 {
            color: white;
            margin-bottom: 25px;
            font-size: 20px;
        }

        p {
            color: white;
            margin-bottom: 5px;
            font-size: 12px;
        }

        .custom-fields-draggable {
            padding: 30px 0;

            .col-6 {
                flex: 0 0 100%;
                max-width: 100%;
            }
        }
    }

    .selected-custom-fields {
        border: 2px dashed #e4e4e4;
        padding: 30px;
        height: 100%;

        h4 {
            margin-bottom: 25px;
        }

        .custom-field {
            border: 1px solid #A5A5A5;
        }

        .edit-custom-field {
            margin-bottom: 15px;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #3EB9DD;
            color: white;
            margin-left: -3px;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            cursor: pointer;
        }
    }
}
</style>
