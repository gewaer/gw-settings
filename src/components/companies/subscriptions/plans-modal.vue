<template>
    <div class="plans-modal">
            <form @submit.prevent="update()">
            <a class="close-modal" href="#" @click="$modal.hide('plans-modal')">
                <i class="fa fa-times" aria-hidden="true"/>
            </a>
            <div class="modal-header">
                <h2>Select a new plan</h2>
                <p>Please select one of the plans bellow</p>
            </div>
            <div class="modal-body">
                <div class="payment-frecuency">
                    <span :class="{ 'deactivated' : payYearly }">Monthly</span><p-check off-color="danger" class="p-switch p-fill payment-frecuency-switch" v-model="payYearly" /><span :class="{ 'deactivated' : !payYearly }">Yearly</span>
                </div>
                <div class="plans">
                    <div
                        v-for="plan in plans"
                        :key="plan.stripe_plan"
                        :class="{ selected: selectedPlan == plan.stripe_plan }"
                        class="plan"
                    >
                        <input type="radio" name="plans" :id="plan.name + plan.id" :value="plan.stripe_plan" v-model="selectedPlan">
                        <label :for="plan.name + plan.id">
                            <div class="radio-circle" />
                            <div class="plan-details">
                                <div class="plan-name">
                                    <h5>{{ plan.name }}</h5>
                                    <div v-if="payYearly" class="monthly-reference-price">Monthly reference price {{ plan.pricing }}</div>
                                </div>
                                <div class="plan-price">
                                    <h3>{{ payYearly ? plan.pricing_anual : plan.pricing }}</h3>
                                </div>
                            </div>
                            <div class="plan-labels">
                                <span v-if="selectedPlan == plan.stripe_plan" class="current-plan">Current Plan</span>
                                <span v-if="true" class="recommended-plan">Recommended</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger mr-2" @click="$modal.hide('plans-modal')">
                    Cancel
                </button>
                <button class="btn btn-primary" :disabled="!planChanged">
                    Save
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import 'pretty-checkbox/src/pretty-checkbox.scss';
import PrettyCheck from 'pretty-checkbox-vue/check';

export default {
    name: "PlansModal",
    components: {
        'p-check': PrettyCheck
    },
    props: {
        planData: {
            type: Object,
            required: true
        },
        plans: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            payYearly: false,
            selectedPlan: {}
        }
    },
    computed: {
        ...mapGetters({
            isActive: "Subscription/isActive",
            isCancelled: "Subscription/isCancelled",
            isPaid: "Subscription/isPaid"
        }),
        planChanged() {
            return this.selectedPlan != this.planData.stripe_plan;
        }
    },
    created() {
        this.selectedPlan = this.planData.stripe_plan;
    },
    methods: {
        update() {
            const appPlan = {
                payment_style: this.selectedFrequency.frequency,
                stripe_plan: this.selectedPlan,
                stripe_id: this.planData.stripe_id
            };

            axios({
                url: `/apps-plans/${appPlan.stripe_plan}/method`,
                method: "PUT",
                data: appPlan
            }).then(() => {
                this.$notify({
                    title: "Success",
                    text: "Payment Informatión updated successfully.",
                    type: "success"
                });
                this.$modal.hide("plans-modal");
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        }
    }
}
</script>

<style lang="scss">
.plans-modal {
    padding: 40px 0;
    position: relative;

    .close-modal {
        position: absolute;
        right: 25px;
        top: 20px;
        color: #A5A5A5;
    }

    .modal-header {
        display: flex;
        flex-direction: column;
        padding: 0 40px;
        border-bottom: 0;

        h2 {
            font-size: 36px;
            margin-bottom: 5px;
        }
    }

    .modal-body {
        padding: 0;

        .payment-frecuency {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 20px;
            padding: 0 40px;

            span:first-child {
                margin-right: 10px;
            }

            span:last-child {
                margin-left: 10px;
            }

            .payment-frecuency-switch {
                width: 34px;
                margin-right: 0;

                .state:before {
                    top: calc((0% - (100% - 1em)) - 15%);
                }

                input:checked ~ .state:before {
                    background-color: transparent !important;
                    border-color: #bdc3c7 !important;
                }

                .state label:after, input:checked ~ .state label:after {
                    background-color: black !important;
                }
            }
        }

        .plans {
            margin-bottom: 40px;

            .plan {
                padding: 22px 40px;
                position: relative;
                cursor: pointer;

                input[type="radio"] {
                    display: none;
                }

                label {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0;
                    cursor: pointer;

                    .radio-circle {
                        width: 25px;
                        height: 25px;
                        background-color: white;
                        border: 2px solid #BEC8D1;
                        border-radius: 100%;
                        margin-right: 25px;
                    }
                }

                .plan-details {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;

                    .plan-name, .plan-price {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;

                        h3, h5 {
                            margin-bottom: 0;
                            text-transform: capitalize;
                        }

                        h5 {
                            font-size: 20px;
                        }

                        h3 {
                            font-size: 27px;
                        }
                    }


                    .monthly-reference-price {
                        font-size: 14px;
                        color: #A5A5A5;
                    }
                }

                .plan-labels {
                    width: 130px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;

                    .current-plan {
                        font-size: 11px;
                        text-transform: uppercase;
                        color: #A5A5A5;
                        font-weight: 600;
                    }

                    .recommended-plan {
                        font-size: 10px;
                        text-transform: uppercase;
                        background-color: #F0C922;
                        padding: 5px 15px;
                        color: white;
                        border-radius: 3px;
                    }
                }

                &.selected {
                    background-color: #F7F7F7;

                    label {
                        .radio-circle {
                            background-color: var(--secondary-color);
                            border: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            &:after {
                                content: "";
                                width: 11px;
                                height: 11px;
                                background-color: white;
                                border-radius: 100%;
                            }
                        }
                    }
                }
            }
        }
    }

    .modal-footer {
        padding: 0 40px;
        border-top: 0;
    }
}
</style>
