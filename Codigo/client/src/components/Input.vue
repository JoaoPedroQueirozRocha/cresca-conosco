<script>
import { ref } from 'vue';

export default {
    name: 'Input',
    props: {
        modelValue: [String, Number],
        type: {
            type: String,
            default: 'text'
        },
        label: String,
        placeholder: String,
        errorMessage: String,
        disabled: Boolean,
        isError: Boolean,
        textArea: Boolean,
    },
    emits: ['update:modelValue', 'blur'],
    setup() {
        return {
            hidePass: ref(true),
            onFocus: ref(false),
            error: ref(false),
            model: ref(),
        }
    },

    created() {
        this.model = this.modelValue;
    },

    watch: {
        modelValue() {
            this.model = this.modelValue
        }
    },

    methods: {
        isEmail() {
            this.error = !(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.model));
        },
        resetModel() {
            this.model = '';
            this.$emit('update:modelValue', this.model);
        },
        focusout() {
            setTimeout(() => {
                this.onFocus = false;
            }, 100);
        }
    }
}
</script>

<template>
    <div class="holder">
        <label v-if="label" class="label">{{ label }}</label>
        <div tabindex="0"  class="input-holder" v-if="!textArea">
            <span
                v-if="type === 'search'"
                class="material-symbols-rounded search-icon icon"
                :class="{'on-focus': onFocus}"
            >
                search
            </span>
            <input
                class="input"
                :class="[type, {'disabled': disabled, 'error': isError || error}]"
                v-model="model"
                :placeholder="placeholder"
                :disabled="disabled"
                :type="(type === 'password' && !hidePass) || type === 'email' ? 'text': type"
                :value="model"
                @focusin="onFocus = true"
                @focusout="focusout"
                @input="() => {
                    if (type === 'email') {
                        isEmail();
                    }
                    $emit('update:modelValue', this.model);
                }"
                @blur="$emit('blur')"
            />
            <span
                v-if="type === 'password'"
                class="material-symbols-rounded eye icon"
                :class="{'on-focus': onFocus}"
                @click="hidePass = !hidePass"
            >
                {{ hidePass ? 'visibility_off' : 'visibility' }}
            </span>
            <span
                v-if="type === 'search' && onFocus"
                class="material-symbols-rounded eye icon on-focus"
                @click="resetModel"
            >
                close
            </span>
        </div>
        <textarea 
            v-else
            class="input"
            :class="{'disabled': disabled, 'error': isError}"
            :placeholder="placeholder"
            :disabled="disabled"
            v-model="model"
            @input="() => { $emit('update:modelValue', this.model) }"
            @blur="$emit('blur')"
        />
        <div v-if="isError || error" class="error-message">
            {{ errorMessage }}
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "../style/var.scss";

.holder {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    height: fit-content;
    width: 100%;
}

.input-holder {
    position: relative;
}

.label {
    color: $green-dark;
    font-weight: 600;
}

.input {
    width: 100%;
    height: 2.5em;
    border-radius: 8px;
    border: 0.15em $gray-300 solid;
    padding: 0.5em;
    color: $gray-500;

    &::placeholder {
        color: $gray-400;
    }

    &:focus {
        outline: none;
        box-shadow: none;
        border-color: $blue-light;
    }
}

.password {
    padding-right: 2.3em;
}

.search {
    padding-left: 2.3em;
    padding-right: 2.3em;
}

.input.disabled {
    @apply pointer-events-none;
    color: $gray-300;
    border-color: $gray-300;
    background: $gray-200;
}

.error {
    color: $red-strong;
    border-color: $red-strong;
    background: $red-light;

    &:focus {
        border-color: $red-strong;
    }
}

.icon {
    position: absolute;
    top: 50%;
    color: $gray-500;
    transform: translateY(-50%);
}

.icon.on-focus {
    color: $blue-light;
}

.search-icon {
    left: 0.5em;
}

.eye {
    right: 0.5em;
    cursor: pointer;
}

.error-message {
    color: $red-strong;
    font-size: 14px;
}
</style>