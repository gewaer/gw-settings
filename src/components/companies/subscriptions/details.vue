<template>
    <div v-if="selectedPlan" class="subscription-details">
        <div class="card" style="padding: 0 !important;">
            <div class="details-top">
                <h1 class="title">
                    <span>{{ planFrequencyTitle }}</span>
                    <a href="#" @click.prevent="updatePlan()">Change</a>
                </h1>
                <div class="price">
                    <span>{{ selectedPlan.description }}</span>
                    ${{ planPricing }}
                </div>
                <div class="renewal-info">
                    <span>
                        Your plan will be automatically renewed on {{ subscriptionData.next_due_payment | formatDate }}.
                        It will be charged as one payment of ${{ planPricing }} (${{ planMonthlyPricing }}/month).
                    </span>
                </div>
            </div>
            <div class="details-bottom">
                <span class="title">Payment</span>
                <creditcard-networks :brand="cardBrand" />
                <div class="credit-card-details">
                    <span>Credit card ending in <strong>{{ paymentData.payment_ending_numbers }}</strong></span>
                    <a href="#" @click.prevent="updatePaymentMethod()">Update</a>
                </div>
                <div class=" mt-2">
                    <button class="btn btn-outline-danger" @click="cancelSubscription">
                        Cancel Subscription
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import _upperFirst from "lodash/upperFirst";
import CreditcardNetworks from "./creditcard-networks";
import PaymentMethodModal from "./payment-method-modal";
import PlansModal from "./plans-modal";

export default {
    name: "SubscriptionDetails",
    components: {
        CreditcardNetworks
    },
    filters: {
        formatDate(value) {
            return moment(value).format("MMM D, YYYY");
        }
    },
    data() {
        return {
            planData: {
                payment_style: "monthly",
                stripe_plan: "",
                stripe_id: ""
            }
        }
    },
    computed: {
        ...mapState({
            paymentData: state => state.Subscription.paymentData,
            plans: state => state.Subscription.plans,
            subscriptionData: state => state.Subscription.data
        }),
        ...mapActions({
            updateSubscriptionData: "Subscription/setData"
        }),
        cardBrand() {
            return (this.paymentData.payment_methods_brand || "").toLowerCase();
        },
        planPricing() {
            return this.planFrequency == "monthly" ? this.selectedPlan.pricing : this.selectedPlan.pricing;
        },
        planMonthlyPricing() {
            return this.planFrequency == "monthly" ? this.planPricing : (this.planPricing / 12).toFixed(2);
        },
        planFrequency() {
            return this.selectedPlan.payment_ìnterval;
        },
        planFrequencyTitle() {
            return _upperFirst(this.planFrequency);
        },
        selectedPlan() {
            return this.plans.find(plan => plan.stripe_plan == this.subscriptionData.stripe_plan);
        }
    },
    created() {
        this.handleAppPlans();
    },
    methods: {
        handleAppPlans() {
            if (this.subscriptionData) {
                this.planData.payment_style = this.selectedPlan.payment_ìnterval;
                this.planData.stripe_plan = this.subscriptionData.stripe_plan;
                this.planData.stripe_id = this.subscriptionData.stripe_id;
            }
        },
        updatePaymentMethod() {
            this.$modal.show(PaymentMethodModal, {
                planData: this.planData
            }, {
                adaptive: true,
                clickToClose: false,
                height: "auto",
                name: "payment-method-modal",
                scrollable: true
            });
        },
        updatePlan() {
            this.$modal.show(PlansModal, {
                planData: this.planData,
                plans: this.plans
            }, {
                adaptive: true,
                clickToClose: false,
                height: "auto",
                name: "plans-modal",
                scrollable: true
            });
        },

        cancelSubscription() {
            if (confirm("Are you sure you want to cancel your subscription?")) {
                axios({
                    url: `/apps-plans/${this.planData.stripe_plan}s`,
                    method: "DELETE"
                }).then(() => {
                    this.$notify({
                        title: "Success",
                        text: "Your subscription has been canceled",
                        type: "success"
                    });

                    this.updateSubscriptionData({});
                }).catch((error) => {
                    this.$notify({
                        title: "Error",
                        text: error.response.data.errors.message,
                        type: "error"
                    });
                })
            }
        }
    }
}
</script>
<style lang="scss">
.subscription-details {
    .card {
        padding: 0 !important;

        .details-top {
            padding: 25px;

            .title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;

                a {
                    font-size: 18px;
                    color: var(--secondary-color);
                    text-decoration: none;
                }
            }

            .price {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 24px;
                margin-bottom: 20px;

                span {
                    font-size: 16px;
                }
            }

            .renewal-info {
                background-color: #b3c1cb;
                padding: 25px;
                border-radius: 10px;
                font-size: 13px;
                color: white;
                font-weight: 600;
            }
        }

        .details-bottom {
            border-top: 1px dashed #E1E8ED;
            padding: 25px;

            .title {
                color: #A5A5A5;
                font-size: 16px;
                margin-bottom: 20px;
                display: block;
            }

            .credit-card-details {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;

                a {
                    font-size: 18px;
                    color: var(--secondary-color);
                    text-decoration: none;
                }
            }
        }
    }
}
</style>
