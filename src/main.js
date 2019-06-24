import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import { store } from './store';
import './registerServiceWorker';
import * as firebase from 'firebase';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'YOUR KEY HERE',
      authDomain: 'vue-devmeetups.firebaseapp.com',
      databaseURL: 'https://vue-devmeetups.firebaseio.com',
      projectId: 'vue-devmeetups',
      storageBucket: 'vue-devmeetups.appspot.com'
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
        this.$store.dispatch('fetchUserData');
      }
    });
    this.$store.dispatch('loadMeetups');
  },
}).$mount('#app');
