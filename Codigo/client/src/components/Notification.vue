<script>
export default {
    name: 'Notification',
    props: {
        items: {
            type: Array,
            default: []
        },
    },
}
</script>

<template>
    <div class="notification-holder">
        <header>
            <h5>Notificação</h5>
            <div class="notification-circle">
                {{ items.length > 9 ? '9+' : items.length }}
            </div>
        </header>
        <main v-if="!items.length" class="flex justify-center items-center w-full py-4">
            <slot name="empty-state" />
        </main>
        <main v-else class="notifications">
            <div v-for="(item, index) in items" :key="index" class="notification">
                <slot name="item" :item="item" :index="index" />
            </div>
        </main>
    </div>
</template>

<style scoped lang="scss">
@import "../style/var.scss";

.notification-holder {
    position: relative;
    padding: 1em;
    border-radius: 16px;
    background: white;
    box-shadow: $shadow-base;
    height: fit-content;
    width: 387px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $green-dark;
    border-bottom: 0.1em $green-dark solid;
    padding-bottom: 0.4em;

    h5 {
            font-weight: 600;
            font-size: 20px;
    }
}

.notification-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.1em $green-dark solid;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    font-size: 18px;
}

.notifications {
    @apply flex items-center flex-col w-full mt-4 gap-4 overflow-auto;
    max-height: 260px;
}

.notification {
    border-radius: 8px;
    background: $green-light;
    padding: 0.5em;
    width: 100%;
}
</style>