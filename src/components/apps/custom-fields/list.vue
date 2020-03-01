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
            <div class="card">
                <gw-browse
                    v-if="selectedModule.id"
                    ref="gwBrowse"
                    :append-params="appendParams"
                    :create-resource-url="{ name: 'settingsAppsCustomFieldsForm', params: { module: selectedModule.name } }"
                    :http-options="{ baseURL, headers: { Authorization: token }}"
                    :query-params="queryParams"
                    :resource="resource"
                    :show-bulk-actions="false"
                    :show-pagination="false"
                    :show-search-filters="false"
                    :show-title="false"
                    data-path=""
                    pagination-path=""
                    @load-error="loadError"
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
                </gw-browse>
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
            modules: [],
            selectedModule: {}
        }
    },
    computed: {
        resource() {
            return {
                name: "Field",
                slug: "custom-fields-modules",
                endpoint: `custom-fields-modules/${this.selectedModule.id}/fields`
            }
        }
    },
    created() {
        this.getModules();
    },
    methods: {
        changeModule(module) {
            this.selectedModule = module;

            if (this.$refs.gwBrowse) {
                // this.$refs.gwBrowse.refresh();
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
