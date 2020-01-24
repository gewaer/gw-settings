<template>
    <div class="credit-card">
        <div class="row">
            <div class="col-auto">
                <div class="current-credit-card">
                    <h3>Current card</h3>
                    <div class="current-number">
                        •••• •••• •••• 9000
                    </div>
                    <img src="/img/creditcards/visa.svg" width="50">
                </div>
            </div>
            <div class="col-12 col-xl">
                <div class="card">
                    <form>
                        <div class="row">
                            <div class="col">
                                <div class="form-group required">
                                    <label>Card number</label>
                                    <input
                                        v-validate="'required'"
                                        name="name"
                                        type="text"
                                        class="form-control"
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-group required">
                                    <label>Expiration date</label>
                                    <input
                                        v-validate="'required'"
                                        data-vv-as="company address"
                                        name="company-address"
                                        type="text"
                                        class="form-control"
                                    >
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group required">
                                    <label>Security code</label>
                                    <input
                                        v-validate="'required'"
                                        data-vv-as="company address"
                                        name="company-address"
                                        type="text"
                                        class="form-control"
                                    >
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreditCard"
}
</script>

<style lang="scss">
.credit-card {
    .card {
        padding: 15px 30px;
    }

    .current-credit-card {
        width: 350px;
        min-height: 160px;
        height: calc(100% - 20px);
        background-color: #0A55A4;
        border-radius: 6px;
        padding: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        margin-bottom: 25px;

        h3 {
            font-size: 16px;
            color: white;
        }

        .current-number {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 34px;
            width: fit-content;
        }

        img {
            margin-top: auto;
        }
    }
}
</style>
