<template>
  <div id="toast">
    <transition name="toast">
      <div class="toast_div" v-show="isShowTip">{{ message }}</div>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isShowTip: false,
        message: ""
      };
    },
    methods: {
      show(msg, delay = 1000) {
        this.isShowTip = true;
        this.message = msg;
        setTimeout(() => {
          this.isShowTip = false;
        }, delay);
      }
    }
  };
</script>
<style scoped>

  #toast {
   position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 0.4rem;

    z-index: 999;

    color: #fff;
    background-color: rgba(0,0,0,.75);
  }

  .toast-enter,
  .toast-leave-to {
    opacity: 0;
  }
  .toast-enter-active {
    transition: opacity 1s;
    padding: 8px 10px;
  }
  .toast-leave-active {
    transition: opacity 0.5s;
    padding: 8px 10px;
  }

</style>