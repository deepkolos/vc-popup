import GestureTilePress from './components/gesture-tile-press/index'
import Swipeplus from './components/swipeplus/index'
import SwipeItem from './components/swipe-item/index'
import PullDownRefresh from './components/pull-down-refresh/index'
import PopupBase from './components/popup-base/index'
import PopupBottomMenu from './components/popup-bottom-menu/index'
import PopupCenterMenu from './components/popup-center-menu/index'
import PopupPressMenu from './components/popup-press-menu/index'
import PopupDialog from './components/popup-dialog/index'
import PopupImgViewer from './components/popup-img-viewer/index'
import PopupOver from './components/popup-over/index'
import PopupPicker from './components/popup-picker/index'
import PickerView from './components/picker-view/index'
import PopupCalendar from './components/popup-calendar/index'
import PopupDatetimePicker from './components/popup-datetime-picker/index'
import popupRegister from './components/popup-base/popup-register'

const version = '1.0.4'
const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.component(GestureTilePress.name, GestureTilePress)
  Vue.component(Swipeplus.name, Swipeplus)
  Vue.component(SwipeItem.name, SwipeItem)
  Vue.component(PullDownRefresh.name, PullDownRefresh)
  Vue.component(PickerView.name, PickerView)
  Vue.prototype.popupRegister = popupRegister
  Vue.prototype.$popup = {
    base: PopupBase,
    bottomMenu: PopupBottomMenu,
    centerMenu: PopupCenterMenu,
    pressMenu: PopupPressMenu,
    dialog: PopupDialog,
    imgViewer: PopupImgViewer,
    picker: PopupPicker,
    calendar: PopupCalendar,
    popupOver: PopupOver,
    datetimePicker: PopupDatetimePicker
  }
  // 内建的先是这样注册,用户自定义的使用popupRegister,来注册,是否需要不同的命名空间?TBD
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version,
  GestureTilePress,
  Swipeplus,
  SwipeItem,
  PullDownRefresh,
  PopupBase,
  PopupBottomMenu,
  PopupCenterMenu,
  PopupPressMenu,
  PopupDialog,
  PopupImgViewer,
  PopupOver,
  PopupPicker,
  PickerView,
  PopupCalendar,
  PopupDatetimePicker
}
