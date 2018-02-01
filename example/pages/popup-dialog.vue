<template>
  <div class="page page-with-padding">
    <div class="cell" @click="showDialog('ios', true, '标题')">iOS Dialog 有标题</div>
    <div class="cell" @click="showDialog('ios', false)">iOS Dialog 无标题</div>
    <div class="cell" @click="showDialog('android', true, '标题')">Android Dialog 有标题</div>
    <div class="cell" @click="showDialog('android', false)">Android Dialog 无标题</div>
    <div class="cell" @click="showDialog('iosNative', true, '标题')">IOS Native Dialog</div>
    <div class="cell" @click="showDialog('lol', true, '标题')">LOL皮肤 Dialog</div>
  </div>
</template>

<script>
  export default {
    created () {
      this.dialog = new this.$popup.Dialog({
        propsData: {
          message: '内容'
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
