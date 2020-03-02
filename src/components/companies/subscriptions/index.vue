<template>
    <container-template>
        <tabs-menu slot="tab-menu" />
        <div slot="tab-content" class="row subscription-manager">
            <div class="col-12 col-lg col-xl-4">
                <span class="title">Your plan subscription</span>
                <subscription-details />
            </div>
            <div class="col-12 col-lg" />
        </div>
    </container-template>
</template>

<script>
import ContainerTemplate from "../../../container";
import TabsMenu from "../tabs";

export default {
    name: "Subscriptions",
    components: {
        ContainerTemplate,
        subscriptionDetails: () => import(/* webpackChunkName: "subscription-details"*/ "./details"),
        TabsMenu
    }
}
</script>

<style lang="scss">
.subscription-manager {
    .title {
        margin-bottom: 20px;
        display: block;
    }
}
</style>
