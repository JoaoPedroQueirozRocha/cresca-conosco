<script>
import { ref } from 'vue';
import Card from './Card.vue';
import Notification from './Notification.vue';
import Button from './Button.vue';

export default {
    name: 'Topbar',
    components: { Card, Notification, Button },
    setup() {
        return {
            notificationActive: ref(false),
            perfilDropdownActive: ref(false),
            notification: ref(),
            notificationIcon: ref(),
            perfilDropdown: ref(),
            perfilIcon: ref(),
        }
    },

    beforeMount() {
        document.addEventListener('click', (event) => {
            this.closeDropdown(event, this.notification?.$el, this.notificationIcon, 'notificationActive');
            this.closeDropdown(event, this.perfilDropdown?.$el, this.perfilIcon, 'perfilDropdownActive');
        });
    },

    beforeUnmount() {
        document.removeEventListener('click', (event) => {
            this.closeDropdown(event, this.notification?.$el, this.notificationIcon, 'notificationActive');
            this.closeDropdown(event, this.perfilDropdown?.$el, this.perfilIcon, 'perfilDropdownActive');
        });
    },

    methods: {
        activate(activateNotication, activateUser) {
            this.notificationActive = activateNotication;
            this.perfilDropdownActive = activateUser;
        },

        closeDropdown(event, dropdown, icon, key) {
            if (!dropdown || !icon) return;
            if (!dropdown.contains(event.target) && !icon.contains(event.target)) 
                this[key] = false
        }
    }
}
</script>

<template>
    <div class="top-holder">
        <div class="relative flex gap-2">
            <div>
                <span class="material-symbols-rounded" ref="notificationIcon" :class="{'active': notificationActive}" @click="activate(!notificationActive, false)">
                    circle_notifications
                </span>
            </div>
            <div>
                <span class="material-symbols-rounded" ref="perfilIcon" :class="{'active': perfilDropdownActive}" @click="activate(false, !perfilDropdownActive)">
                    account_circle
                </span>
            </div>
            <div class="absolute right-0 top-14">
                <Notification v-if="notificationActive" ref="notification">
                    <template #empty-state>
                        <div class="empty-state">
                            <span class="material-symbols-rounded">
                                notifications
                            </span>
                            Sem notificações
                        </div>
                    </template>
                </Notification>
                <Card v-else-if="perfilDropdownActive" ref="perfilDropdown" class="flex flex-col items-center gap-4 w-fit">
                    <h3 class="user-name">Teste</h3>
                    <div class="flex flex-col gap-2">
                        <Button class="whitespace-nowrap">Editar Perfil</Button>
                        <Button only-border class="w-full">Logout</Button>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "../style/var.scss";

.material-symbols-rounded {
    font-size: 50px;
    color: $gray-500;
    cursor: pointer;
}

.material-symbols-rounded.active {
    color: $green-dark;
}

.empty-state {
    @apply flex flex-col gap-2 items-center;
    user-select: none;
    color: $gray-400;

    .material-symbols-rounded {
        font-size: 60px;
        color: $gray-400;
        cursor: auto;
    }
}

.user-name {
    @apply font-bold text-2xl;
    color: $green-dark;
}

.top-holder {
    @apply fixed px-4 py-2 md:px-6 md:py-4 w-full h-fit flex justify-end;
    z-index: 80;
}

@media screen and (max-width: 768px) {
    .top-holder {
      background: $gray-200;
    }
}
</style>