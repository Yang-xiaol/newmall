export default {
  //跟踪商品数量增加
  addCounter(state,payload) {
    payload.count++
  },
  //跟踪商品增加
  addToCart(state,payload) {
    payload.isCheck = true
    state.cartList.push(payload)
  }

}