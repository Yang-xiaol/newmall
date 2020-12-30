export default {
  //处理购物车增加商品的信息
  addCart(context,payload){
    return new Promise((resolve,reject) => {
      //1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2.判断是+1还是创建新的
      if (oldProduct){
        context.commit('addCounter',oldProduct)
        reject();
      }else {
        payload.count = 1
        context.commit('addToCart',payload)
        resolve();
      }
    })

  }
}