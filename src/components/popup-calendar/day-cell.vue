<template>
  <div class="vc-calendar-day-cell" :data-status="_check(status)" @click="_click">
    <div class="vc-calendar-day-number-wrapper">
      <div class="vc-calendar-day-number-left"></div>
      <div class="vc-calendar-day-number">{{ _checkDay(day) }}</div>
      <div class="vc-calendar-day-number-right"></div>
    </div>
    <div class="day-description">{{ _checkDescription(status) }}</div>
  </div>
</template>

<script>
  export default {
    name: 'vc-vc-calendar-day-cell',

    props: {
      status: String,
      day: Number,
      isPlaceholder: {
        type: Boolean,
        default: false
      },
      isDisable: {
        type: Boolean,
        default: false
      },
      isUnavailable: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      _check (val) {
        if (this.isPlaceholder)
          return ''

        if (this.isDisable)
          return 'disabled'

        if (this.isUnavailable)
          return 'unavailable'

        return val
      },

      _checkDescription (val) {
        if (this.isPlaceholder || this.isUnavailable)
          return ''

        if (this.isDisable)
          return 'disable'

        if (val === 'selected-end-left' || val === 'selected-end')
          return '止'
        if (val === 'selected-start-right' || val === 'selected-start')
          return '起'
        if (val === 'selected-start-end')
          return '起/止'

        return ''
      },

      _checkDay (val) {
        if (this.isPlaceholder)
          return ''

        return val
      },

      _click (e) {
        if (this.isPlaceholder === false && this.isDisable === false && this.isUnavailable === false)
          e.carrier = {
            vm_day: this
          }
      }
    }
  }
</script>

<style scoped lang="scss">
  .vc-calendar-day-cell{
    flex: auto;
    text-align: center;
    color: black;

    &[data-status|="selected"]{
      color: #1AAD19!important;
      & .vc-calendar-day-number {
        color: white;
        background-color: #1AAD19;
      }
    }

    &[data-status="selected-right"],
    &[data-status="selected-start-right"]{
      & .vc-calendar-day-number {
        border-top-left-radius: 100%;
        border-bottom-left-radius: 100%;
      }

      & .vc-calendar-day-number-right {
        background-color: #1AAD19;
      }
    }

    &[data-status="selected-left"],
    &[data-status="selected-end-left"]{
      & .vc-calendar-day-number {
        border-top-right-radius: 100%;
        border-bottom-right-radius: 100%;
      }

      & .vc-calendar-day-number-left {
        background-color: #1AAD19;
      }
    }

    &[data-status="selected-full"]{
      & .vc-calendar-day-number-left , & .vc-calendar-day-number-right{
        background-color: #1AAD19;
      }
    }

    &[data-status="selected-start"],
    &[data-status="selected-end"],
    &[data-status="selected-start-end"],
    &[data-status="selected-left-right"] {
      & .vc-calendar-day-number {
        border-radius: 100%;
        background-color: #1AAD19;
      }
    }

    &[data-status="disabled"]{
      & .vc-calendar-day-number {
        color: #bbb;
        border-radius: 100%;
        background-color: #eee;
      }

      & .day-description {
        color: #888;
      }
    }

    &[data-status="unavailable"]{
      & .vc-calendar-day-number {
        color: #bbb;
        border-radius: 100%;
        background-color: #eee;
      }
    }

    &.grey {
      color: #bbb;
    }
  }

  .vc-calendar-day-number{
    flex: 0 0 auto;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin: 0 auto;
    overflow: hidden;
  }

  .day-description{
    font-size: 10px;
    height: 15px;
    text-align: center;
  }

  .vc-calendar-day-number-wrapper{
    display: flex;
  }

  .vc-calendar-day-number-left, .vc-calendar-day-number-right{
    flex: auto;
  }
</style>
