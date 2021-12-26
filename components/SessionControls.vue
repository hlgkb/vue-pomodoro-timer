<template>
  <div class="duration">
    <span class="duration__label">
      <slot />
    </span>
    <div class="duration__controls">
      <TimerButton variant="control" :disabled="minusDisabled" @click.native="adjust(false)">
        <svg role="img" viewBox="0 0 448 512">
          <path
            fill="currentColor"
            d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
          />
        </svg>
      </TimerButton>
      <p class="duration__length">
        {{ value }}
      </p>
      <TimerButton variant="control" :disabled="plusDisabled" @click.native="adjust">
        <svg role="img" viewBox="0 0 448 512">
          <path
            fill="currentColor"
            d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
          />
        </svg>
      </TimerButton>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SessionControls',
  props: {
    value: {
      type: Number,
      default: 5,
      validator: value => value > 0 && value <= 60
    }
  },
  data () {
    return {
      min: 1,
      max: 60
    }
  },
  computed: {
    plusDisabled () {
      return (this.$attrs.disabled) || this.value === 60
    },
    minusDisabled () {
      return (this.$attrs.disabled) || this.value === 1
    }
  },
  methods: {
    adjust (increment = true) {
      let current = this.value
      if (increment) {
        current = current + 1
        if (current > this.max) {
          current = this.max
        }
      } else {
        current = current - 1
        if (current < this.min) {
          current = this.min
        }
      }
      if (current !== this.value) {
        this.$emit('input', current)
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.duration {
  flex-direction: column;
  &,
  &__controls {
    display: flex;
    align-items: center;
  }
  &__label {
    font-weight: 600;
  }
  &__controls {
    text-align: center;
    justify-content: space-between;
  }
  &__length {
    font-size: 26px;
    line-height: 1;
    font-weight: 400;
    padding: 0 10px;
    min-width: 27px;
    margin: 26px 0px;
    min-width: 47px;
  }
}
</style>
