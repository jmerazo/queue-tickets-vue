import { createApp } from 'vue'
import Vuex from '@/store/store'
import App from './App.vue'
import router from './router/router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import icons fortawesome
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

createApp(App)
    .use(router)
    .use(Vuex)
    .use(FontAwesomeIcon)
    .mount('#app')
