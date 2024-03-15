<script>
import { ref } from 'vue';
import Card from './Card.vue';
import Notification from './Notification.vue';

export default {
    name: 'Topbar',
    components: { Card, Notification },
    setup() {
        return {
            notificationActive: ref(false),
            userActive: ref(false),
            notification: ref(),
        }
    },

    watch: {
    },

    methods: {
        activate(activateNotication, activateUser) {
            this.notificationActive = activateNotication;
            this.userActive = activateUser;
        }
    }
}
</script>

<template>
    <div class="fixed right-6 top-4">
        <div class="relative flex gap-2">
            <div>
                <span class="material-symbols-rounded" :class="{'active': notificationActive}" @click="activate(true, false)">
                    circle_notifications
                </span>
            </div>
            <div>
                <span class="material-symbols-rounded" :class="{'active': userActive}" @click="activate(false, true)">
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
                <Card v-else-if="userActive"></Card>
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

</style>