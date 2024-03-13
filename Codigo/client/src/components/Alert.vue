<script>
import event from "@/util/event";
import { ref } from 'vue';

export default {
    name: 'Alert',
    setup() {
        return {
            show: ref(false)
        }
    },
    mount() {
        event.on('show-alert', showAlert);
        event.on('close-alert', closeAlert);
    },
    beforeUnmount() {
        event.off('show-alert', showAlert);
        event.off('close-alert', closeAlert);
    },
    computed: {
        icon() {
            switch (this.type) {
                case 'error' | 'warning':
                    return 'error';
                    break;
            }
        }
    },
    methods: {
        showAlert(options) {
            Object.keys(options).forEach((key) => {
                this[key] = options[key];
            });
            this.show = true;
        }

        closeAlert() {
            this.show = false;
        }
    },
}
</script>

<template>
    <div
        class="fixed z-100"
        :class="[type, {'top-3': top, 'bottom-3': bottom, 'left-3': left, 'right-3': right,}]"
    >
        <span class="material-symbols-rounded">
            {{ icon }}
        </span>
    </div>
</template>

<style scoped lang="scss">
@import "../style/var.scss";

.error {
    color: $red-strong;
    border: 0.1em $red-strong solid;
    background: $red-light;
}

.warning {
    color: $yellow-strong;
    border: 0.1em $yellow-strong solid;
    background: $yellow-light;
}
</style>