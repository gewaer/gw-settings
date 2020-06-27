<template>
    <container-template>
        <div slot="tab-content">
            <h5>Companies Manager</h5>
            <div class="card">
                <gw-browse
                    ref="gwBrowse"
                    :append-params="appendParams"
                    :create-resource-url="{ name: 'settingsManagerForm' }"
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
                            <button class="btn btn-primary m-l-5" @click="editCompany(props.rowData.id)">
                                <i class="fa fa-edit" aria-hidden="true" />
                            </button>
                            <button
                                :class="{ 'disable-element': isCurrentCompany(props.rowData.id) }"
                                :disabled="isCurrentCompany(props.rowData.id)"
                                class="btn btn-danger m-l-5"
                                @click="confirmDelete(props.rowData.id)"
                            >
                                <i class="fa fa-trash" aria-hidden="true" />
                            </button>
                        </div>
                    </template>
                </gw-browse>
            </div>
            <modal
                :draggable="true"
                :adaptive="true"
                :scrollable="true"
                name="company-modal"
                height="auto"
                @closed="selectedCompany = null"
            />
        </div>
    </container-template>
</template>

<script>
import { mapState } from "vuex";
import generalMixins from "../../mixins/general";
import listMixins from "../../mixins/listMixins";
import ContainerTemplate from "../../container";

export default {
    name: "CompaniesManager",
    components: {
        ContainerTemplate
    },
    mixins: [
        generalMixins,
        listMixins
    ],
    data() {
        return {
            appendParams:{
                format: "true",
                relationships: "hasActivities,logo",
                q: "(is_deleted:0)"
            },
            isEditable: true,
            isLoading: false,
            resource: {
                name: "Companies",
                slug: "companies"
            },
            selectedCompany: null
        }
    },
    computed: {
        ...mapState({
            company: state => state.Company.data
        })
    },
    methods: {
        checkActivities(companyId) {
            if (company.has_activities == 1) {
                this.$modal.show("basic-modal", {
                    title: "Delete Company",
                    message: "You cannot delete companies that have activities registered in the system.",
                    buttons: [{
                        title: "Accept",
                        class: "btn-success",
                        handler: () => {
                            this.$modal.hide("basic-modal");
                        }
                    }]
                });
            } else {
                this.deleteCompany(companyId);
            }
        },
        confirmDelete(companyId) {
            if (this.isLoading) {
                return;
            }

            this.basicActionsModal({
                title: "Delete Company",
                message: "Are you sure you want to delete this company?",
                handler: this.checkActivities,
                params: companyId
            });
        },
        deleteCompany(companyId) {
            this.isLoading = true;

            axios({
                url: `/companies/${companyId}`,
                method: "DELETE"
            }).then(() => {
                this.$notify({
                    title: "Deleted",
                    text: "The company has been deleted",
                    type: "success"
                });

                this.$refs.Vuetable.reload();
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.isLoading = false;
            });
        },
        editCompany(companyId) {
            this.$router.push({
                name: "settingsManagerFormEdit",
                params: {
                    id: companyId
                }
            });
        },
        isCurrentCompany(companyId) {
            return companyId == this.company.id;
        }
    }
};
</script>
