<script>
import { ref } from 'vue';
import cow from '../assets/cow-face.svg';

export default {
    name: 'Menu',
    setup() {
        const isPhone = ref(window.innerWidth <= 768);
        const isExpanded = ref(!isPhone);

        return {
            isPhone,
            isExpanded,
            options: [
                {
                    text: 'Perfil',
                    value: '/perfil',
                    icon: 'account_circle',
                },
                {
                    text: 'Gado',
                    value: '/gado',
                    icon: cow,
                    isImg: true,
                },
                {
                    text: 'Finanças',
                    value: '/financas',
                    icon: 'payments',
                },
                {
                    text: 'Funcionários',
                    value: '/funcionarios',
                    icon: 'supervised_user_circle',
                },
            ]
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
    }
}
</script>

<template>
    <div>
        <span class="material-symbols-rounded menu-expand-icon" @click="isExpanded = !isExpanded" v-if="isPhone">
            {{ isExpanded ? 'close' : 'menu' }}
        </span>
        <div class="menu" ref="menu" :class="{'closed': !isExpanded, 'mobile': isPhone}">
            <div class="flex flex-col justify-between h-full" ref="content">
                <div class="flex flex-col gap-4">
                    <div class="flex items-center gap-2 mb-2" v-if="!isPhone">
                        <img src="../assets/logoCrescaConosco.svg" alt="logo cresça conosco" class="logo" />
                        <img src="../assets/crescaConoscoText.svg" alt="cresça conosco" class="logo-text" v-if="isExpanded" />
                    </div>
                    <router-link
                        class="option"
                        :class="{'active': $route.path === option.value, 'justify-center': !isExpanded}"
                        v-for="option in options"
                        :key="option.value"
                        :to="option.value"
                    >
                        <img :src="option.icon" :alt="option.text + ' icon'" v-if="option.isImg" />
                        <span class="material-symbols-rounded" v-else>
                            {{ option.icon }}
                        </span>
                        <span v-if="isExpanded">{{ option.text }}</span>
                    </router-link>
                </div>
                <span @click="isExpanded = !isExpanded" class="material-symbols-rounded arrow" :class="[isExpanded ? 'rotate-180' : ' ml-2']" style="font-size: 50px;" v-if="!isPhone">
                    chevron_right
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "../style/var.scss";

.menu {
    min-width: 260px;
    max-width: 260px;
    box-shadow: $shadow-menu;
    background: $green-light;
    padding: 1em;
    height: 100vh;
    overflow: hidden;
    user-select: none;
    transition: min-width 0.5s ease, width 0.5s ease, max-width 0.5s ease;
}

.menu.closed {
    min-width: 100px;
    max-width: 100px;
}

.menu.mobile {
    position: fixed;
    z-index: 90;
    bottom: 0;
    height: 90vh;
    min-width: 100%;
    max-width: none;
    transition: height 0.5s ease;
}

.menu.mobile.closed {
    padding: 0em;
    height: 0;
}

.logo {
    height: 80px;
    width: 80px;
}

.logo-text {
    width: 120px;
}

.option {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0.3em 0.5em;
    border-radius: 16px;
    color: $green-dark;
    font-weight: 600;
    font-size: 24px;
    cursor: pointer;
    user-select: none;

    &:hover {
        color: $orange-strong;
        background: $orange-light;

        img {
            filter: invert(71%) sepia(93%) saturate(3265%) hue-rotate(1deg) brightness(97%) contrast(98%);
        }
    }

    img {
        width: 40px;
        filter: invert(22%) sepia(17%) saturate(2775%) hue-rotate(123deg) brightness(98%) contrast(102%);
    }
}

.option.active {
    background: $orange-strong;
    color: white;
    img {
        filter: invert(100%);
    }

    &:hover {
        background: $orange-strong;
        color: white;
        img {
            filter: invert(100%);
        }
    }
}

.material-symbols-rounded {
    font-size: 40px;
}

.arrow {
    @apply ease-in-out duration-300 cursor-pointer w-fit;
    color: $green-dark;
}

.menu-expand-icon {
    color: $green-dark;
}
</style>
