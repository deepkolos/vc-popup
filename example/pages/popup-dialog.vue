<template>
  <div class="page page-with-padding">
    <div class="cell" @click="showDialog('ios', true, '老了...')">iOS Dialog 有标题</div>
    <div class="cell" @click="showDialog('ios', false)">iOS Dialog 无标题</div>
    <div class="cell" @click="showDialog('android', true, '老了...')">Android Dialog 有标题</div>
    <div class="cell" @click="showDialog('android', false)">Android Dialog 无标题</div>
    <div class="cell" @click="showDialog('iosNative', true, '老了...')">IOS Native Dialog</div>
  </div>
</template>

<script>
  export default {

    created () {
      this.dialog = new this.$popup.Dialog({
        propsData: {
          message: '憔悴..'
        }
      })
    },

    methods: {
      showDialog (skin, showCancelBtn, title) {
        this.dialog.open(null, {
          propsData: {
            skin: skin,
            title: title,
            showCancelBtn: showCancelBtn
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
