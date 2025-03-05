import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './components/router.vue'; // Ensure the correct path
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles

const vuetify = createVuetify();
const app = createApp(App); // Create Vue app instance
app.use(router); // Use Vue Router
app.use(vuetify)



app.mount('#app'); // Mount the app
