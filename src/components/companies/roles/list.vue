<template>
    <container-template>
        <div slot="tab-content">
            <h5>Company Settings</h5>
            <tabs-menu slot="tab-menu" />
            <div class="card">
                <gw-browse
                    ref="gwBrowse"
                    :append-params="appendParams"
                    :create-resource-url="{ name: 'settingsCompaniesRolesForm' }"
                    :http-options="{ baseURL, headers: { Authorization: token }}"
                    :pagination-data="paginationData"
                    :query-params="queryParams"
                    :resource="resource"
                    :show-bulk-actions="false"
                    :show-search-filters="false"
                    :show-title="false"
                    pagination-path=""
                    @load-error="loadError"
                >
                    <template slot="actions" slot-scope="props">
                        <div class="d-flex align-items-center justify-content-end">
                            <button v-if="!isGlobal(props.rowData)" class="btn btn-primary m-l-5" @click="editRole(props.rowData)">
                                <i class="fa fa-edit" aria-hidden="true" />
                            </button>
                            <button class="btn btn-primary m-l-5" title="clone role" @click="cloneRole(props.rowData)">
                                <i class="fa fa-copy" aria-hidden="true" />
                            </button>
                            <button v-if="!isGlobal(props.rowData)" class="btn btn-danger m-l-5" @click="confirmDelete(props.rowData.id)">
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
import vuexMixins from "../../../mixins/vuexMixins";
import listMixins from "../../../mixins/listMixins";
import ContainerTemplate from "../../../container";
import TabsMenu from "../tabs";

export default {
    name: "List",
    components: {
        ContainerTemplate,
        TabsMenu
    },
    mixins: [
        vuexMixins,
        listMixins
    ],
    data() {
        return {
            resource: {
                name: "Roles",
                title: "Roles",
                slug: "roles"
            }
        }
    },
    methods: {
        rolesCRUD() {
            this.$emit("changeView", "rolesCrud");
        },

        confirmDelete(roleId) {
            // change for swal or any other
            if (confirm("are you sure?")) {
                this.deleteRole(roleId)
            }
        },

        isGlobal(role) {
            return Number(role.apps_id) == 1;
        },

        deleteRole(id) {
            axios({
                url: `/roles-acceslist/${id}`,
                method: "DELETE"
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Deleted",
                    text: "The roles has been deleted",
                    type: "success"
                });
                this.$refs.Vuetable.reload();
            }).catch((error) => {
                this.$notify({
                    group: null,
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {

            })
        },

        editRole(role) {
            this.$router.push({
                name: "settingsCompaniesRolesFormEdit",
                params: {
                    id: role.id
                }
            });
        },

        cloneRole(role) {
            axios({
                url: `/roles-acceslist/${role.id}/copy`,
                method: "POST"
            }).then(({ data }) => {
                this.editRole(data);
            })
        }
    }

}
</script>
