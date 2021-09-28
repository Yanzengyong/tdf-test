<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <q-splitter
            v-model="splitterModel"
            style="height: auto"
            class="row justify-left q-gutter-y-md"
          >
            <template v-slot:before>
              <q-tabs v-model="tab" vertical indicator-color="primary">
                <q-tab name="basicSetting" label="基本设置" />
                <q-tab name="securitySetting" label="安全设置" />
                <q-tab name="personal" label="个性化" />
                <q-tab name="accountBind" label="账户绑定" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="basicSetting">
                  <div class="text-subtitle1  q-mb-md ">基本设置</div>
                  <basic-setting></basic-setting>
                </q-tab-panel>

                <q-tab-panel name="securitySetting">
                  <div class="text-subtitle1  q-mb-md q-px-md">安全设置</div>
                  <security-setting></security-setting>
                </q-tab-panel>

                <q-tab-panel name="personal">
                  <div class="text-subtitle1  q-mb-md q-px-md">个性化</div>
                  <personal />
                </q-tab-panel>
                <q-tab-panel name="accountBind">
                  <div class="text-subtitle1  q-mb-md q-px-md">账户绑定</div>
                  <no-data-page />
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import BasicSetting from "../../../components/accountSetting/BasicSetting";
import SecuritySetting from "../../../components/accountSetting/SecuritySetting";
import Personal from "../../../components/accountSetting/Personal";
import NoDataPage from "../../../components/page/NoDataPage";

export default {
  name: "SettingPage",
  components: {
    ScrollArea,
    BasicSetting,
    SecuritySetting,
    Personal,
    NoDataPage
  },
  data() {
    return {
      tab: "basicSetting",
      splitterModel: 20
    };
  }
};
</script>
