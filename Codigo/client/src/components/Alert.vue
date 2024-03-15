<script>
import event from "@/util/event";
import { ref } from 'vue';

export default {
    name: 'Alert',
    setup() {
        return {
            show: ref(false),
            type: ref('error')
        }
    },
    mounted() {
        event.on('show-alert', this.showAlert);
        event.on('close-alert', this.closeAlert);
    },
    beforeUnmount() {
        event.off('show-alert', this.showAlert);
        event.off('close-alert', this.closeAlert);
    },
    computed: {
        icon() {
            switch (this.type) {
                case 'error' || 'warning':
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
        },

        closeAlert() {
            this.show = false;
        }
    },
}
</script>

<template>
    <div   
        v-if="show"
        class="alert"
        :class="[type, {'top-3': top, 'bottom-3': bottom, 'left-3': left, 'right-3': right,}]"
    >
        <div class="flex gap-2 items-center">
            <span class="material-symbols-rounded text-2xl">
                {{ icon }}
            </span>
            <div>
                <h6 v-if="title" class="font-bold text-lg">{{ title }}</h6>
                <p class="text-base">{{ message }}</p>
            </div>
        </div>
        <span class="material-symbols-rounded cursor-pointer text-2xl" @click="closeAlert">
            close
        </span>
    </div>
</template>

<style scoped lang="scss">
@import "../style/var.scss";

.alert {
    z-index: 100;
    position: fixed;
    display: flex;
    gap: 0.5em;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 0.7em;
    border-radius: 16px;
    min-width: 300px;
    border-width: 0.1em;
}

.icon {
    font-size: 40px;
}

.error {
    color: $red-strong;
    border-color: $red-strong;
    background: $red-light;
}

.warning {
    color: $yellow-strong;
    border-color: $yellow-strong;
    background: $yellow-light;
}
</style>