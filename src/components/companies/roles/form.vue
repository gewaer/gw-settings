<template>
    <container-template>
        <div slot="tab-content">
            <h5>Company Settings</h5>
            <tabs-menu slot="tab-menu" />
            <div class="card">
                <div class="row">
                    <div class="col">
                        <h6 class="d-flex align-items-center justify-content-between">
                            Create a new Role
                            <button v-if="!isEditing" class="btn btn-primary" @click="cloneRole()">
                                Clone role
                            </button>
                        </h6>
                    </div>
                </div>
                <!-- Role Form-->
                <form class="row" role="form">
                    <div class="col">
                        <div class="form-group required">
                            <label>Name role</label>
                            <input
                                v-model="roleData.name"
                                v-validate="'required'"
                                name="name"
                                type="text"
                                class="form-control"
                                :disabled="isSystemRole"
                            >
                            <span class="text-danger">{{ errors.first("name") }}</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label>Description</label>
                            <input
                                v-model="roleData.description"
                                v-validate=""
                                type="text"
                                name="description"
                                class="form-control"
                                :disabled="isSystemRole"
                            >
                            <span class="text-danger">{{ errors.first("description") }}</span>
                        </div>
                    </div>
                </form>

                <!-- Role Select -->
                <div class="row mt-4">
                    <div
                        v-for="(group, groupName) in accessGroup"
                        :key="groupName"
                        :title="groupName"
                        class="mb-4 col-12 col-lg-6 col-xl-3"
                    >
                        <div class="card roles-container">
                            <h4 class="roles-title">
                                <div class="form-group form-check">
                                    <input
                                        :id="`group-${groupName}`"
                                        v-model="group.isGroupSelected"
                                        type="checkbox"
                                        class="form-check-input"
                                        :disabled="isSystemRole"
                                        @click="checkGroup(group, groupName)"
                                    >
                                    <label class="form-check-label" :for="`group-${groupName}`" />
                                </div>
                                <span @click="checkGroup(group, groupName)">
                                    {{ group.title }}
                                </span>
                            </h4>
                            <div class="row">
                                <div v-for="(access, accessName) in group.permissions" :key="`${groupName}-${accessName}`" class="col-6">
                                    <div class="form-group form-check">
                                        <input
                                            :id="`checkbox-${groupName}-${accessName}`"
                                            v-model="access.allowed"
                                            :name="`checkbox-${groupName}-${accessName}`"
                                            type="checkbox"
                                            class="form-check-input"
                                            :disabled="isSystemRole"
                                            @change="checkSelectedGroup(groupName, true)"
                                        >
                                        <label
                                            class="form-check-label"
                                            :for="`checkbox-${groupName}-${accessName}`"
                                        >
                                            {{ accessName | capitalize }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-xl d-flex justify-content-end mt-2">
                    <button class="btn btn-danger mr-2" @click="rolesList()">
                        Cancel
                    </button>
                    <button
                        v-if="!isSystemRole"
                        :disabled="!hasChanged"
                        class="btn btn-primary"
                        @click="verifyFields()"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </container-template>
</template>

<script>
import ContainerTemplate from "../../../container";
import TabsMenu from "../tabs";
import UnsavedChangesModal from "../../../components/modals/unsaved-changes";


import some from "lodash/some";
import pickBy from "lodash/pickBy";
import isEmpty from "lodash/isEmpty";
import uniq from "lodash/uniq";

export default {
    name: "Form",
    components: {
        ContainerTemplate,
        TabsMenu
    },
    data() {
        return {
            accessListData: [],
            accessGroup: {},
            groupHasChanged: [],
            roleData: {}
        }
    },
    computed: {
        isEditing() {
            return !this.roleData.id
        },
        hasChanged() {
            return some(this.vvFields, field => field.changed) || this.groupHasChanged.length;
        },
        isSystemRole() {
            return Number(this.roleData.apps_id) == 1;
        }
    },
    watch: {
        "$route.params.id"(roleId) {
            this.getRole(roleId)
        }
    },
    created() {
        this.getRole(this.$route.params.id);
    },
    beforeRouteLeave(to, from, next) {
        const formFields = pickBy(this.vvFields, field => field.changed);
        uniq(this.groupHasChanged).forEach(item => formFields[item] = item);

        if (!isEmpty(formFields)) {
            this.$modal.show(UnsavedChangesModal, {
                buttons: [{
                    title: "Discard",
                    handler: () => {
                        this.$modal.hide("unsaved-changes");
                        next();
                    }
                }, {
                    title: "Cancel",
                    class: "btn-primary",
                    handler: () => {
                        this.$modal.hide("unsaved-changes");
                        next(false);
                    }
                }],
                fields: formFields
            }, {
                adaptive: true,
                clickToClose: false,
                height: "auto",
                name: "unsaved-changes",
                scrollable: true
            });
        } else {
            next();
        }
    },
    methods: {
        checkGroup(group, groupName) {
            group.isGroupSelected = !group.isGroupSelected;

            for (const access in group.permissions) {
                group.permissions[access].allowed = group.isGroupSelected;
            }

            if (!this.groupHasChanged.includes(`${groupName} role section.`)) {
                this.groupHasChanged.push(`${groupName} role section.`);
            }
        },
        toggleCollapse(groupName) {
            document.querySelector(`#collapse-${groupName}`).classList.toggle("hide");
        },
        getRoleData(roleId) {
            return axios({
                url: `/roles/${roleId}`
            }).then(({ data }) => {
                return data;
            });
        },
        getRole(roleId) {
            let role = {};

            axios({
                url: `/roles-acceslist?q=(roles_id:${roleId})`
            }).then(async({ data }) => {
                if (!this.isEditing) {
                    data.forEach(access => {
                        access.allowed = "1";
                        access.role_name = "";
                    });
                    role = { name: "", description: "" }
                } else {
                    role = await this.getRoleData(roleId);
                }

                const accessesTemplate = await this.getAccess(role);
                let accessList = this.mergeAccesses(data, accessesTemplate);
                accessList = this.formatAccesses(accessList);
                this.formatRole(accessList, role);
            })
        },
        getAccess(role) {
            return axios({
                url: "/permissions-resources-access"
            }).then(({ data }) => {
                return this.formatAccesses(data, role);
            });
        },
        mergeAccesses(accessList, accessesTemplate) {
            accessesTemplate.forEach(access => {
                const localAccess = this.findLocalAccess(accessList, access);

                if (!localAccess) {
                    accessList.push(access);
                }
            });

            return accessList;
        },
        findLocalAccess(accessList, access) {
            return accessList.find((permission) => {
                return access.access_name == permission.access_name && access.resources_name == permission.resources_name;
            });
        },
        formatRole(accessList, role) {
            this.accessListData = _.sortBy(accessList, ["resources_name", "access_name"]);
            this.roleData = role;
            this.groupPermissions();
            this.checkSelectedGroups();
        },
        formatAccesses(accesList, role) {
            return accesList.map(access => {
                if (role) {
                    delete access.resources_id;
                    access.roles_id = role.roles_id;
                    access.allowed = true;
                    access.roles_name = role.name;
                }
                access.allowed = Boolean(Number(access.allowed))
                return access
            })
        },
        titleCase(text) {
            const splitText = text
                .split(/([A-Z]|-[a-zA-Z])/)
                .filter((part) => part)
                .map((part) => {
                    part = part.replace("-", "");
                    return part.length === 1 ? ` ${part.toUpperCase()}` : part;
                });

            return splitText.join("").trim();
        },
        groupPermissions() {
            const accessGroup = {};
            this.accessListData.forEach(access => {
                if (access.access_name != "*") {
                    if (!accessGroup[access.resources_name]) {
                        accessGroup[access.resources_name] = {
                            title: this.titleCase(access.resources_name),
                            permissions: { [access.access_name]: access }
                        };
                    } else {
                        accessGroup[access.resources_name]["permissions"][access.access_name] = access;
                    }
                }
            });

            this.accessGroup = accessGroup;
        },
        isGroupChecked(resourcesName) {
            const group = this.accessGroup[resourcesName].permissions;
            const allowedAccesses = Object.values(group);
            return allowedAccesses.every(access => access.allowed);
        },
        checkSelectedGroup(resourcesName, changed = false) {
            this.accessGroup[resourcesName]["isGroupSelected"] = this.isGroupChecked(resourcesName);
            if (changed) {
                this.groupHasChanged.push(`${resourcesName} role section.`)
            }
        },
        checkSelectedGroups() {
            for (const resourcesName in this.accessGroup) {
                this.checkSelectedGroup(resourcesName);
            }
        },
        verifyFields() {
            let dialogProps = {
                title: `Create ${this.roleData.name} Role!`,
                message: `Did you want to Create this Role?`
            };

            if (!this.isEditing) {
                dialogProps = {
                    title:`Edit ${this.roleData.name} Role!`,
                    message:`Did you want to Edit this Role?`
                };
            }

            if (this.errors.items.length) {
                this.$notify({
                    title: this.errors.items[0].msg,
                    text: `Please verify the ${this.errors.items[0].field}`,
                    type: "warn"
                });
            } else {
                this.validateFields(dialogProps);
            }
        },
        validateFields(modalProps) {
            this.$validator.validate().then(result => {
                if (result) {
                    this.$modal.show("basic-modal", {
                        ...modalProps,
                        buttons: [{
                            title: "Accept",
                            class: "btn-primary",
                            handler: () => {
                                this.$modal.hide("basic-modal");
                                this.save();
                            }
                        }, {
                            title: "Cancel",
                            class: "btn-danger",
                            handler: () => {
                                this.$modal.hide("basic-modal");
                            }
                        }]
                    });
                }
            });
        },
        save() {
            let url;
            let method;

            if (this.isEditing) {
                url = "/roles-acceslist/";
                method = "POST";
            } else {
                url = `/roles-acceslist/${this.roleData.id}`;
                method = "PUT";
            }

            const formData = {
                roles: this.roleData,
                access: this.getDisabledPermissions()
            }

            this.sendRequest(url, method, formData);
        },
        sendRequest(url, method, formData) {
            if (!this.isLoading) {
                this.isLoading = true;

                axios({
                    url,
                    method,
                    data: formData
                })
                    .then(this.onSuccess(method))
                    .catch(this.onError)
                    .finally(() => {
                        this.isLoading = false;
                    });
            }
        },
        async onSuccess(method) {
            const message = method == "POST" ? "created" : "updated";
            this.groupHasChanged = [];
            this.$notify({
                group: null,
                title: "Confirmation",
                text: `The role has been ${message}!`,
                type: "success"
            });

            await this.$validator.reset();
            this.rolesList();
        },
        onError(error) {
            this.$notify({
                group: null,
                title: "Error",
                text: error.response.data.errors.message,
                type: "error"
            });
        },
        getDisabledPermissions() {
            return this.accessListData.map(this.formatAllowedProperty).filter(access => access);
        },
        formatAllowedProperty(access) {
            if (!access.allowed) {
                const accessLocal = _.clone(access);
                accessLocal.roles_name = this.roleData.name;
                accessLocal.allowed = Number(accessLocal.allowed);
                return accessLocal;
            }
        },
        rolesList() {
            this.$router.push({ name: "settingsCompaniesRolesList" });
        },
        cloneRole() {
            axios({
                url:`/roles-acceslist/${this.roleData.id}/copy`,
                method: "POST"
            }).then(({ data }) => {
                this.$router.push({
                    name: "settingsCompaniesRolesFormEdit",
                    params: {
                        id: data.id
                    }
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.checkbox,
.radio {
    margin-top: 0;

    label {
        margin-right: 0;
        padding-left: 0;
    }

    input {
        display: none;
    }
}

.access-group__title {
    align-items: center;
    display: flex !important;

    .checkbox {
        margin-bottom: 0;
    }

    label {
        margin-right: 5px;
        padding-left: 0;
    }

    a {
        padding-bottom: 0;
        padding-top: 0;

        &::after {
            content: "" !important;
        }

        i {
            font-family: "FontAwesome";
            content: "\f056";
            position: absolute;
            right: 19px;
            top: 24px;
            color: #626262;
        }
    }
}

.card-body {
    label {
        cursor: pointer;
    }
}

.roles-container {
    height: 100%;

    .roles-title {
        display: flex;
        font-size: 16px;
        color: #383652;
        margin-bottom: 20px;

        .form-check {
            margin-bottom: 0;

            .form-check-input {
                margin-top: 2px;
            }
        }

        span {
            cursor: pointer;
        }
    }
}
</style>
