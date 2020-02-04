<template>
    <div class="apps-settings">
        <custom-fields-tutorial-modal />
        <h4 class="section-title p-l-10">
            Settings
        </h4>
        <div class="card flex-md-row p-0">
            <slot name="tab-menu" />
            <div class="tab-content bg-white">
                <div class="tab-pane active">
                    <slot name="tab-content" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingsContainer",
    components: {
        customFieldsTutorialModal: () => import(/* webpackChunkName: "custom-fields-tutorial-modal" */ "./components/modals/custom-fields-tutorial-modal"),
    },
    // mounted() {
    //     setTimeout(() => {
    //         this.$modal.show("custom-fields-tutorial-modal");
    //     }, 1000);
    // }
};
</script>

<style lang="scss" scoped>
.apps-settings {
    .card.flex-md-row {
        min-height: 400px;
    }

    /deep/ .disable-element {
        pointer-events: none;
    }
}
</style>
