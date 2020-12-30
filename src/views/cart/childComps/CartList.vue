<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
     <cart-list-item v-for="(item,index) in $store.state.cartList" :key="index" :item="item"/>
    </scroll>
  </div>
</template>

<script>
  //公共组件
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  import{ mapGetters } from 'vuex'
  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 1.9rem - 2.09rem - 1.9rem - 2.09rem);
  }
  /**
  * scroll
  */
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>