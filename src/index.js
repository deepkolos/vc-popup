import PopupBase from './components/popup-base/index'
import PopupBottomMenu from './components/popup-bottom-menu/index'
import PopupCenterMenu from './components/popup-center-menu/index'
import PopupPressMenu from './components/popup-press-menu/index'
import PopupDialog from './components/popup-dialog/index'
import PopupImgViewer from './components/popup-img-viewer/index'
import PopupOver from './components/popup-over/index'
import PopupPicker from './components/popup-picker/index'
import PopupCalendar from './components/popup-calendar/index'
import PopupDatetimePicker from './components/popup-datetime-picker/index'
import popupRegister from './components/popup-base/popup-register'

const version = '1.0.14'
const install = function (Vue, config = {}) {
  if (install.installed) return

  Vue.prototype.popupRegister = popupRegister
  Vue.prototype.$popup = {
    Base: PopupBase,
    BottomMenu: PopupBottomMenu,
    CenterMenu: PopupCenterMenu,
    PressMenu: PopupPressMenu,
    Dialog: PopupDialog,
    ImgViewer: PopupImgViewer,
    Picker: PopupPicker,
    Calendar: PopupCalendar,
    Popover: PopupOver,
    DatetimePicker: PopupDatetimePicker
  }
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version,
  PopupBase,
  PopupBottomMenu,
  PopupCenterMenu,
  PopupPressMenu,
  PopupDialog,
  PopupImgViewer,
  PopupOver,
  PopupPicker,
  PopupCalendar,
  PopupDatetimePicker
}
