<template>
    <div class="apps-settings">
        <h4 class="section-title p-l-10">
            Settings
        </h4>
        <slot name="tab-menu" />
        <slot name="tab-content" />
    </div>
</template>

<script>
export default {
    name: "SettingsContainer"
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
