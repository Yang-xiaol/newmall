<template>
  <div id="cart">
<!--导航-->
    <nav-bar class="cart-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
<!--    列表-->
    <cart-list/>
<!--    合计-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  //公共组件
  import NavBar from "components/common/navbar/NavBar";

  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      cartLength() {
        return this.$store.state.cartList.length
      }
    }
  }
</script>

<style scoped>
  .cart-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
