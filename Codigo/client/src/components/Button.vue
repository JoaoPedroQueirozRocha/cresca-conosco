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
        disabled: Boolean,
        rounded: Boolean,
        loading: Boolean,
    },
    emits: ['click'],
}
</script>

<template>
    <button
        class="button"
        :class="[variant, size, { 'only-border': onlyBorder , 'disabled': disabled, 'rounded-button': rounded, 'pointer-events-none': loading, 'min-w-[5em]': !rounded }]"
        @click="$emit('click')"
    >
        <svg class="b-spinner" viewBox="0 0 50 50" v-if="loading">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="8" shape-rendering="geometricPrecision"></circle>
        </svg>
        <slot v-else />
    </button>
</template>

<style scoped lang="scss">
@import "../style/var.scss";

.button {
    display: flex;
    justify-content: center;
    height: fit-content;
    text-transform: uppercase;
    border-radius: 8px;
    border-width: 0.15em;
    border-style: solid;
    padding: 0.4em 1em;
    font-weight: 600;
}

.button.rounded-button {
    border-radius: 50%;
    padding: 0.2em 0.2em;
}

.button.disabled {
    @apply pointer-events-none;
    background: $gray-300;
    border-color: $gray-300;
}

.button.disabled.only-border {
    color: $gray-300;
    border-color: $gray-300;
    background: transparent;
}

.small {
    font-size: 12px;
}

.medium {
    font-size: 14px;
}

.large {
    font-size: 16px;
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

.b-spinner {
    @apply inline-block w-[1.5em] h-[1.5em];
    animation: rotate 2s linear infinite;
}
.path {
    @apply stroke-current;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
}
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

</style>