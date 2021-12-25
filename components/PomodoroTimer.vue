<template>
  <div class="timer">
    <h2 class="timer__title">
      Vue Pomodoro Timer
    </h2>
    <h3 class="timer__label">
      Session
    </h3>
    <h1 class="timer__time">
      25:00
    </h1>
    <div class="timer__controls">
      <TimerButton variant="large">
        <svg role="img" viewBox="0 0 448 512">
          <path
            fill="currentColor"
            d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
          />
        </svg>
      </TimerButton>
      <TimerButton variant="large">
        <svg role="img" viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"
          />
        </svg>
      </TimerButton>
    </div>
    <div class="timer__session-controls">
      <SessionControls v-model="breakLength" />
      <SessionControls v-model="sessionLength">
        Session Length
      </SessionControls>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PomodoroTimer',
  data () {
    return {
      breakLength: 5,
      sessionLength: 25
    }
  }
})
</script>
<style lang="scss" scoped>
.timer {
  --min-width: 350px;

  display: flex;
  color: #f13346;
  padding: 40px 32px;
  align-items: center;
  border-radius: 50px;
  background: #ffffff;
  flex-direction: column;
  justify-content: center;
  min-width: var(--mw, var(--min-width));
  &__label,
  &__time {
    color: #ffffff;
    position: relative;
  }
  &__title {
    margin-top: 12px;
    margin-bottom: 36px;
    font-size: 24px;
    font-weight: 700;
  }

  &__label {
    z-index: 3;
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 15px;
  }

  &__time {
    margin-bottom: 15px;
    font-size: 50px;
    font-weight: 400;
    z-index: 1;
    &::after {
      content: "";
      top: 50%;
      left: 50%;
      z-index: -1;
      width: 180px;
      height: 180px;
      display: block;
      border-radius: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      background: linear-gradient(
        90deg,
        var(--background-gredient-start),
        var(--background-gredient-stop)
      );
    }
  }
  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 3;
    margin-bottom: 32px;
  }
  &__session-controls {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  @media screen and (min-width: 450px) {
    --mw: 414px;
  }
}
</style>
