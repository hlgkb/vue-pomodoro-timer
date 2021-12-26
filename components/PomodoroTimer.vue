<template>
  <div class="timer">
    <h2 class="timer__title">
      {{ projectTitle }}
    </h2>
    <h3 class="timer__label">
      {{ stage }}
    </h3>
    <h1 class="timer__time">
      {{ timerString }}
    </h1>
    <div class="timer__controls">
      <TimerButton variant="large" aria-label="Start Timer" @click.native="start">
        <svg v-if="termRunning === false" role="img" viewBox="0 0 448 512">
          <path
            fill="currentColor"
            d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
          />
        </svg>
        <svg v-else role="img" viewBox="0 0 448 512">
          <path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z" />
        </svg>
      </TimerButton>
      <TimerButton variant="large" aria-label="Reset Timer" @click.native="reset">
        <svg role="img" viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"
          />
        </svg>
      </TimerButton>
      <audio ref="notification" src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" preload="auto" />
    </div>
    <div class="timer__session-controls">
      <SessionControls v-model="breakLength" :disabled="termRunning">
        Break Length
      </SessionControls>
      <SessionControls v-model="sessionLength" :disabled="termRunning">
        Session Length
      </SessionControls>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Timer } from '@/utils/Timer'
import { calculateValue } from '@/utils/utils'
export default Vue.extend({
  name: 'PomodoroTimer',
  props: {
    projectTitle: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      breakLength: 5,
      sessionLength: 25,
      stage: 'Session',
      termRunning: false,
      isRunning: false,
      isPaused: false,
      timer: new Timer(0),
      timerString: '25:00'
    }
  },
  head () {
    const data = this.$data
    return {
      title: (data.termRunning) ? `[${data.stage}] - ${data.timerString}` : this.projectTitle
    }
  },
  computed: {
    notification () {
      return this.$refs.notification as HTMLAudioElement
    }
  },
  watch: {
    sessionLength: {
      handler (length:number) {
        if (this.stage.toLowerCase() === 'session') {
          this.handleChangeOnPause(length)
        }
      },
      immediate: true
    },
    breakLength: {
      handler (length:number) {
        if (this.stage.toLowerCase() === 'break') {
          this.handleChangeOnPause(length)
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.setUpTimerEvents()
  },
  beforeDestroy () {
    this.timer.removeAllEvents()
  },
  methods: {
    setUpTimerEvents () {
      this.timer.on('started', this.handleStart)
      this.timer.on('update', this.handleUpdate)
      this.timer.on('paused', this.handlePaused)
      this.timer.on('completed', this.handleCompleted)
      this.timer.on('stopped', this.handleStopped)
    },
    handleChangeOnPause (length:number) {
      this.timerString = calculateValue(length * 60)
      if (this.isPaused) {
        this.timer.setTarget(length)
      }
    },
    handleCompleted () {
      if (this.stage.toLowerCase() === 'session') {
        this.stage = 'Break'
        this.timer.setTarget(this.breakLength)
      } else {
        this.stage = 'Session'
        this.timer.setTarget(this.sessionLength)
      }
      if (this.notification) {
        this.notification.play()
      }
      this.timer.start()
    },
    handleStart () {
      this.isPaused = false
      this.isRunning = true
    },
    handleUpdate (value:string) {
      this.timerString = value
    },
    handlePaused () {
      this.isRunning = false
      this.isPaused = true
      this.termRunning = false
    },
    handleStopped () {
      this.resetDatas()
    },
    resetDatas () {
      this.breakLength = 5
      this.sessionLength = 25
      this.stage = 'session'
      this.termRunning = false
      this.isRunning = false
      this.timerString = calculateValue(this.sessionLength * 60)
    },
    reset () {
      this.timer.stop()
    },
    start () {
      if (this.termRunning === true) {
        this.timer.pause()
      } else if (this.isPaused === true) {
        this.timer.start()
        this.termRunning = true
      } else {
        this.timer = new Timer(this.sessionLength)
        this.setUpTimerEvents()
        this.timer.start()
        this.termRunning = true
      }
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
    text-transform: capitalize;
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
