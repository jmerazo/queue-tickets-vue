import { createApp } from 'vue'
import Vuex from '@/store/store'
import App from './App.vue'
import router from './router/router'
import Toaster from "@meforma/vue-toaster";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar'

// Import icons fortawesome
import { 
    faPenToSquare,
    faTrash,
    faUserPlus,
    faKey,
    faUserXmark,
    faUserCheck,
    faUserPen,
    faColumns,
    faAddressCard,
    faRightFromBracket,
    faUserLock,
    faUser,
    faUnlock,
    faIdCard,
    faEnvelope,
    faMobile,
    faCity,
    faLocationDot,
    faLocationPin,
    faListOl,
    faFileText,
    faClock,
    faCalendar,
    faBuilding,
    faPerson,
    faFile,
    faFileLines,
    faChevronLeft,
    faUsers,
    faTicket,
    faLightbulb,
    faPhone,
    faPassport,
    faUserGear,
    faPlus,
    faList,
    faCodeCommit,
    faSignature
} from '@fortawesome/free-solid-svg-icons'
import { 
    faFacebook, 
    faInstagram, 
    faTwitter, 
    faYoutube 
} from '@fortawesome/free-brands-svg-icons';

library.add(
    faTrash,
    faUserPlus,
    faPenToSquare,
    faKey,
    faUserXmark,
    faUserCheck,
    faUserPen,
    faColumns,
    faAddressCard,
    faRightFromBracket,
    faUserLock,
    faUser,
    faUnlock,
    faIdCard,
    faEnvelope,
    faMobile,
    faCity,
    faLocationDot,
    faLocationPin,
    faListOl,
    faFileText,
    faClock,
    faCalendar,
    faBuilding,
    faPerson,
    faFile,
    faFileLines,
    faChevronLeft,
    faUsers,
    faTicket,
    faLightbulb,
    faFacebook,
    faTwitter,
    faInstagram,
    faYoutube,
    faPhone,
    faPassport,
    faUserGear,
    faPenToSquare,
    faPlus,
    faList,
    faCodeCommit,
    faSignature
)

createApp(App)
    .use(router)
    .use(Vuex)
    .use(Toaster)
    .use(SetupCalendar)
    .component("Calendar", Calendar)
    .component("DatePicker", DatePicker)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
