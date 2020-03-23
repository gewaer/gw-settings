
import UsersProfile from "./components/users/profile";
import UsersNotifications from "./components/users/notifications";
import UsersSecurity from "./components/users/security";
import UsersDevices from "./components/users/devices";
import AppsCustomFieldsList from "./components/apps/custom-fields/list";
import AppsCustomFieldsForm from "./components/apps/custom-fields/form";
// import AppsEmailTemplatesList from "./components/apps/email-templates/list";
// import AppsEmailTemplatesForm from "./components/apps/email-templates/form";
// import AppsWebhooksList from "./components/apps/webhooks/list";
// import AppsWebhooksForm from "./components/apps/webhooks/form";
// import AppsImportList from "./components/apps/import/";
// import AppsThemes from "./components/apps/themes";
import CompaniesProfile from "./components/companies/profile";
import CompaniesBranchesList from "./components/companies/branches/list";
import CompaniesBranchesForm from "./components/companies/branches/form";
import CompaniesUsersList from "./components/companies/users/list";
import CompaniesUsersForm from "./components/companies/users/form";
import CompaniesRolesList from "./components/companies/roles/list";
import CompaniesRolesForm from "./components/companies/roles/form";
import CompaniesSubscriptions from "./components/companies/subscriptions";
import ManagerList from "./components/manager/list";
import ManagerForm from "./components/manager/form";

export default [
    // ===== Settings Users Routes =====
    {
        path: "/settings/users",
        name: "settingsUsers",
        redirect: {
            name: "settingsUsersProfile"
        }
    },
    {
        path: "/settings/users/profile",
        name: "settingsUsersProfile",
        component: UsersProfile
    },
    {
        path: "/settings/users/notifications",
        name: "settingsUsersNotifications",
        component: UsersNotifications
    },
    // {
    //     path: "/settings/users/social",
    //     name: "settingsUsersSocial",
    //     component: () => import(/* webpackChunkName: "settings-users-social" */ "./components/users/social"),
    //     meta: {
    //         requiresAuth: true,
    //     }
    // },
    {
        path: "/settings/users/security",
        name: "settingsUsersSecurity",
        component: UsersSecurity
    },
    {
        path: "/settings/users/devices",
        name: "settingsUsersDevices",
        component: UsersDevices
    },
    // ===== Settings Apps Routes =====
    {
        path: "/settings/apps",
        name: "settingsApps",
        redirect: {
            name: "settingsAppsCustomFieldsList"
        }
    },
    {
        path: "/settings/apps/custom-fields",
        name: "settingsAppsCustomFieldsList",
        component: AppsCustomFieldsList,
        meta: {
            group: "settingsAppsCustomFields"
        }
    },
    {
        path: "/settings/apps/custom-fields/:moduleId",
        name: "settingsAppsCustomFieldsForm",
        component: AppsCustomFieldsForm,
        meta: {
            group: "settingsAppsCustomFields"
        }
    },
    // {
    //     path: "/settings/apps/email-templates",
    //     name: "settingsAppsEmailTemplatesList",
    //     component: AppsEmailTemplatesList,
    //     meta: {
    //         group: "settingsAppsEmailTemplates"
    //     }
    // },
    // {
    //     path: "/settings/apps/email-templates/add",
    //     name: "settingsAppsEmailTemplatesForm",
    //     component: AppsEmailTemplatesForm,
    //     meta: {
    //         group: "settingsAppsEmailTemplates"
    //     }
    // },
    // {
    //     path: "/settings/apps/email-templates/edit/:id",
    //     name: "settingsAppsEmailTemplatesFormEdit",
    //     component: AppsEmailTemplatesForm,
    //     meta: {
    //         group: "settingsAppsEmailTemplates"
    //     }
    // },
    // {
    //     path: "/settings/apps/webhooks",
    //     name: "settingsAppsWebhooksList",
    //     component: AppsWebhooksList,
    //     meta: {
    //         group: "settingsAppsWebhooks"
    //     }
    // },
    // {
    //     path: "/settings/apps/webhooks/add",
    //     name: "settingsAppsWebhooksForm",
    //     component: AppsWebhooksForm,
    //     meta: {
    //         group: "settingsAppsWebhooks"
    //     }
    // },
    // {
    //     path: "/settings/apps/webhooks/edit/:id",
    //     name: "settingsAppsWebhooksFormEdit",
    //     component: AppsWebhooksForm,
    //     meta: {
    //         group: "settingsAppsWebhooks"
    //     }
    // },
    // {
    //     path: "/settings/apps/import",
    //     name: "settingsAppsImportList",
    //     component: AppsImportList,
    //     meta: {
    //         group: "settingsAppsImport"
    //     }
    // },
    // {
    //     path: "/settings/apps/themes",
    //     name: "settingsAppsThemesList",
    //     component: AppsThemes,
    //     meta: {
    //         group: "settingsAppsThemes"
    //     }
    // },
    // ===== Settings Companies Routes =====
    {
        path: "/settings/companies",
        name: "settingsCompanies",
        redirect: {
            name: "settingsCompaniesProfile"
        }
    },
    {
        path: "/settings/companies/profile",
        name: "settingsCompaniesProfile",
        component: CompaniesProfile,
        meta: {
            group: "settingsCompaniesProfile",
            acl: {
                resource: "settingsmenu",
                action: "company-settings"
            }
        }
    },
    {
        path: "/settings/companies/branches/list",
        name: "settingsCompaniesBranchesList",
        component: CompaniesBranchesList,
        meta: {
            group: "settingsCompaniesBranches",
            acl: {
                resource: "companybranches",
                action: "list"
            }
        }
    },
    {
        path: "/settings/companies/branches/add",
        name: "settingsCompaniesBranchesForm",
        component: CompaniesBranchesForm,
        meta: {
            group: "settingsCompaniesBranches"
        }
    },
    {
        path: "/settings/companies/branches/edit/:id",
        name: "settingsCompaniesBranchesFormEdit",
        component: CompaniesBranchesForm,
        meta: {
            group: "settingsCompaniesBranches"
        }
    },
    {
        path: "/settings/companies/users/list",
        name: "settingsCompaniesUsersList",
        component: CompaniesUsersList,
        meta: {
            group: "settingsCompaniesUsers",
            acl: {
                resource: "companyusers",
                action: "list"
            }
        }
    },
    {
        path: "/settings/companies/users/add",
        name: "settingsCompaniesUsersForm",
        component: CompaniesUsersForm,
        meta: {
            group: "settingsCompaniesUsers"
        }
    },
    {
        path: "/settings/companies/users/edit/:id",
        name: "settingsCompaniesUsersFormEdit",
        component: CompaniesUsersForm,
        meta: {
            group: "settingsCompaniesUsers"
        }
    },
    {
        path: "/settings/companies/roles",
        name: "settingsCompaniesRoles",
        redirect: {
            name: "settingsCompaniesRolesList"
        }
    },
    {
        path: "/settings/companies/roles/list",
        name: "settingsCompaniesRolesList",
        component: CompaniesRolesList,
        meta: {
            group: "settingsCompaniesRoles",
            acl: {
                resource: "companyroles",
                action: "list"
            }
        }
    },
    {
        path: "/settings/companies/roles/add",
        name: "settingsCompaniesRolesForm",
        component: CompaniesRolesForm,
        meta: {
            group: "settingsCompaniesRoles"
        }
    },
    {
        path: "/settings/companies/roles/edit/:id",
        name: "settingsCompaniesRolesFormEdit",
        component: CompaniesRolesForm,
        meta: {
            group: "settingsCompaniesRoles"
        }
    },
    {
        path: "/settings/companies/subscriptions",
        name: "settingsCompaniesSubscriptions",
        component: CompaniesSubscriptions,
        meta: {
            group: "settingsCompaniesSubscriptions",
            acl: {
                resource: "companysubscriptions",
                action: "create"
            }
        }
    },
    // ===== Settings Companies Manager Routes =====
    {
        path: "/settings/manager/list",
        name: "settingsManagerList",
        component: ManagerList,
        meta: {
            group: "settingsManager",
            acl: {
                resource: "companiesmanager",
                action: "list"
            }
        }
    },
    {
        path: "/settings/manager/add",
        name: "settingsManagerForm",
        component: ManagerForm,
        meta: {
            group: "settingsManager"
        }
    },
    {
        path: "/settings/manager/edit/:id",
        name: "settingsManagerFormEdit",
        component: ManagerForm,
        meta: {
            group: "settingsManager"
        }
    }
]
