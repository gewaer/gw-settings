<template>
    <div class="apps-settings">
        <custom-fields-tutorial-modal />
        <h4 class="section-title p-l-10">
            Settings
        </h4>
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
