<template>
  <div class="feature">
    <a href="https://m.toutiao.com/i6896983732486406664/">
      <h3>{{title}}</h3>
      <img :src=imgurl alt="">
    </a>
  </div>
</template>

<script>
  export default {
    name: "FeatureView",
    data(){
      return{
        title: '室友给你带过什么“绝交特产”？',
        imgurl: "https://p3-tt-ipv6.byteimg.com/img/pgc-image/SGpjUCkEtKkoe~tplv-tt-cs0:640:360.jpg"

      }
    }
  }
</script>

<style scoped>
.feature img{
  width: 100%;
}
</style>