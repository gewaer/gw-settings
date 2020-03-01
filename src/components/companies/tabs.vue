<template>
    <ul class="nav nav-tabs nav-horizontal">
        <li v-if="1 || $can('read', 'companyprofile')" class="nav-item">
            <router-link
                :to="{ name: 'settingsCompaniesProfile' }"
                :class="{ active: $route.meta.group == 'settingsCompaniesProfile' }"
            >
                Profile
            </router-link>
        </li>
        <li v-if="1 || $can('list', 'companybranches')" class="nav-item">
            <router-link
                :to="{ name: 'settingsCompaniesBranchesList' }"
                :class="{ active: $route.meta.group == 'settingsCompaniesBranches' }"
            >
                Branches
            </router-link>
        </li>
        <li v-if="1 || $can('list', 'companyusers')" class="nav-item">
            <router-link
                :to="{ name: 'settingsCompaniesUsersList' }"
                :class="{ active: $route.meta.group == 'settingsCompaniesUsers' }"
            >
                Users
            </router-link>
        </li>
        <li v-if="1 || $can('list', 'companyroles')" class="nav-item">
            <router-link
                :to="{ name: 'settingsCompaniesRoles' }"
                :class="{ active: $route.meta.group == 'settingsCompaniesRoles' }"
            >
                Roles
            </router-link>
        </li>
        <li v-if="1 || $can('create', 'companysubscriptions')" class="nav-item">
            <router-link
                :to="{ name: 'settingsCompaniesSubscriptions' }"
                :class="{ active: $route.meta.group == 'settingsCompaniesSubscriptions' }"
            >
                Subscriptions
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "TabsMenu"
};
</script>

<style lang="scss" scoped>
.apps-settings {
    .card.flex-md-row {
        min-height: 400px;
    }
}
</style>
