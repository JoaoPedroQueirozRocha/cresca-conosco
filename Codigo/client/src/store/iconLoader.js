import { ref, onMounted, onUnmounted } from 'vue';

export const useIconLoader = () => {
    const loaded = ref(false);

    setTimeout(() => {
        loaded.value = true;
        store.commit('setIconsLoaded', true);
    }, 3000);

    return { loaded };
};

