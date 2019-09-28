<template>
    <div class="plan">
        <div :class="['generic_content', isSelected ? 'active' : '', 'clearfix']">
            <!--HEAD PRICE DETAIL START-->
            <div class="generic_head_price clearfix">
                <!--HEAD CONTENT START-->
                <div class="generic_head_content clearfix">
                    <!--HEAD START-->
                    <div class="head_bg"/>
                    <div class="head">
                        <span>{{ plan.name }}</span>
                    </div>
                    <!--//HEAD END-->
                </div>
                <!--//HEAD CONTENT END-->
                <!--PRICE START-->
                <div class="generic_price_tag clearfix">
                    <span class="price">
                        <span class="sign">$</span>
                        <span class="currency">{{ plan[selectedFrecuency.type] | getPrice }} </span>
                        <span class="cent">.00</span>
                        <span class="month">/{{ selectedFrecuency.frecuency }}</span>
                    </span>
                </div>
                <!--//PRICE END-->
            </div>
            <!--//HEAD PRICE DETAIL END-->
            <!--FEATURE LIST START-->
            <div class="generic_feature_list">
                <ul v-if="plan.settings.length">
                    <li
                        v-for="planSetting in plan.settings"
                        :key="planSetting.key"
                    >
                        <span> {{ planSetting.value }}</span> {{ planSetting.key | formatSetting }}
                    </li>
                </ul>
            </div>
            <!--//FEATURE LIST END-->

            <!--BUTTON START-->
            <div v-if="isSelected" class="generic_price_btn cancel clearfix">
                <a href="">Cancel</a>
            </div>
            <div v-else class="generic_price_btn clearfix">
                <a @click.prevent.stop="() => $emit('changeplan', plan)" >Try {{ plan.name }}</a>
            </div>
            <!--//BUTTON END-->

        </div>
        <div :style="{ opacity : isSelected ? '1' : '0' }" class="selected-plan-details">
            <h5>This is your current plan</h5>
            <p v-if="isPaid">Your membership will automatically renew on 06/28/20</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Plan",
    filters: {
        getPrice(value){
            const isNumber = _.isNumber(Number(value));
            let data = 0;
            if(value && isNumber){
                data =  value.split(".")[0];
            }
            return data;
        },
        formatSetting(value){
            return _.startCase(value);
        }
    },
    props: {
        plan: {
            required:true,
            type: Object
        },
        isSelected: {
            type: Boolean,
            default: false
        },
        selectedFrecuency: {
            required: true,
            type: Object
        }
    },
    computed: {
        ...mapGetters({
            isPaid: "Subscription/isPaid"
        })
    }
}
</script>

<style lang="scss">
.plan {
    background-color: white;

    &.is-not-selected {
        opacity: .5;
    }

    .selected-plan-details {
        background-color: var(--base-color);
        padding: 20px;

        h5 {
            color: white;
            justify-content: center;
            margin-top: 0;
        }

        p {
            margin-bottom: 0;
            font-size: 16px;
            text-align: center;
            color: white;
        }
    }
}
</style>
