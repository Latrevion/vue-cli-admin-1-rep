<template>
  <div class="header">
    <div class="sidebarLogo" :class="{ collapse: collapse }">
      <img src="@/assets/img/logo.png" v-show="!collapse" />
      <img
        src="@/assets/img/logo.png"
        v-show="collapse"
        style="margin-left: 13px"
      />
      <span v-show="!collapse">vue element admin</span>
    </div>
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="toggleCollapse" v-if="collapse">
      <i class="icon iconfont icon-suojinindent2"></i>
    </div>
    <div class="collapse-btn" @click="toggleCollapse" v-else>
      <i class="icon iconfont icon-suojinindent3"></i>
    </div>
    <!-- 顶部导航菜单 -->
    <!--    <div class="top-menu-list">-->
    <!--      <span-->
    <!--              v-for="(item, index) in topMenuList"-->
    <!--              :key="index"-->

    <!--              :class="indexnum == index ? 'on' : ''"-->
    <!--      >-->
    <!--        {{ item.menuName }}</span-->
    <!--      >-->
    <!--    </div>-->
    <!--退出等-->
    <div class="admin-btn">
      <div class="user">
        <i class="zhb-icon icon iconfont icon-yonghu1"></i>
        管理员
      </div>
      <div class="layout-btn" @click="logout">
        <i
          class="zhb-icon icon iconfont icon-tuichu"
          style="font-size: 18px; margin-right: 3px"
        ></i>
        注销
      </div>
    </div>
  </div>
</template>
<script>
import bus from "./bus";
export default {
  name: "Header",
  data() {
    return {
      adminName: "",
      token: "",
      collapse: false,
      //顶部导航菜单栏
      indexnum: "",
      topMenuList: [],
    };
  },
  props: ["topUserName"],
  watch: {
    $route() {},
  },
  created() {
    //获取用户信息
    this.adminName = localStorage.getItem("userName");

    //获取头部菜单下标
    this.indexnum = localStorage.getItem("modelIndex") || 0;
  },
  methods: {
    // 侧边栏折叠
    toggleCollapse() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },

    //退出
    logout() {
      //清除token
      window.localStorage.removeItem("token");
      //清除用户名
      window.localStorage.removeItem("userName");
      //跳转登录页
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss">
.header {
  background-color: #053434;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 69px;
  font-size: 22px;
  color: #fff;
  display: flex;
  align-items: center;
  .sidebarLogo {
    width: 256px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: #053434;

    /*border-right:1px solid #2E405B;*/
    box-sizing: border-box;
    border-bottom: 1px solid #2e405b;
    box-shadow: 2px 0 6px rgb(0, 21, 41, 0.35);
    &.collapse {
      width: 65px;
    }
  }
  .sidebarLogo img {
    /*width: 130px;*/
    height: 32px;
    vertical-align: middle;
    margin-left: 22px;
  }
  .sidebarLogo span {
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
    margin-left: 10px;
  }
}

.collapse-btn {
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  border-right: 1px solid #2e405b;
  border-left: 1px solid #2e405b;
  box-sizing: border-box;
}

.collapse-btn i {
  padding: 0 21px;
  display: block;
  font-size: 25px;
  // color: #595959;
  color: #fff;
}

.admin-btn {
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  color: #fff;
}

.layout-btn {
  color: $el-submenu__title-color;
  font-size: 15px;
  cursor: pointer;
  color: #fff;
}

.user {
  color: #fff;
  font-size: 15px;
  display: flex;
  align-items: center;
  margin-right: 20px;

}

.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #8d8d8d;
  cursor: pointer;
}

.zhb-icon {
  font-size: 20px;
  margin-right: 5px;
}
.top-menu-list {
  margin-left: 15px;
  font-size: 14px;
  span {
    padding: 0 10px;
    color: $el-submenu__title-color;
    display: inline-block;
    line-height: 59px;
    margin: 0 20px 0 0;
    &:hover {
      cursor: pointer;
      color: $el-topmenu__title-color;
      line-height: 49px;
      border-bottom: 5px solid #1d73f6;
    }
    &.on {
      color: $el-topmenu__title-color;
      line-height: 49px;
      border-bottom: 5px solid #1d73f6;
    }
  }
}
</style>
