<template>
  <button type="button"
          :class="['py-2','px-4','border','border-transparent',
          'shadow-sm','text-sm','font-medium','rounded-md','text-white','focus:outline-none',
          'focus:ring-2','focus:ring-offset-2',`${type}`,{'disabled':disabled}]"
          :disabled="disabled">
    <slot/>
  </button>
</template>

<script lang="ts" setup>
import {computed, toRef} from "vue";

const props = withDefaults(defineProps<{
  type?: "normal" | "success" | "warning" | "info";
  disabled?: boolean
}>(), {
  type: 'normal',
  disabled: false
});
const disabled = toRef(props, 'disabled')

const type = computed<string>(() => {
  switch (props.type) {
    case 'success':
      return 'green'
    case 'warning':
      return 'red'
    case 'info':
      return 'blue'
    default:
      return 'gray'
  }
})


</script>

<style scoped lang="less">
.green {
  background: #059669;

  &:hover {
    background: #047857;
  }

  &:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgb(34 197 94 / var(--tw-ring-opacity));
  }
}

.red {
  background: #ef4444;

  &:hover {
    background: #b91c1c;
  }

  &:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: #ef4444;
  }
}

.gray {
  background: #6b7280;

  &:hover {
    background: #374151;
  }

  &:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: #6b7280;
  }
}

.blue {
  background: #3b82f6;

  &:hover {
    background: #1d4ed8;
  }

  &:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: #3b82f6;
  }
}

.disabled {
  cursor: not-allowed;
}
</style>
