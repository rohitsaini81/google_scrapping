import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './components/router.vue'; // Ensure the correct path
import { createVuetify } from 'vuetify';
// import 'vuetify/styles'; // Import Vuetify styles
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import "./Style.scss"
import "./CSS/About.scss"
const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App); // Create Vue app instance
app.use(router); // Use Vue Router
app.use(vuetify)



app.mount('#app'); // Mount the app
