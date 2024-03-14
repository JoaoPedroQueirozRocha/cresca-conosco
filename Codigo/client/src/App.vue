<template>
  <Alert />
  <div class="flex w-full h-screen">
    <Menu />
    <router-view />
    <button @click="login">login</button>
  </div>
</template>

<script>
import Menu from './components/Menu.vue';
import Alert from './components/Alert.vue';
import {useAuth0} from '@auth0/auth0-vue';

export default {
  name: 'App',
  components: { Menu, Alert },
  setup(){

    const { loginWithRedirect } = useAuth0();

    return{
      login: () => {
        loginWithRedirect();
      }
    }
  }
}
</script>

<style lang="scss">
@import "style/var.scss";

#app {
  font-family: 'Inter', sans-serif;
  padding: 0;
  background: $gray-100;
}
</style>
