<template>
    <div class="row subscription-manager">
        <div class="col-12 col-lg col-xl-4">
            <span class="title">Your plan subscription</span>
            <subscription-details />
        </div>
        <div class="col-12 col-lg">
            <span class="title">Billing</span>
            <credit-card />
        </div>
    </div>
</template>

<script>
export default {
    name: "Subscription",
    components: {
        subscriptionDetails: () => import(/* webpackChunkName: "subscription-details"*/ "./details"),
        creditCard: () => import(/* webpackChunkName: "credit-card"*/ "./credit-card")
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
