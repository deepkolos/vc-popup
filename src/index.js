import PopupBottomMenu from '../packages/popup-bottom-menu/install'
import PopupCenterMenu from '../packages/popup-center-menu/install'
import PopupPressMenu from '../packages/popup-press-menu/install'
import PopupDialog from '../packages/popup-dialog/install'
import PopupImgViewer from '../packages/popup-img-viewer/install'
import PopupOver from '../packages/popup-over/install'
import PopupPicker from '../packages/popup-picker/install'
import PopupCalendar from '../packages/popup-calendar/install'
import PopupDatetimePicker from '../packages/popup-datetime-picker/install'
import PopupEffectTilePress from '../packages/popup-effect-tile-press/install'

const version = '1.1.13'
const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.use(PopupBottomMenu)
  Vue.use(PopupCenterMenu)
  Vue.use(PopupPressMenu)
  Vue.use(PopupDialog)
  Vue.use(PopupImgViewer)
  Vue.use(PopupOver)
  Vue.use(PopupPicker)
  Vue.use(PopupCalendar)
  Vue.use(PopupDatetimePicker)
  Vue.use(PopupEffectTilePress)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version
}
