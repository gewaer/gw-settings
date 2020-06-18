<template>
    <container-template>
        <div slot="tab-content">
            <h5>User Settings</h5>
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
                    :show-create-resource="false"
                    :show-search="false"
                    :show-search-filters="false"
                    :show-title="false"
                    pagination-path=""
                    @load-error="loadError"
                >
                    <template slot="actions" slot-scope="props">
                        <div class="d-flex align-items-center justify-content-end">
                            <button v-if="props.rowData" class="btn btn-danger m-l-5" @click="confirmDelete(props.rowData)">
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
import { mapState } from "vuex";
import generalMixins from "../../mixins/general";
import listMixins from "../../mixins/listMixins";
import ContainerTemplate from "../../container";
import TabsMenu from "./tabs";

export default {
    name: "UserDevices",
    components: {
        ContainerTemplate,
        TabsMenu
    },
    mixins: [
        generalMixins,
        listMixins
    ],
    data() {
        return {
            branchesFields: [{
                name: "source_username",
                title: "Device",
                sortField: "source_username",
                width: "30%"
            }, {
                name: "actions",
                title: "Actions",
                titleClass: "table-actions",
                dataClass: "table-actions"
            }],
            appendParams:{
                format: "true",
                q: "(is_deleted:0)"
            },
            resource: {
                name: "devices",
                slug: "devices",
            },
            defaultImage: "https://mctekk.com/images/logo-o.svg",
            isEditable: true,
            isLoading: false
        }
    },
    computed: {
        ...mapState({
            userData: state => state.User.data,
            appsId: state => state.Company.data.apps.apps_id
        })

    },
    methods: {
        confirmDelete(device) {
            this.basicActionsModal({
                title: "Detach Device",
                message: "Do you want to detach this device?",
                handler: this.detachDevice,
                params: device
            });
        },
        detachDevice(device) {
            if (this.isLoading) {
                return;
            }

            this.isLoading = true;
            const data = { ...device, app: this.appsId };

            axios({
                url: `users/${this.userData.id}/devices/${device.source_users_id_text}`,
                method: "DELETE",
                data
            }).then(() => {
                this.$notify({
                    title: "Deleted",
                    text: "The Device has been deleted",
                    type: "success"
                });
                this.$refs.DevicesList.reload();
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.isLoading = false;
            })
        },
        transformData(data) {
            data.data.forEach(item => {
                item.id = `${item.users_id}-${item.source_id}`;
            });

            return data;
        }
    }
};
</script>
