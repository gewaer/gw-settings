<template>
    <container-template>
        <div slot="tab-content">
            <h5>Company Settings</h5>
            <tabs-menu slot="tab-menu" />
            <ul class="nav nav-tabs nav-horizontal">
                <li class="nav-item">
                    <a
                        :class="{ active: show == 'active' }"
                        @click.prevent="show = 'active'"
                    >
                        Active
                    </a>
                </li>
                <li class="nav-item">
                    <a
                        :class="{ active: show == 'invite' }"
                        @click.prevent="show = 'invite'"
                    >
                        Invites
                    </a>
                </li>
                <li class="nav-item">
                    <a
                        :class="{ active: show == 'inactive' }"
                        @click.prevent="show = 'inactive'"
                    >
                        Inactive
                    </a>
                </li>
            </ul>
            <div class="card">
                <gw-browse
                    ref="gwBrowse"
                    :append-params="currentParams"
                    :create-resource-url="{ name: 'settingsCompaniesUsersForm' }"
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
                            <button 
                                v-if="isInvite"
                                class="btn btn-primary m-l-5" 
                                title="copy to clipboard"
                                @click="copyInviteHash(props.rowData.invite_hash)"
                            >
                                <i class="fa fa-copy" aria-hidden="true" />
                            </button>
                            <button 
                                v-if="isInvite" 
                                class="btn btn-primary m-l-5" 
                                title="resend"
                                @click="sendInvite(props.rowData.id)"
                            >
                                <i class="fa fa-send" aria-hidden="true" />
                            </button>
                            <button v-else class="btn btn-primary m-l-5" @click="editUser(props.rowData.id)">
                                <i class="fa fa-edit" aria-hidden="true" />
                            </button>
                            <button
                                :class="{ 'disable-element': isCurrentUser(props.rowData.id) }"
                                :disabled="isCurrentUser(props.rowData.id)"
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

export default {
    name: "UsersList",
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
            inviteLinkBase: `${location.origin}/users/link/`,
            appendParams: {
                inactive: {
                    format: "true",
                    relationships: "companies,roles",
                    q: "(user_active:0,is_deleted:0)"
                },
                invite: {
                    format: "true",
                    relationships: "companies,roles",
                    q: "(is_deleted:0)"
                },
                active: {
                    format: "true",
                    relationships: "roles",
                    q: "(user_active:1,is_deleted:0)"
                }
            },
            currentParams: {},
            show: "active"
        }
    },
    computed: {
        ...mapState({
            userData: state => state.User.data
        }),
        endpoint() {
            return this.show == "invite" ? "users-invite" : "users";
        },

        resource() {

            return {
                endpoint: this.endpoint,
                name: "Users",
                slug: `users-${this.show}`
            }
        },
        isInvite() {
            return this.show == "invite";
        }
    },
    watch: {
        async show() {
            await (this.currentParams = this.appendParams[this.show]);
            this.$refs.gwBrowse.refresh();
        }
    },
    created() {
        this.currentParams = this.appendParams.active;
    },
    methods: {
        confirmDelete(usersId) {
            this.basicActionsModal({
                title: "Delete User",
                message: "Are you sure you want to delete this user?",
                handler: this.deleteUser,
                params: usersId
            });
        },
        deleteUser(usersId) {
            if (this.isCurrentUser(usersId)) {
                return;
            }

            axios({
                url: `/${this.endpoint}/${usersId}`,
                method: "DELETE"
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Deleted",
                    text: "The user has been deleted",
                    type: "success"
                });
                this.$refs.gwBrowse.refresh();
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
        editUser(usersId) {
            this.$router.push({
                name: "settingsCompaniesUsersFormEdit",
                params:{
                    id: usersId
                }
            });
        },
        sendInvite(usersId) {
            axios({
                url: `/${this.endpoint}/${usersId}/resend`,
                method: "POST"
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Invitation sent",
                    text: "The invite has been sent",
                    type: "success"
                });
            }).catch((error) => {
                this.$notify({
                    group: null,
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            })
        },

        copyInviteHash(inviteHash) {
            if (!navigator.clipboard) {
                const textArea = document.createElement("textarea")
                textArea.value = this.inviteLinkBase + inviteHash;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                textArea.remove();
            } else {
                navigator.clipboard.writeText(this.inviteLinkBase + inviteHash);
            }
            this.$notify({
                group: null,
                title: "",
                text: "copied to clipboard",
                type: "success"
            });
        },  

        isCurrentUser(usersId) {
            return usersId == this.userData.id;
        }
    }
};
</script>

<style lang="scss" scoped>
.nav-item {
    cursor: pointer;
}
</style>
