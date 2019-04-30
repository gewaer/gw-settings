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
        component: () => import(/* webpackChunkName: "users-profile" */ "./components/users/profile")
    },
    {
        path: "/settings/users/notifications",
        name: "settingsUsersNotifications",
        component: () => import(/* webpackChunkName: "settings-users-notifications" */ "./components/users/notifications")
    },
    // {
    //     path: "/settings/users/social",
    //     name: "settingsUsersSocial",
    //     component: () => import(/* webpackChunkName: "settings-users-social" */ "./components/users/social"),
    //     meta: {
    //         requiresAuth: true
    //     }
    // },
    {
        path: "/settings/users/security",
        name: "settingsUsersSecurity",
        component: () => import(/* webpackChunkName: "settings-users-security" */ "./components/users/security")
    },
    {
        path: "/settings/users/devices",
        name: "settingsUsersDevices",
        component: () => import(/* webpackChunkName: "settings-users-devices" */ "./components/users/devices")
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
        component: () => import(/* webpackChunkName: "settings-apps-customFields-list" */ "./components/apps/custom-fields/list"),
        meta: {
            group: "settingsAppsCustomFields"
        }
    },
    {
        path: "/settings/apps/custom-fields/add",
        name: "settingsAppsCustomFieldsForm",
        component: () => import(/* webpackChunkName: "settings-apps-customFields-form" */ "./components/apps/custom-fields/form"),
        meta: {
            group: "settingsAppsCustomFields"
        }
    },
    {
        path: "/settings/apps/custom-fields/edit/:id",
        name: "settingsAppsCustomFieldsFormEdit",
        component: () => import(/* webpackChunkName: "settings-apps-customFields-form" */ "./components/apps/custom-fields/form"),
        meta: {
            group: "settingsAppsCustomFields"
        }
    },
    {
        path: "/settings/apps/email-templates",
        name: "settingsAppsEmailTemplatesList",
        component: () => import(/* webpackChunkName: "settings-apps-emailTemplates-list" */ "./components/apps/email-templates/list"),
        meta: {
            group: "settingsAppsEmailTemplates"
        }
    },
    {
        path: "/settings/apps/email-templates/add",
        name: "settingsAppsEmailTemplatesForm",
        component: () => import(/* webpackChunkName: "settings-apps-emailTemplates-form" */ "./components/apps/email-templates/form"),
        meta: {
            group: "settingsAppsEmailTemplates"
        }
    },
    {
        path: "/settings/apps/email-templates/edit/:id",
        name: "settingsAppsEmailTemplatesFormEdit",
        component: () => import(/* webpackChunkName: "settings-apps-emailTemplates-form" */ "./components/apps/email-templates/form"),
        meta: {
            group: "settingsAppsEmailTemplates"
        }
    },
    {
        path: "/settings/apps/webhooks",
        name: "settingsAppsWebhooksList",
        component: () => import(/* webpackChunkName: "settings-apps-webhooks-list" */ "./components/apps/webhooks/list"),
        meta: {
            group: "settingsAppsWebhooks"
        }
    },
    {
        path: "/settings/apps/webhooks/add",
        name: "settingsAppsWebhooksForm",
        component: () => import(/* webpackChunkName: "settings-apps-webhooks-form" */ "./components/apps/webhooks/form"),
        meta: {
            group: "settingsAppsWebhooks"
        }
    },
    {
        path: "/settings/apps/webhooks/edit/:id",
        name: "settingsAppsWebhooksFormEdit",
        component: () => import(/* webpackChunkName: "settings-apps-webhooks-form" */ "./components/apps/webhooks/form"),
        meta: {
            group: "settingsAppsWebhooks"
        }
    },
    {
        path: "/settings/apps/import",
        name: "settingsAppsImportList",
        component: () => import(/* webpackChunkName: "settings-apps-customFields-list" */ "./components/apps/import/"),
        meta: {
            group: "settingsAppsImport"
        }
    },
    {
        path: "/settings/apps/themes",
        name: "settingsAppsThemesList",
        component: () => import(/* webpackChunkName: "settings-apps-customFields-list" */ "./components/apps/themes"),
        meta: {
            group: "settingsAppsThemes"
        }
    },
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
        component: () => import(/* webpackChunkName: "settings-companies-profile" */ "./components/companies/profile"),
        meta: {
            group: "settingsCompaniesProfile"
        }
    },
    {
        path: "/settings/companies/branches/list",
        name: "settingsCompaniesBranchesList",
        component: () => import(/* webpackChunkName: "settings-companies-branches-list" */ "./components/companies/branches/list"),
        meta: {
            group: "settingsCompaniesBranches"
        }
    },
    {
        path: "/settings/companies/branches/add",
        name: "settingsCompaniesBranchesForm",
        component: () => import(/* webpackChunkName: "settings-companies-branches-form" */ "./components/companies/branches/form"),
        meta: {
            group: "settingsCompaniesBranches"
        }
    },
    {
        path: "/settings/companies/branches/edit/:id",
        name: "settingsCompaniesBranchesFormEdit",
        component: () => import(/* webpackChunkName: "settings-companies-branches-form" */ "./components/companies/branches/form"),
        meta: {
            group: "settingsCompaniesBranches"
        }
    },
    {
        path: "/settings/companies/users/list",
        name: "settingsCompaniesUsersList",
        component: () => import(/* webpackChunkName: "settings-companies-users-list" */ "./components/companies/users/list"),
        meta: {
            group: "settingsCompaniesUsers"
        }
    },
    {
        path: "/settings/companies/users/add",
        name: "settingsCompaniesUsersForm",
        component: () => import(/* webpackChunkName: "settings-companies-users-form" */ "./components/companies/users/form"),
        meta: {
            group: "settingsCompaniesUsers"
        }
    },
    {
        path: "/settings/companies/users/edit/:id",
        name: "settingsCompaniesUsersFormEdit",
        component: () => import(/* webpackChunkName: "settings-companies-users-form" */ "./components/companies/users/form"),
        meta: {
            group: "settingsCompaniesUsers"
        }
    },
    // TODO: This is temp, remove later
    {
        path: "/settings/companies/roles",
        name: "settingsCompaniesRoles",
        component: () => import(/* webpackChunkName: "settings-companies-roles-list" */ "./components/companies/roles/list"),
        meta: {
            group: "settingsCompaniesRoles"
        }
    },
    {
        path: "/settings/companies/roles/list",
        name: "settingsCompaniesRolesList",
        component: () => import(/* webpackChunkName: "settings-companies-roles-list" */ "./components/companies/roles/list"),
        meta: {
            group: "settingsCompaniesRoles"
        }
    },
    {
        path: "/settings/companies/roles/add",
        name: "settingsCompaniesRolesForm",
        component: () => import(/* webpackChunkName: "settings-companies-roles-form" */ "./components/companies/roles/form"),
        meta: {
            group: "settingsCompaniesRoles"
        }
    },
    {
        path: "/settings/companies/roles/edit/:id",
        name: "settingsCompaniesRolesFormEdit",
        component: () => import(/* webpackChunkName: "settings-companies-roles-form" */ "./components/companies/roles/form"),
        meta: {
            group: "settingsCompaniesRoles"
        }
    },
    {
        path: "/settings/companies/subscriptions",
        name: "settingsCompaniesSubscriptions",
        component: () => import(/* webpackChunkName: "settings-companies-subscriptions" */ "./components/companies/subscriptions"),
        meta: {
            group: "settingsCompaniesSubscriptions"
        }
    },
    // ===== Settings Companies Manager Routes =====
    {
        path: "/settings/manager/list",
        name: "settingsManagerList",
        component: () => import(/* webpackChunkName: "settings-manager-list" */ "./components/manager/list"),
        meta: {
            group: "settingsManager"
        }
    },
    {
        path: "/settings/manager/add",
        name: "settingsManagerForm",
        component: () => import(/* webpackChunkName: "settings-companies-roles-form" */ "./components/manager/form"),
        meta: {
            group: "settingsManager"
        }
    },
    {
        path: "/settings/manager/edit/:id",
        name: "settingsManagerFormEdit",
        component: () => import(/* webpackChunkName: "settings-companies-roles-form" */ "./components/manager/form"),
        meta: {
            group: "settingsManager"
        }
    }
]
