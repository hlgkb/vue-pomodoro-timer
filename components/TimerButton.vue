<template>
  <button class="button" :class="`button--${variant}`">
    <slot />
  </button>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'TimerButton',
  props: {
    variant: {
      type: String,
      default: 'small',
      validator: variant => ['large', 'small', 'control'].includes(variant)
    }
  }
})
</script>
<style lang="scss" scoped>
.button {
  --height: 36px;
  --box-shadow-color: rgba(241, 51, 69, 0.0470588);
  appearance: none;
  background: transparent;
  border-radius: 50%;
  height: var(--oh, var(--height));
  width: var(--oh, var(--height));
  border: 0;
  outline: 0;
  color: #f13346;
  margin: 7px;
  background-color: #ffffff;
  padding: 10px 12px;
  box-shadow: 0 2.8px 2.2px var(--box-shadow-color),
    0 6.7px 5.3px var(--box-shadow-color), 0 12.5px 10px var(--box-shadow-color),
    0 22.3px 17.9px var(--box-shadow-color),
    -2px 17px 33.4px var(--box-shadow-color),
    1px 7px 20px 2px var(--box-shadow-color);

  svg {
    width: 12px;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  &--large {
    --oh: 57px;
    padding: 20px 22px;
    svg {
      width: 14px;
    }
  }

  &--control {
    &:disabled {
      color: grey;
      box-shadow: none;
    }
  }
}
</style>
