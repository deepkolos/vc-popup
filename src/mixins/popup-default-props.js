
export default {
  props: {
    e: {
      default: null
    },
    onClose: {
      type: Function,
      default: function () {}
    },
    onOpen: {
      type: Function,
      default: function () {}
    }
  }
}
