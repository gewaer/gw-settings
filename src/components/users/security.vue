<template>
    <container-template>
        <div slot="tab-content">
            <h5>User Settings</h5>
            <tabs-menu slot="tab-menu" />
            <div class="card h-100 mb-0">
                <div class="row user-general-information">
                    <div class="col-12">
                        <div class="form-group required">
                            <label>Current password</label>
                            <input
                                v-model="currentPassword"
                                v-validate="'required'"
                                autocomplete="off"
                                class="form-control"
                                type="password"
                                data-vv-as="password"
                                data-vv-ignore-unsaved="true"
                                name="password"
                            >
                            <span class="text-danger">{{ errors.first("password") }}</span>
                        </div>
                        <div class="form-group required">
                            <label>New password</label>
                            <input
                                v-model="newPassword"
                                v-validate="'required'"
                                autocomplete="off"
                                class="form-control"
                                type="password"
                                data-vv-as="new password"
                                name="new-password"
                            >
                            <span class="text-danger">{{ errors.first("new-password") }}</span>
                        </div>
                        <div class="form-group required">
                            <label>Confirm new password</label>
                            <input
                                v-model="confirmNewPassword"
                                v-validate="'required'"
                                autocomplete="off"
                                class="form-control"
                                type="password"
                                data-vv-as="confirm new password"
                                name="confirm-new-password"
                            >
                            <span class="text-danger">{{ errors.first("confirm-new-password") }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <button :disabled="isLoading" class="btn btn-primary" @click="update()">
                    Change
                </button>
            </div>
        </div>
    </container-template>
</template>

<script>
import vueRouterMixins from "../../mixins/vueRouterMixins";
import ContainerTemplate from "../../container";
import TabsMenu from "./tabs";

export default {
    name: "Security",
    components: {
        ContainerTemplate,
        TabsMenu
    },
    mixins: [
        vueRouterMixins
    ],
    data() {
        return {
            confirmNewPassword: "",
            currentPassword: "",
            isLoading: false,
            newPassword: "",
            userData: null
        }
    },
    created() {
        this.userData = _.clone(this.$store.state.User.data);
    },
    methods: {
        update() {
            if (this.isLoading || this.errors.items.length) {
                return;
            }

            this.isLoading = true;

            axios({
                url: `/users/${this.userData.id}`,
                method: "PUT",
                data: {
                    "confirm_new_password": this.confirmNewPassword,
                    "current_password": this.currentPassword,
                    "new_password": this.newPassword
                }
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Confirmation",
                    text: "Your password has been changed!",
                    type: "success"
                });
            }).catch((error) => {
                this.$notify({
                    group: null,
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.isLoading = false;
            });
        }
    }
};
</script>

<style lang="scss">
.password-rules {
    display: flex;
    flex-direction: column;
    padding: 0 40px;
    opacity: .7;

    img {
        margin-bottom: 30px;
    }

    p {
        font-size: 16px;
        font-family: "Roboto", sans-serif;
        color: #A5A5A5;
    }
}
</style>
