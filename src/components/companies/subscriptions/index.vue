<template>
    <container-template>
        <tabs-menu slot="tab-menu" />
        <div slot="tab-content" class="row subscription-manager">
            <div class="col-12 col-lg col-xl-4">
                <span class="title">Your plan subscription</span>
                <subscription-details />
            </div>
            <div class="col-12 col-lg">
                <span class="title">Billing</span>
                <credit-card />
            </div>
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
        creditCard: () => import(/* webpackChunkName: "credit-card"*/ "./credit-card"),
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
