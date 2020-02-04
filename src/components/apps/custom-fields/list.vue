<template>
    <container-template>
        <div slot="tab-content" class="custom-fields-settings">
            <h5>Custom Fields</h5>
            <ul class="nav nav-tabs nav-horizontal">
                <li v-for="module in modules" :key="'modules-' + module.id" class="nav-item">
                    <a
                        :class="{ active: selectedModule.name == module.name }"
                        href="#"
                        @click.prevent="changeModule(module)"
                    >
                        {{ module.name.replace("_", " ") }}
                    </a>
                </li>
            </ul>
            <router-link :to="{ name: 'settingsAppsCustomFieldsForm', params: { module: selectedModule.name } }" class="mb-4 btn btn-primary">
                Create
            </router-link>
            <div class="card">
                <div class="table-responsive">
                    <vuetable
                        v-if="selectedModule.id"
                        ref="CustomFieldsTable"
                        :append-params="appendParams"
                        :fields="tableFields"
                        :http-fetch="getCustomFields"
                        api-url=""
                        class="table table-hover table-condensed"
                        data-path=""
                        pagination-path=""
                    >
                        <template slot="actions" slot-scope="props">
                            <div class="d-flex align-items-center justify-content-end">
                                <button class="btn btn-primary m-l-5" @click="editCustomField(props.rowData.id)">
                                    <i class="fa fa-edit" aria-hidden="true" />
                                </button>
                                <button
                                    class="btn btn-danger m-l-5"
                                    @click="confirmDelete(props.rowData.id)"
                                >
                                    <i class="fa fa-trash" aria-hidden="true" />
                                </button>
                            </div>
                        </template>
                    </vuetable>
                </div>
            </div>
        </div>
    </container-template>
</template>

<script>
import listMixins from "../../../mixins/listMixins";
import ContainerTemplate from "../../../container";

export default {
    name: "List",
    components: {
        ContainerTemplate
    },
    mixins: [
        listMixins
    ],
    data() {
        return {
            appendParams:{
                format: "true"
            },
            modules: [],
            selectedModule: {},
            tableFields: [{
                name: "label",
                sortField: "label"
            }, {
                name: "actions",
                title: "Actions",
                titleClass: "table-actions",
                dataClass: "table-actions"
            }]
        }
    },
    created() {
        this.getModules();
    },
    methods: {
        changeModule(module) {
            this.selectedModule = module;

            if (this.$refs.CustomFieldsTable) {
                this.$refs.CustomFieldsTable.refresh();
            }
        },
        editCustomField(customFieldsId) {
            this.$router.push({
                name: "settingsAppsCustomFieldsFormEdit",
                params: {
                    module: this.selectedModule.name,
                    id: customFieldsId
                }
            });
        },
        getCustomFields() {
            return axios({
                url: `/custom-fields-modules/${this.selectedModule.id}/fields`
            });
        },
        getModules() {
            axios({
                url: "/custom-fields-modules"
            }).then(({ data }) => {
                this.modules = data;
                this.changeModule(data[0]);
            });
        }
    }
}
</script>
