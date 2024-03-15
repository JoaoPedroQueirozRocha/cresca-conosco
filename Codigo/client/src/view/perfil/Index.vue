<template>
  <button @click="logout">Sair</button>
</template>

<script>
export default {
  inject: ["Auth"],
  methods: {
    logout() {
      this.Auth.logout();
    },
  },
};
</script>
