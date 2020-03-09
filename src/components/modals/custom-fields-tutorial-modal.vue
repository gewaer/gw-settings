<template>
    <modal
        :adaptive="true"
        :scrollable="true"
        name="custom-fields-tutorial-modal"
        height="auto"
        width="900"
        class="custom-fields-tutorial-modal"
    >
        <h1>CUSTOM FIELDS MANAGER</h1>
        <form-wizard class="wizard-component" shape="tab" color="var(--base-color)">
            <tab-content>
                <h4>1- Adding fields to your Module</h4>
                <span class="d-block mb-4">Drag and drop any field form the manager to the module canvas.</span>
                <img src="/img/settings/custom-fields/step-1-adding-fields.jpg" class="img-fluid">
            </tab-content>

            <tab-content>
                <h4>2- Customize your field</h4>
                <span class="d-block mb-4">Depending on the field, please add a name, options and select if the field is required or not, then save.  Remember that “*” symbol means it’s required.</span>
                <img src="/img/settings/custom-fields/step-2-customize-field.jpg" class="img-fluid">
            </tab-content>

            <tab-content>
                <h4>3- Edit your field</h4>
                <span class="d-block mb-4">You can always edit your custom fields by clicking the edit button.</span>
                <img src="/img/settings/custom-fields/step-3-edit-field.jpg" class="img-fluid">
            </tab-content>
            <template slot="footer" slot-scope="props">
                <a href="javascript:void(0)" class="skip" @click="$modal.hide('custom-fields-tutorial-modal')">Skip and never show again</a>
                <div class="wizard-right">
                    <a
                        v-if="props.activeTabIndex"
                        href="javascript:void(0)"
                        @click="props.prevTab()"
                    >
                        BACK
                    </a>
                    <a
                        v-if="!props.isLastStep"
                        href="javascript:void(0)"
                        @click="props.nextTab()"
                    >
                        NEXT
                    </a>
                    <a
                        v-else
                        href="javascript:void(0)"
                        @click="$modal.hide('custom-fields-tutorial-modal')"
                    >
                        FINISH
                    </a>
                </div>
            </template>
        </form-wizard>
        <!-- <div class="wizard-footer">
            <a href="javascript:void(0)" @click="$modal.hide('custom-fields-tutorial-modal')" class="skip">Skip and never show again</a>
            <div class="wizard-navigation">
                <a href="javascript:void(0)" @click="currentTab = Number(currentTab) + 1">NEXT</a>
            </div>
        </div> -->
    </modal>
</template>

<script>

export default {
    name: "CustomFieldsTutorialModal",
    components: {
        FormWizard: () => import(/* webpackChunkName: "form-wizard-form" */ "vue-form-wizard").then(({ FormWizard }) => FormWizard),
        TabContent: () => import(/* webpackChunkName: "form-wizard-tab-content" */ "vue-form-wizard").then(({ TabContent }) => TabContent)
        // WizardButton: () => import(/* webpackChunkName: "form-wizard-wizard-button" */ "vue-form-wizard").then(({ WizardButton }) => WizardButton)
    },
    data() {
        return {
            currentTab: "0"
        };
    }
}
</script>

<style lang="scss">
.custom-fields-tutorial-modal {
    .v--modal {
        padding: 35px;

        h1 {
            font-family: 'Lato', sans-serif;
            font-size: 18px;
            color: var(--base-color);
            margin-bottom: 25px;
        }

        .vue-form-wizard {
            padding: 0;

            .wizard-header {
                display: none;
            }

            .wizard-navigation {
                .wizard-progress-with-circle, .wizard-nav-pills {
                    display: none;
                }

                .wizard-tab-content {
                    padding: 0;
                }
            }

            .wizard-card-footer {
                padding: 0;
                padding-top: 20px;
                font-size: 14px;
                display: flex;
                justify-content: space-between;

                .wizard-right {
                    margin-left: auto;

                    a {
                        color: var(--secondary-color);
                    }

                    a:last-child {
                        margin-left: 10px;
                    }
                }

                .skip {
                    color: var(--base-color);
                    text-decoration: none;
                }
            }
        }
    }
}
</style>
