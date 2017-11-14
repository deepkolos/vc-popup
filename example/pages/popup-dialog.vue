<template>
  <div class="page page-with-padding">
    <div class="cell" @click="showDialog('ios', '老了...')">iOS Dialog 有标题</div>
    <div class="cell" @click="showDialog('ios')">iOS Dialog 无标题</div>
    <div class="cell" @click="showDialog('android', '老了...')">Android Dialog 有标题</div>
    <div class="cell" @click="showDialog('android')">Android Dialog 无标题</div>
  </div>
</template>

<script>

  export default {

    created (){
      this.dialog = new this.$dialog({
        message: '憔悴..',
        showCancelBtn: true
      })
    },

    methods: {
      showDialog (skin, title) {
        this.dialog.open(null, {
          skin: skin,
          title: title
        })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
