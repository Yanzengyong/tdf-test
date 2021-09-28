<template>
  <scroll-area>
    <q-page class="q-pa-md">
      <q-card class="tdf-box-shadow">
        <q-card-section>
          <div class="about" :class="{ 'bg-black': $q.dark.isActive }">
            <div class="text-h5 text-center text-bold about__title">
              {{ $t("about.title") }}
            </div>
            <div class="text-body1 text-center about__content">
              {{ $t("about.introduce") }}
            </div>
            <div class="row justify-center items-center about__btn">
              <!-- <q-btn
                outline
                type="a"
                class="q-mr-lg"
                color="primary"
                :size="$btnSize"
                href="https://tech.taiji.com.cn/tdfdoc/"
                target="_blank"
              >
                {{ $t("about.doc") }}
              </q-btn>
              <q-btn
                outline
                color="info"
                type="a"
                :size="$btnSize"
                href="https://git.taiji.com.cn/IRI/tdf-base-platform/src/branch/master/tdf-ui-quasar"
                target="_blank"
              >
                {{ $t("about.code") }}
              </q-btn> -->
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </scroll-area>
</template>

<script>
import ScrollArea from "../components/scrollarea/ScrollArea";

export default {
  name: "About",
  components: { ScrollArea }
};
</script>

<style lang="scss" scoped>
.about {
  background: $background-color;

  .about__title {
    height: 100px;
    line-height: 100px;
  }

  .about__content {
    margin: 10px 30px;
    line-height: 30px;
  }

  .about__btn {
    height: 100px;
  }
}
</style>
