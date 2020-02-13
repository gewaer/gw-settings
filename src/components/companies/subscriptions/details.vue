<template>
    <div class="subscription-details">
        <div class="card">
            <div class="details-top">
                <h1 class="title">
                    <span>Monthly</span>
                    <a href="#">Change</a>
                </h1>
                <div class="price">
                    <span>1 Seat subscription</span>
                    $10.00
                </div>
                <div class="renewal-info">
                    <span>Your plan will be automatically renewed on Dec 10, 2019. It will be charged as one payment of $10.00 ($10.00/month).</span>
                </div>
            </div>
            <div class="details-bottom">
                <span class="title">Payment</span>
                <creditcard-networks brand="visa" />
                <div class="credit-card-details">
                    <span>Credit card ending in <strong>900</strong></span>
                    <a href="#">Update</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SubscriptionDetails",
    components: {
        creditcardNetworks: () => import(/* webpackChunkName: "creditcard-networks"*/ "./creditcard-networks")
    }
}
</script>
<style lang="scss">
.subscription-details {
    .card {
        padding: 0;

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
