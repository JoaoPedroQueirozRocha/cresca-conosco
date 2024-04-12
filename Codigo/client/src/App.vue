<script>
import Menu from "./components/Menu.vue";
import Alert from "./components/Alert.vue";
import Confirm from "./components/Confirm.vue";
import Topbar from "./components/Topbar.vue";

export default {
  name: "App",
  components: { Menu, Alert, Topbar, Confirm },
  setup() {},
  methods: {},
};
</script>

<template>
  <Alert />
  <Confirm />
  <div class="flex w-full h-screen">
    <Menu />
    <Topbar />
    <div class="md:mt-14 mt-20 w-full h-fit md:px-8 content pb-4">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import "style/var.scss";

body {
  font-family: "Inter", sans-serif;
  padding: 0;
  background: $gray-200;
  overflow: auto;
}

.title {
  @apply text-4xl font-bold mt-4;
  color: $green-dark;
}

.skeleton-card-title {
    width: 30%;
    margin-bottom: 8px;
}

.skeleton-card-content {
    width: 100%;
    height: 24px !important;
}

.skeleton {
    height: 14px;
    background: $gray-200;
    background: linear-gradient(90deg, transparent, $gray-200, transparent);
    background-size: 200% 100%;
    animation: moveBar 1.5s linear infinite
}

@keyframes moveBar {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}

@media screen and (max-width: 768px) {
  .content {
    padding: 0 1em;
  }
}
</style>
