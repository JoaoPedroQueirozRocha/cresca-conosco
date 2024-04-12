<script>
import Menu from "./components/Menu.vue";
import Alert from "./components/Alert.vue";
import Confirm from "./components/Confirm.vue";
import Topbar from "./components/Topbar.vue";
import { ref } from "vue";

export default {
  name: "App",
  components: { Menu, Alert, Topbar, Confirm },
  setup() {
    return {
      expanded: ref(false),
      isPhone: ref(window.innerWidth <= 768),
    }
  },
  beforeMount() {
      window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
  },
  methods: {
      handleResize() {
          this.isPhone = window.innerWidth <= 768;
      },
      changeExpanded(value) {
        this.expanded = value;
      }
  },
};
</script>

<template>
  <Alert />
  <Confirm />
  <div class="grid-template" :class="{'small': expanded && !isPhone, 'is-phone': isPhone}">
    <Menu @update:is-menu-opened="changeExpanded" />
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
  overflow: hidden;
}

#app {
  overflow: auto;
}

.grid-template {
  @apply w-full h-screen;
  display: grid;
  grid-template-columns: min-content auto;
}

.grid-template.is-phone {
  display: flex !important;
}

.grid-template.small {
  grid-template-columns: min-content 84%;
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
