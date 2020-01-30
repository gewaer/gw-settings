<template>
    <container-template>
        <tabs-menu slot="tab-menu" />
        <div slot="tab-content">
            <h5>
                Branches
            </h5>
            <div class="table-responsive">
                <gw-browse
                    ref="gwBrowse"
                    :append-params="appendParams"
                    :create-resource-url="{ name: 'settingsCompaniesBranchesForm' }"
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
                            <button class="btn btn-primary m-l-5" @click="editBranch(props.rowData.id)">
                                <i class="fa fa-edit" aria-hidden="true" />
                            </button>
                            <button
                                :class="{ 'disable-element': isCurrentBranch(props.rowData.id) }"
                                :disabled="isCurrentBranch(props.rowData.id)"
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
import { mapState } from "vuex";
import generalMixins from "../../../mixins/general";
import listMixins from "../../../mixins/listMixins";
import ContainerTemplate from "../../../container";
import TabsMenu from "../tabs";
import GwBrowse from "../../../../../gw-browse/src/index";

export default {
    name: "List",
    components: {
        ContainerTemplate,
        TabsMenu,
        GwBrowse
    },
    mixins: [
        generalMixins,
        listMixins
    ],
    data() {
        return {
            branchesFields: [{
                name: "name",
                sortField: "name"
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
            isLoading: false,
            resource: {
                name: "Branches",
                slug: "companies-branches"
            },
            selectedBranch: null,
            // ======================================================
            // ======================================================
            // ======================================================
            baseURL: process.env.VUE_APP_BASE_API_URL,
            queryParams: {
                sort: "sort",
                page: "page",
                perPage: "limit"
            },
            token: this.$store.state.User.token || Cookies.get("token")
        }
    },
    computed: {
        ...mapState({
            branch: state => state.Company.data.branch
        })
    },
    methods: {
        confirmDelete(roleId) {
            this.basicActionsModal({
                title: "Delete Branch",
                message: "Are you sure you want to delete this branch?",
                handler: this.delete,
                params: roleId
            });
        },
        delete(id) {
            if (this.isLoading || this.branch.id == id) {
                return;
            }

            this.isLoading = true;

            axios({
                url: `/companies-branches/${id}`,
                method: "DELETE"
            }).then(() => {
                this.$notify({
                    title: "Deleted",
                    text: "The branch has been deleted.",
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
            })
        },
        editBranch(branchId) {
            this.$router.push({
                name: "settingsCompaniesBranchesFormEdit",
                params: {
                    id: branchId
                }
            });
        },
        isCurrentBranch(branchId) {
            return branchId == this.branch.id;
        },
        // ===========================================================
        // ===========================================================
        // ===========================================================
        loadError(error) {
            this.$notify({
                title: "Error",
                text: error.response.data.errors.message,
                type: "error"
            });
        },
        paginationData(data) {
            const paginationData = {
                total: parseInt(data.total_rows),
                per_page: parseInt(data.limit),
                current_page: parseInt(data.page),
                last_page: parseInt(data.total_pages)
            }

            const nextParams = this.$refs.gwBrowse.getAllQueryParams();
            nextParams.page = nextParams.page == paginationData.last_page ? null : nextParams.page + 1;
            const prevParams = this.$refs.gwBrowse.getAllQueryParams();
            prevParams.page = prevParams.page == 1 ? null : prevParams.page - 1;

            const nextQuery = Object.keys(nextParams).map(key => `${key}=${nextParams[key]}`);
            const prevQuery = Object.keys(prevParams).map(key => `${key}=${prevParams[key]}`);

            paginationData.next_page_url = nextParams.page === null ? null : `${this.baseURL}?${nextQuery.join("&")}&format=true`;
            paginationData.prev_page_url = prevParams.page === null ? null : `${this.baseURL}?${prevQuery.join("&")}&format=true`;
            paginationData.from = (paginationData.current_page - 1) * paginationData.per_page + 1;
            paginationData.to = paginationData.from + paginationData.per_page - 1;

            return paginationData;
        }
    }
};
</script>
