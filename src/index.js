import Swipeplus from './components/swipeplus/index'
import SwipeItem from './components/swipe-item/index'
import PullDownRefresh from './components/pull-down-refresh/index'
import PopupBase from './components/popup-base/index'
import PopupBottomMenu from './components/popup-bottom-menu/index'
import PopupCenterMenu from './components/popup-center-menu/index'
import PopupPressMenu from './components/popup-press-menu/index'
import PopupDialog from './components/popup-dialog/index'
import PopupDialogCustom from './components/popup-dialog-custom/index'
import PopupImgViewer from './components/popup-img-viewer/index'
import PopupOver from './components/popup-over/index'
import PopupPicker from './components/popup-picker/index'
import PickerView from './components/picker-view/index'
import PopupCalendar from './components/popup-calendar/index'
import PopupDatetimePicker from './components/popup-datetime-picker/index'
import GestureTilePress from './components/gesture-tile-press/index'

const version = '1.0.0'
const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.component(Swipeplus.name, Swipeplus)
  Vue.component(SwipeItem.name, SwipeItem)
  Vue.component(PullDownRefresh.name, PullDownRefresh)
  Vue.component(PickerView.name, PickerView)
  Vue.component(GestureTilePress.name, GestureTilePress)
  Vue.prototype.$popup = PopupBase
  Vue.prototype.$bottomMenu = PopupBottomMenu
  Vue.prototype.$centerMenu = PopupCenterMenu
  Vue.prototype.$pressMenu = PopupPressMenu
  Vue.prototype.$popUpDialog = PopupDialog
  Vue.prototype.$popUpDialogCustom = PopupDialogCustom
  Vue.prototype.$popupImgViewer = PopupImgViewer
  Vue.prototype.$picker = PopupPicker
  Vue.prototype.$calendar = PopupCalendar
  Vue.prototype.$popupOver = PopupOver
  Vue.prototype.$datetimePicker = PopupDatetimePicker
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version,
  Swipeplus,
  SwipeItem,
  PullDownRefresh,
  PopupBase,
  PopupBottomMenu,
  PopupCenterMenu,
  PopupPressMenu,
  PopupDialog,
  PopupDialogCustom,
  PopupImgViewer,
  PopupOver,
  PopupPicker,
  PickerView,
  PopupCalendar,
  PopupDatetimePicker,
  GestureTilePress
}
