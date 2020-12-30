<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"
                    ref="bar"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  //子组件
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from 'components/content/backTop/BackTop';



  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import {debounce} from "../../common/utils";
  export default {
    name: "Detail",
    components: {
      Scroll,
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailParamInfo,
      DetailGoodsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      BackTop
    },
    data(){
      return{
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        isShowBackTop: false,
        currentIndex: 0
      }
    },
    activated() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        //1.获取数据 储存到data
        const data = res.result
        //2.获取顶部的图片轮播图数据（存放到类中）
        this.topImages = data.itemInfo.topImages
        //3.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //4.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //5.保存商品的详情数据(直接取出即可)
        this.detailInfo = data.detailInfo;
        //6.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //7.取出评论信息（先判断有没有）
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      //请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      //防抖（获取高度用于页面内跳转 点击标题，滚动到对应的主题）
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      })
    },
    methods: {
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
        //1.获取值
        const positionY = -position.y
        //2.positionY和主题中值进行对比
        let length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          if (this.currentIndex !== i &&
              ((i < length - 1 && positionY >= this.themeTopYs[i] &&
                  positionY < this.themeTopYs[i+1])
              || (i === length - 1 && positionY>=this.themeTopYs[i]))){
            this.currentIndex = i;
            this.$refs.bar.currentIndex =this.currentIndex
          }
        }
        //3.是否返回顶部
        this.isShowBackTop = -(position.y) > 1000
      },
      //返回顶部
      backClick(){
        this.$refs.scroll.scrollTo(0,0);
      },
      //商品加入到购物车
      addToCart() {
        //1.获取需要展示在购物车中的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        //2.将商品添加到购物车
        this.$store.dispatch('addCart',product).then(() => {
          this.$toast.show("加入购物车");
        })
            .catch(() => {
              this.$toast.show("购买数量+1");
            });
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>