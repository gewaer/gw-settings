<template>
    <div class="payment-method-modal">
        <div class="row modal-header">
            <div class="col d-flex align-items-center">
                <h5>Update Payment Method</h5>
                <a class="ml-auto" href="#" @click="$modal.hide('payment-method-modal')">x</a>
            </div>
        </div>
        <div class="row modal-body">
            <div class="col">
                <div class="row m-b-20">
                    <div class="col-12">
                        <form>
                            <card-networks :brand="cardBrand" class="mb-3" />
                            <div class="add-credit-card-form credit-card-inputs">
                                <div class="card-number">
                                    <div class="form-group">
                                        <label :class="{ 'text-danger': errors.first('cardNumber') }">
                                            <span>Card Number</span>
                                            <img v-tooltip="'Transactions are encrypted and secure.'" src="/img/padlock-icon.svg" alt="Padlock">
                                        </label>
                                        <card-number
                                            ref="cardNumber"
                                            :class="{ 'is-danger': errors.first('cardNumber') }"
                                            :stripe="stripeKey"
                                            :options="stripeOptions"
                                            class="card-number form-control"
                                            @change="handleChange('cardNumber', $event)"
                                        />
                                        <span v-show="errors.has('cardNumber')" class="text-danger mt-1">
                                            {{ errors.first('cardNumber') }}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="form-group">
                                        <label :class="{ 'text-danger': errors.first('cardExpiry') }" for="expiration">
                                            <span>Expiration</span>
                                        </label>
                                        <card-expiry
                                            ref="cardExpiry"
                                            :class="{ 'is-danger': errors.first('cardExpiry') }"
                                            :stripe="stripeKey"
                                            :options="stripeOptions"
                                            class="card-expiry form-control"
                                            @change="handleChange('cardExpiry', $event)"
                                        />
                                        <span v-show="errors.has('cardExpiry')" class="text-danger mt-1">
                                            {{ errors.first('cardExpiry') }}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="form-group">
                                        <label :class="{ 'text-danger': errors.first('cardCvc') }" for="cvc">
                                            <span class="mr-1">
                                                CVC
                                            </span>
                                            <img
                                                v-tooltip="'The security code, or CVV, refers to the extra 3 or 4 numbers on the back or front of your card.'"
                                                class="mr-auto"
                                                src="/img/help-icon.png"
                                                alt="Help"
                                            >
                                        </label>
                                        <card-cvc
                                            ref="cardCvc"
                                            :class="{ 'is-danger': errors.first('cardCvc') }"
                                            :stripe="stripeKey"
                                            :options="stripeOptions"
                                            class="card-cvc form-control"
                                            @change="handleChange('cardCvc', $event)"
                                        />
                                        <span v-show="errors.has('cardCvc')" class="text-danger mt-1">
                                            {{ errors.first('cardCvc') }}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="form-group">
                                        <label :class="{ 'text-danger': errors.first('postalCode') }" for="zip-code">
                                            <span>Zip Code</span>
                                        </label>
                                        <postal-code
                                            ref="postalCode"
                                            :class="{ 'is-danger': errors.first('postalCode') }"
                                            :stripe="stripeKey"
                                            :options="stripeOptions"
                                            class="card-postal-code form-control"
                                            @change="handleChange('postalCode', $event)"
                                        />
                                        <span v-show="errors.has('postalCode')" class="text-danger mt-1">
                                            {{ errors.first('postalCode') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span v-show="errors.has('stripe_errors')" class="text-danger">
                                {{ errors.first('stripe_errors') }}
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row modal-footer">
            <div class="col">
                <button
                    :disabled="!cardToken"
                    class="btn btn-block btn-primary"
                    @click="update()"
                >
                    Update
                </button>
            </div>
            <div class="col">
                <button class="btn btn-block btn-primary" @click="cancel()">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { CardNumber, CardExpiry, CardCvc, PostalCode, createToken } from "vue-stripe-elements-plus";
import CardNetworks from "./creditcard-networks";
import { VTooltip } from "v-tooltip";

export default {
    name: "PaymentMethodModal",
    directives: {
        tooltip: VTooltip
    },
    components: {
        CardCvc,
        CardExpiry,
        CardNetworks,
        CardNumber,
        PostalCode
    },
    props: {
        planData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            cardBrand: "unknown",
            cardToken: null,
            complete: false,
            isComplete: {
                cardExpiry: false,
                cardCvc: false,
                cardNumber: false,
                postalCode: false
            },
            stripeOptions: {
                style: {
                    base: {
                        fontFamily: "Open Sans, sans-serif"
                    },
                    invalid: {
                        color: "#d0021b"
                    }
                }
            }
        }
    },
    computed: {
        ...mapState({
            stripeKey: state => state.Application.env.VUE_APP_STRIPE_PUBLISHABLE_KEY
        })
    },
    watch: {
        isComplete: {
            handler() {
                this.reportValidFields();
            },
            deep: true
        }
    },
    methods: {
        cancel() {
            Object.keys(this.isComplete).forEach((key) => {
                this.$refs[key].clear();
            });
            this.$modal.hide("payment-method-modal");
        },
        handleChange(field, event) {
            if (event.error) {
                if (this.errors.has(event.elementType)) {
                    this.errors.clear(event.elementType);
                }

                this.errors.add({
                    id: event.error.code,
                    field: event.elementType,
                    msg: event.error.message
                });
            } else {
                this.errors.remove(event.elementType)
            }

            if (event.elementType == "cardNumber" && event.brand) {
                this.cardBrand = event.brand;
            }

            this.isComplete[field] = event.complete;
        },
        reportValidFields() {
            if (this.validateFields()) {
                this.errors.remove("stripe_errors");
                createToken().then(cardInfo => {
                    if (cardInfo.error) {
                        this.errors.add({
                            field: "stripe_errors",
                            msg: cardInfo.error.message
                        });
                        return;
                    }
                    this.cardToken = cardInfo.token.id;
                });
            }
        },
        update() {
            const appPlan = {
                ...this.planData,
                card_token: this.cardToken
            };

            axios({
                url: `/apps-plans/${this.planData.stripe_plan}/method`,
                method: "PUT",
                data: appPlan
            }).then(() => {
                this.$notify({
                    title: "Success",
                    text: "Payment Informatión updated successfully.",
                    type: "success"
                });
                this.cancel();
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },
        validateFields() {
            return Object.values(this.isComplete).every(value => value);
        }
    }
}
</script>

<style lang="scss">
.add-credit-card-form {
    display: flex;
    flex-wrap: wrap;

    > div {
        padding-left: 5px;
        padding-right: 5px;
        min-width: 80px;
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
        margin-bottom: 20px;
    }

    .card-number {
        flex-basis: 240px;
        min-width: 240px;
    }

    .form-group {
        .form-control {
            display: flex;
            align-items: center;

            .StripeElement  {
                width: 100%;
            }
            &.is-danger {
                border: 1px solid #d0021b;
            }
        }
    }
}
</style>
