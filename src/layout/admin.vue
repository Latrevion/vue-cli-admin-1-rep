<template>
  <div>
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="main-box" :class="{ 'content-collapse': collapse }">
      <v-tags></v-tags>
      <div class="main-body">
        <transition name="move" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vTags from "./Tags.vue";
import bus from "./bus";
export default {
  name: "admin",
  data: function () {
    return {
      collapse: "",
    };
  },
  created() {
    bus.$on("collapse", (msg) => {
      this.collapse = msg;
    });
  },
  methods: {},
  components: {
    vHead,
    vSidebar,
    vTags,
  },
};
</script>

<style lang="scss" scoped>
.main-box {
  position: absolute;
  top: 69px;
  left: 256px;
  right: 0;
  bottom: 0;
  background: #F0F2F5;
  &.content-collapse {
    left: 65px;
  }
  .main-body {
    width: 100%;
    height: calc(100% - 50px);
  }
}
</style>
