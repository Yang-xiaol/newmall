<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>

</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default(){
          return[]
        }
      }
    },
    data(){
      return{
        isLoad: false
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods: {
      //获得图片加载之后 获得高度 用于吸顶效果
      imageLoad() {
        //节流阀
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>