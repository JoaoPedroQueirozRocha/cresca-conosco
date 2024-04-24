import { ref, onMounted, onUnmounted } from 'vue';

export const useIconLoader = () => {
    const iconsLoaded = ref(false);
    const loaded = ref(false);
    // Função para verificar se a fonte "Material Icons" foi carregada
    const checkIconsLoaded = (e) => {
        const isMaterialIconsLoaded = e.fontfaces.some(fontFace => fontFace.family === '"Material Icons"');
        if (!isMaterialIconsLoaded) {
            iconsLoaded.value = true;
        }
    };

    // Carrega a fonte e adiciona o ouvinte ao evento 'loadingdone'
    const loadIcons = () => {
        document.fonts.load('24px "Material Icons"').then(() => {

        });

        document.fonts.addEventListener('loadingdone', checkIconsLoaded);
    };

    // Remove o ouvinte do evento quando o componente é desmontado
    const cleanup = () => {
        document.fonts.removeEventListener('loadingdone', checkIconsLoaded);
        loaded.value = true;
    };

    onMounted(loadIcons);
    onUnmounted(cleanup);

    return { iconsLoaded, loaded };
};

