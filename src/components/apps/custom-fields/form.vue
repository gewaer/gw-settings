<template>
    <container-template>
        <!-- <tabs-menu slot="tab-menu" /> -->
        <div slot="tab-content" class=" custom-fields-settings">
            <custom-fields-conf-modal />
            <h5>{{ title }}</h5>
            <div class="row">
                <div class="col-4">
                    <div class="custom-fields-picker">
                        <h4>New Fields</h4>
                        <p>Drag and drop the fields you want to add them to the module.</p>
                        <p>Edit their options after you add them.</p>
                        <draggable
                            class="custom-fields-draggable row"
                            :list="customFields"
                            :group="{ name: 'customFields', pull: 'clone', put: false }"
                        >
                            <div
                                v-for="customField in customFields"
                                :key="customField.id"
                                class="col-6"
                            >
                                <div class="custom-field">
                                    {{ customField.name }}
                                    <i :class="customField.icon" />
                                </div>
                            </div>
                        </draggable>
                    </div>
                </div>
                <div class="col">
                    <div class="selected-custom-fields">
                        <h4>Current Fields</h4>
                        <draggable
                            class="row h-100 align-content-start"
                            :list="selectedCustomFields"
                            group="customFields"
                            @change="change"
                        >
                            <div
                                v-for="(customField, index) in selectedCustomFields"
                                :key="customField.name + customField.id + (index + 1)"
                                class="col-6 d-flex"
                            >
                                <div class="custom-field flex-fill">
                                    {{ customField.name }}
                                    <i :class="customField.icon" />
                                </div>
                                <div class="edit-custom-field" @click="$modal.show('custom-fields-conf-modal')">
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
                        <button type="button" class="btn btn-danger mr-2">
                            Cancel
                        </button>
                        <button class="btn btn-primary">
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <!-- <div class="col">
                <div class="custom-fields">
                    <h5>Custom Fields</h5>
                    <tabs-menu slot="tab-menu" />
                    <div class="card">
                        <h6>{{ title }}</h6>
                        <div class="row custom-fields-container">
                            <div class="col-md-3">
                                <fields-text
                                    ref="text"
                                    :class="{ 'selected': fieldsType == 'text' }"
                                    :field-data="fieldData"
                                    @schema="setSchema"
                                />
                                <fields-select
                                    ref="select"
                                    :class="{ 'selected': fieldsType == 'select' }"
                                    :field-data="fieldData"
                                    @schema="setSchema"
                                />
                                <fields-checkbox
                                    ref="checkbox"
                                    :class="{ 'selected': fieldsType == 'checkbox' }"
                                    :field-data="fieldData"
                                    @schema="setSchema"
                                />
                            </div>
                            <div class="col-md-9">
                                <custom-fields-form
                                    v-if="fieldsSchema"
                                    ref="customFields"
                                    :emit-values-on-update="true"
                                    :form-fields="fieldsSchema"
                                    :form-options="formOptions"
                                    class="d-flex h-100 flex-column"
                                    form-name="customFields"
                                    @formCancelled="formCancelled"
                                    @formSubmitted="formSubmitted"
                                    @formValuesUpdated="formValuesUpdated"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </container-template>
</template>

<script>
import ContainerTemplate from "../../../container";
// import FieldsCheckbox from "./fields/checkbox";
// import FieldsSelect from "./fields/select";
// import FieldsText from "./fields/text";
// import TabsMenu from "../tabs";
import draggable from "vuedraggable";
import CustomFieldsConfModal from "./field-conf-modal";

export default {
    name: "Form",
    components: {
        ContainerTemplate,
        // FieldsCheckbox,
        // FieldsSelect,
        // FieldsText,
        // TabsMenu,
        draggable,
        CustomFieldsConfModal
    },
    data() {
        return {
            customFields: [
                {
                    name: "Text",
                    icon: "fas fa-font",
                    id: 1
                },
                {
                    name: "WYSIWYG",
                    icon: "fas fa-quote-right",
                    id: 2
                },
                {
                    name: "DateTime",
                    icon: "fas fa-clock",
                    id: 3
                },
                {
                    name: "Calendar",
                    icon: "fas fa-calendar-alt",
                    id: 4
                },
                {
                    name: "Image",
                    icon: "fas fa-file-image",
                    id: 5
                },
                {
                    name: "File",
                    icon: "fas fa-file-alt",
                    id: 6
                },
                {
                    name: "Status",
                    icon: "fas fa-flag",
                    id: 7
                },
                {
                    name: "Toggle",
                    icon: "fas fa-toggle-on",
                    id: 8
                },
                {
                    name: "Language",
                    icon: "fas fa-language",
                    id: 9
                },
                {
                    name: "Select",
                    icon: "fas fa-check-circle",
                    id: 10
                }
            ],
            selectedCustomFields: [
                {
                    name: "Text",
                    icon: "fas fa-font",
                    id: 1
                },
                {
                    name: "WYSIWYG",
                    icon: "fas fa-quote-right",
                    id: 2
                }
            ],
            // formData: {
            //     name: ""
            // },
            // fieldData: null,
            // fieldsSchema: [],
            // fieldsType: null,
            // fieldsTypeId: null,
            // formOptions: {
            //     actionsWrapperClass: "d-flex justify-content-end mt-auto",
            //     buttons: {
            //         cancel: {
            //             class: "btn btn-danger m-r-10",
            //             text: "Cancel"
            //         },
            //         submit: {
            //             class: "btn btn-primary",
            //             text: "Save"
            //         }
            //     }
            // },
            // selectedCustomField: "text-field",
            selectedModule: {}
        };
    },
    computed: {
        isEditing() {
            return !!this.$route.params.id;
        },
        title() {
            return this.selectedModule.name;
        }
    },
    created() {
        this.getModules();

        if (this.isEditing) {
            this.getCustomFieldData();
        }
    },
    methods: {
        formCancelled() {
            this.$router.push({ name: "settingsAppsCustomFieldsList" });
        },
        formSubmitted({ values }) {
            const data = {
                name: Math.random().toString(36).substr(2, 4) + "_" + Math.random().toString(36).substr(2, 4),
                custom_fields_modules_id: this.selectedModule.id,
                fields_type_id: this.fieldsTypeId,
                attributes: {}
            };
            const url = "/custom-fields" + (this.isEditing ? `/${this.$route.params.id}` : "");
            const method = this.isEditing ? "PUT" : "POST";

            Object.keys(values).forEach((key) => {
                if (key.startsWith("attributes:")) {
                    data.attributes[key.split(":")[1]] = values[key];
                } else {
                    if (this.fieldsType == "select" && key == "values") {
                        data[key] = values[key].split("\n");
                    } else {
                        data[key] = values[key];
                    }
                }
            });

            axios({
                url,
                method,
                data
            }).then(() => {
                this.formCancelled();
            });
        },
        formValuesUpdated(values) {
            // While not the best solution due to design. It's something that can be worked with.
            if (this.fieldsType == "select" && values.values) {
                const options = values.values.split("\n").map(option => option.trim());

                this.$refs.customFields.$refs.control[2].$children[0].options = options;
            }
        },
        getCustomFieldData() {
            axios({
                url: `/custom-fields/${this.$route.params.id}`
            }).then(async({ data }) => {
                if (data.type.name == "select") {
                    data.values = data.values.reduce((valuesArray, value) => {
                        valuesArray[+value.value] = value.label;
                        return valuesArray;
                    }, []).join("\n");
                }

                this.fieldsType = data.type.name;
                this.fieldsTypeId = data.fieldsTypeId;
                await (this.fieldData = data);
                this.$refs[this.fieldsType].sendSchema();
            });
        },
        getModules() {
            axios({
                url: "/custom-fields-modules"
            }).then(({ data }) => {
                let preSelectedModule = null;
                preSelectedModule = data.find(module => module.name == this.$route.params.module);

                if (preSelectedModule) {
                    this.selectedModule = preSelectedModule;
                }
            });
        },
        save() {},
        async setSchema(schema, type, typeId) {
            await (this.fieldsSchema = []);
            this.fieldsSchema = schema;
            this.fieldsType = type;
            this.fieldsTypeId = typeId;
        },
        change(event) {
            switch (Object.keys(event)[0]) {
                case "added":
                    this.$modal.show("custom-fields-conf-modal");
                    break;

                case "moved":
                    break;

                default:
                    break;
            }
            // console.log(event)
        }
    }
};
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
