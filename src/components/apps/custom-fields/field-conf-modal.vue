<template>
  <modal
        :adaptive="true"
        :scrollable="true"
        name="custom-fields-conf-modal"
        height="auto"
        width="900"
        class="custom-fields-conf-modal"
    >
        <h4>Customize the Text Field</h4>
        <form @submit.prevent="onSubmit" novalidate>
            <div class="form-group form-group-default required">
                <label>Name</label>
                <input
                    class="form-control"
                    type="text"
                    name="name"
                >
            </div>
            <div class="form-group form-group-default required">
                <label>Max Length</label>
                <input
                    class="form-control"
                    type="text"
                    name="name"
                >
            </div>
            <div class="d-flex justify-content-end mt-4">
                <button @click="$modal.hide('custom-fields-conf-modal')" type="button" class="btn btn-danger mr-2">Cancel</button>
                <button class="btn btn-primary">Save</button>
            </div>
        </form>
    </modal>
</template>

<script>
export default {
    name: "CustomFieldConfModal",
    methods: {
        onSubmit() {
            console.log("Submitted!")
        }
    }
}
</script>

<style lang="scss">
.custom-fields-conf-modal {
    .v--modal {
        padding: 35px;

        h4 {
            font-family: 'Lato', sans-serif;
            /* font-size: 18px; */
            margin-bottom: 25px;
        }
    }
}
</style>
