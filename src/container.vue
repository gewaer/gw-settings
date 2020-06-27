<template>
    <div class="apps-settings">
        <custom-fields-tutorial-modal />
        <slot name="tab-menu" />
        <slot name="tab-content" />
    </div>
</template>

<script>
import CustomFieldsTutorialModal from "./components/modals/custom-fields-tutorial-modal";

export default {
    name: "SettingsContainer",
    components: {
        CustomFieldsTutorialModal
    }
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

<style lang="scss">
.apps-settings {
    .card {
        padding: 40px !important;
    }

    h5 {
        color: #383752 !important;
        border-bottom: 0 !important;
        font-size: 28px !important;
    }

    .section-title {
        color: #9594AF;
        font-weight: 400;
    }
}
</style>
