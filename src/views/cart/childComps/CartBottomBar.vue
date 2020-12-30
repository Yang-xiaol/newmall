<template>
  <div class="cart-bottom-bar">
    <div class="total-check">
      <!--      <img src="~assets/img/cart/tick.svg" alt="">-->
      <check-button :is-check="isSelectAll" @click.native="selectAllClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计：￥{{totalPrice}}</span>
    </div>
    <div class="calc" @click="buySth">
      去结算({{calculate}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return this.$store.state.cartList.filter(item => {
          return item.isCheck === true
        }).reduce((prev,item) => {
          return prev + item.price * item.count
        },0).toFixed(2)
      },
      calculate() {
        return this.$store.state.cartList.filter(item => {
          return item.isCheck
        }).length

      },
      isSelectAll() {
        //如果数组长度为0 0取反会返回true
        if(this.$store.state.cartList.length === 0) return false;
        //判断是否有选中
        return !(this.$store.state.cartList.filter(item => !item.isCheck).length)

      }
    },
    methods: {
      selectAllClick() {
        if(this.isSelectAll) {
          this.$store.state.cartList.forEach(item => item.isCheck = false)
        }else {
          this.$store.state.cartList.forEach(item => item.isCheck = true)
        }
      },
      buySth() {
        if (this.$store.state.cartList.length === 0) {
          this.$toast.show("请选择要购买的商品");
        } else {
          this.$toast.show("暂无购买权限");
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 49px;
    background: #eeeeee;
    display: flex;
    line-height: 40px;
    text-align: center;
  }
  .total-check {
    width: 25%;
    display: flex;
    justify-content: center;

  }

  .total-check span{
    margin-left: 10px;
  }
  .total-price {
    width: 50%;
  }
  .calc {
    width: 25%;
    background-color: #ff5028;
    color:#fff;
  }

</style>