<template>
  <div id="home">
    <!--导航条-->
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
    <!--用于吸顶的分类-->
    <tab-control :titles="tab_control_titles"
                 @tabClick="tabClick"
                 ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
    <!--滑动-->
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
<!--      <div class="shuaxin">-->
<!--        <h3>刷新...</h3>-->
<!--      </div>-->
    <!--轮播图-->
   <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
    <!--推荐选项卡-->
    <recommend-view :recommends="recommends"/>
    <!--广告位置-->
    <feature-view/>

      <!--分类-->
      <tab-control :titles="tab_control_titles"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <!--详情-->
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>

</template>

<script>
  //公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import Scroll from "components/common/scroll/Scroll";
  //子组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from 'components/content/backTop/BackTop';
  //数据
  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home";
  //优化性能
  import {debounce} from 'common/utils'

  export default {
    name: "Home",
    components:{
      NavBar,
      TabControl,
      Scroll,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      BackTop
    },
    data(){
    return{
      //储存访问到的数据
      //请求到的数据
      // result:null
      //拿出其中的数据 轮播图所拿的数据轮播取自banners
      banners:[],
      recommends:[],
      tab_control_titles: ['流行','新款','精选'],
      goods:{
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    //生命周期 创建完就开始执行
    created() {
      //请求多个数据
      this.getHomeMultidata();

      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      //所有传入debounce进行防抖函数
      const refresh = debounce(this.$refs.scroll.refresh,100)
      //监听item中图片加载完成
      this.$bus.$on('itemImgLoad', () => {
        //每完成一张图片刷新一次
        //如果直接执行refresh就会执行多次
        //this.scroll && this.$refs.scroll.refresh()
        //所以这里调用刚刚进行防抖的定义的refresh
        refresh()
      })
    },
    methods: {
      //防抖函数 传入函数和时间
      //2.0优化
      //网络请求
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          //拿到请求结果
          this.result = res;
          //拿出结果里的具体数据
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          //完成加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      //事件监听
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        //同步两个分类
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0);
      },
      contentScroll(position){
        //判断BackTop是否显示
        this.isShowBackTop = -(position.y) > 1000
        //决定是否吸顶
        this.isTabFixed = -(position.y) > this.tabOffsetTop
      },
      //下拉加载更多
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>

  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动，不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/

  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }


</style>
