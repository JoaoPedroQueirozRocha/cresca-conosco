<script>
import { ref } from 'vue';

export default {
    name: 'Button',
    props: {
        variant: {
            type: String,
            default: 'primary'
        },
        size: {
            type: String,
            default: 'medium'
        },
        onlyBorder: Boolean,
    },
    emits: ['click'],
}
</script>

<template>
    <button
        class="button"
        :class="[variant, size, { 'only-border': onlyBorder }]"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<style scoped lang="scss">
@import "../style/var.scss";

.button {
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    border-radius: 8px;
    border-width: 0.15em;
    border-style: solid;
    padding: 0.4em 1em;
    font-weight: 600;
    height: fit-content;
    width: fit-content;
}

.small {
    font-size: 14px;
}

.medium {
    font-size: 16px;
}

.large {
    font-size: 18px;
}

.primary {
    color: white;
    background: $green-dark;
    border-color: $green-dark;

    &:hover {
        background: $green-800;
        border-color: $green-800;
    }
}

.only-border.primary {
    color: $green-dark;
    background: transparent;
    border-color: $green-dark;

    &:hover {
        color: white;
        background: $green-dark;
    }
}

.green {
    color: white;
    background: $green-leaf;
    border-color: $green-leaf;

    &:hover {
        background: $green-leaf-dark;
        border-color: $green-leaf-dark;
    }
}

.only-border.green {
    color: $green-leaf;
    background: transparent;
    border-color: $green-leaf;

    &:hover {
        color: white;
        background: $green-leaf;
    }
}

.orange {
    color: white;
    background: $orange-strong;
    border-color: $orange-strong;

    &:hover {
        background: $orange-dark;
        border-color: $orange-dark;
    }
}

.only-border.orange {
    color: $orange-strong;
    background: transparent;
    border-color: $orange-strong;

    &:hover {
        color: white;
        background: $orange-strong;
    }
}
</style>