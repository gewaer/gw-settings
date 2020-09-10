<template>
    <container-template>
        <div slot="tab-content">
            <h5>Apps settings</h5>
            <tabs-menu slot="tab-menu" />
            <div class="card">
                <gw-browse
                    ref="gwBrowse"
                    :append-params="appendParams"
                    :http-options="{ baseURL, headers: { Authorization: token }}"
                    :pagination-data="paginationData"
                    :query-params="queryParams"
                    :resource="resource"
                    :show-bulk-actions="false"
                    :show-resource-actions="false"
                    :show-title="false"
                    pagination-path=""
                    @load-error="loadError"
                >
                    <template slot="actions" slot-scope="props">
                        <div class="d-flex align-items-center justify-content-end">
                            <button class="btn btn-primary m-l-5" @click="editCustomFields(props.rowData.id)">
                                <i class="fa fa-edit" aria-hidden="true" />
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
import TabsMenu from "../tabs";
import GwBrowse from "../../../../../gw-browse/src/browse";

export default {
    name: "List",
    components: {
        ContainerTemplate,
        TabsMenu,
        GwBrowse
    },
    mixins: [
        listMixins
    ],
    computed: {
        resource() {
            return {
                name: "Custom Fields Modules",
                slug: "custom-fields-modules"
            }
        }
    },
    methods: {
        editCustomFields(moduleId) {
            this.$router.push({
                name: "settingsAppsFormCreatorCrud",
                params: {
                    moduleId
                }
            });
        }
    }
}
</script>
