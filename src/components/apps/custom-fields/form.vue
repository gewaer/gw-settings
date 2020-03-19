<template>
    <container-template>
        <tabs-menu slot="tab-menu" />
        <div slot="tab-content" class="custom-fields-settings">
            <template v-if="module">
                <edit-field-modal @update-field="updateField" />
                <h5>{{ module.name }}</h5>
                <div class="row">
                    <div class="col-4">
                        <div class="custom-fields-picker">
                            <h4>remove a Field</h4>
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
                                :list="customFields"
                                :group="{ name: 'fieldTypes' }"
                                class="row h-100 align-content-start"
                                @add="add"
                            >
                                <div
                                    v-for="(field, index) in customFields"
                                    :key="field.name + field.id + (index + 1)"
                                    class="col-6 d-flex"
                                >
                                    <div class="custom-field flex-fill">
                                        {{ field.label | capitalize }}
                                        <i :class="fieldIcons[field.fields_type_id]" />
                                    </div>
                                    <div class="edit-custom-field" @click="editField(field, index)">
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
                            <button class="btn btn-primary">
                                Save
                            </button>
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
import _clone from "lodash/clone";
import _range from "lodash/range";
import _zipObject from "lodash/zipObject";
import ContainerTemplate from "../../../container";
import EditFieldModal from "./edit-field-modal";
import draggable from "vuedraggable";
import TabsMenu from "../tabs";
import fieldSchemas from "./fields-schemas";

export default {
    name: "Form",
    components: {
        ContainerTemplate,
        draggable,
        EditFieldModal,
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

            const schema = fieldSchemas(type, fieldData);

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
                const fieldNames = data.map(f => f.name);
                this.fieldTypes = data;
                this.fieldIcons = _zipObject(data.map(f => f.id), data.map(f => f.icon));
                this.fieldReference = _zipObject(data.map(f => f.id), fieldNames);
                this.fieldTracks = _zipObject(fieldNames, _range(1, data.length + 1, 0));
            })
        },
        getModuleData() {
            axios({
                url: `/custom-fields-modules/${this.$route.params.moduleId}`
            }).then(({ data }) => {
                this.customFields = data.custom_fields;
                delete data.fields;
                this.module = data;
            }).catch(() => {})
        },
        setField(field) {
            const newField = {
                users_id: this.userId,
                companies_id: this.companyId,
                apps_id: this.appId,
                name: "",
                label: `${_capitalize(field.name)} ${this.fieldTracks[field.name]}`,
                custom_fields_modules_id: this.module.id,
                fields_type_id: field.id,
                attributes: {}
            }

            this.fieldTracks[field.name]++;

            return newField;
        },
        updateField(values, field, type, index) {
            const data = {
                ...field,
                name: field.id && field.name || uuidv4(),
                attributes: {}
            };

            Object.keys(values).forEach((key) => {
                if (key.startsWith("attributes:")) {
                    data.attributes[key.split(":")[1]] = values[key];
                } else {
                    if (type == "select" && key == "values") {
                        data[key] = values[key].split("\n");
                    } else {
                        data[key] = values[key];
                    }
                }
            });

            const url = "/custom-fields" + (data.id ? `/${data.id}` : "");
            const method = data.id ? "PUT" : "POST";

            // Temporary
            axios({
                url,
                method,
                data
            }).then(({ data }) => {
                this.$set(this.customFields, index, data);
                this.$modal.hide("edit-field-modal");
            });
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
