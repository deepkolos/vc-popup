<template>
  <div class="vc-picker">
    <div class="vc-picker-head">
      <a class="vc-picker-action noExpand" @click="_cancel" v-text="cancelText"></a>
      <a class="vc-picker-action"></a>
      <a class="vc-picker-action noExpand" @click="_confirm" v-text="confirmText"></a>
    </div>
    <vc-picker-view
      :slots="slots"
      :onChange="onChange"
      :defaultValues="defaultValues"
      :showItemNum="showItemNum"
      :showItemHeight="showItemHeight"
      ref="picker"
    ></vc-picker-view>
  </div>
</template>

<script>
  import VcPickerView from '../picker-view'

  export default {
    name: 'vc-popup-picker',

    props: {
      slots: Array,
      showItemNum: Number,
      showItemHeight: Number,
      defaultValues: Array,
      confirmText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      onConfirm: {
        type: Function,
        default: function () {}
      },
      onCancel: {
        type: Function,
        default: function () {}
      },
      onChange: {
        type: Function,
        default: function () {}
      }
    },

    components: {
      VcPickerView
    },

    methods: {
      _cancel (e) {
        this.$popupCtrl.close()
        setTimeout(() => {
          this.onCancel instanceof Function && this.onCancel(this.$refs.picker)
        }, 0)
      },

      _confirm (e) {
        this.$popupCtrl.close()
        setTimeout(() => {
          this.onConfirm instanceof Function && this.onConfirm(this.$refs.picker)
        }, 0)
      }
    }
  }
</script>

<style lang="scss">
  .vc-picker{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: auto;
    transition: all 250ms ease 0s;
    border-top: 1px solid #e3e3e3;
  }

  .vc-picker-head {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 9px 15px;
    background-color: #fff;
    position: relative;
    text-align: center;
    font-size: 17px;

    &:after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #e5e5e5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
    }
  }

  .vc-picker-action {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    color: #1aad19;

    &:first-child {
      text-align: left;
      color: #888;
    }

    &.noExpand{
      flex: 0 0 auto;
      padding: 0 5px;
      transition: all 40ms linear 0ms;

      &:active {
        background: #ececec;
      }
    }
  }
</style>
