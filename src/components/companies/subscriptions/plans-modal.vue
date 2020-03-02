<template>
    <div class="plans-modal">
        <div class="row modal-header">
            <div class="col d-flex align-items-center">
                <h5>Update Plan</h5>
                <a class="ml-auto" href="#" @click="$modal.hide('plans-modal')">x</a>
            </div>
        </div>
        <div class="row modal-body">
            <div class="col">
                <div class="row m-b-20">
                    <div
                        v-for="frequency in billingFrequencies"
                        :key="frequency.type"
                        class="col"
                    >
                        <input
                            :id="frequency.type"
                            :value="frequency.type"
                            :checked="selectedFrequency.frequency == frequency.frequency"
                            type="radio"
                            name="payment-frequency"
                            @change="selectedFrequency = frequency"
                        >
                        <label :for="frequency.type">
                            Pay {{ frequency.title }}
                            <small>${{ frequency.price }} per seat per {{ frequency.frequency }}</small>
                        </label>
                    </div>
                </div>
                <div class="row m-b-20">
                    <div
                        v-for="plan in plans"
                        :key="plan.stripe_plan"
                        :class="{ selected: selectedPlan == plan.stripe_plan }"
                        class="col"
                        @click="selectedPlan = plan.stripe_plan"
                    >
                        <h3>{{ plan.name }}</h3>
                        <div>
                            <span class="price">
                                <span class="sign">$</span>
                                <span class="currency">{{ plan[selectedFrequency.type] }} </span>
                                <span class="month">/{{ selectedFrequency.frequency }}</span>
                            </span>
                        </div>
                        <div>
                            <ul v-if="plan.settings.length">
                                <li
                                    v-for="planSetting in plan.settings"
                                    :key="planSetting.key"
                                >
                                    <span> {{ planSetting.value }}</span>
                                    {{ planSetting.key | formatSetting }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row modal-footer">
            <div class="col">
                <button
                    :disabled="!planChanged"
                    class="btn btn-block btn-primary"
                    @click="update()"
                >
                    Update
                </button>
            </div>
            <div class="col">
                <button class="btn btn-block btn-primary" @click="$modal.hide('plans-modal')">
                    Cancel
                </button>
            </div>
        </div>
        <div class="row modal-footer">
            <div class="col">
                <h4 style="color:red;">
                    Danger Zone
                </h4>
                <button class="btn btn-block btn-danger" @click="cancelSubscription()">
                    Cancel Subscription
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "PlansModal",
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
            billingFrequencies: {
                pricingMonthly: {
                    type:"pricing",
                    title: "Monthly",
                    price: "10",
                    frequency: "monthly"
                },
                pricingAnual: {
                    type:"pricing_anual",
                    title: "Annually",
                    price: "100",
                    frequency: "yearly"
                }
            },
            selectedFrequency: {
                type: "pricing",
                title: "Monthly",
                price: "10",
                frequency: "monthly"
            },
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
            return this.selectedPlan != this.planData.stripe_plan
                || this.selectedFrequency.frequency != this.planData.payment_style;
        }
    },
    created() {
        this.selectedPlan = this.planData.stripe_plan;
    },
    methods: {
        cancelSubscription() {
            axios({
                url: `/apps-plans/${plan.stripe_plan}`,
                method: "DELETE"
            }).then(() => {
                this.$modal.hide("plans-modal");
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },
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

<style lang="scss" scoped>
.selected {
    background-color: #b2b2b2;
}
</style>
