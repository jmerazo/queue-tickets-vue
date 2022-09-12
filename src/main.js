import { createApp } from 'vue'
import Vuex from '@/store/store'
import App from './App.vue'
import router from './router/router'
import Toaster from "@meforma/vue-toaster";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css';

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
    faSignature,
    faToggleOn,
    faToggleOff,
    faBook
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
    faSignature,
    faToggleOn,
    faToggleOff,
    faBook
)

createApp(App)
    .use(router)
    .use(Vuex)
    .use(Toaster)
    .use(VCalendar, {})
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
