<template>
  <div id="audioplayer" class="container-audio">
    <div class="audio-play" @click="audioPlayPause">
      <span v-if="status === 'paused'" class="oi oi-media-play"></span>
      <span v-if="status === 'playing'" class="oi oi-media-pause"></span>
    </div>
    <div class="container-waveform">
      <div id="waveform" class="waveform"></div>
    </div>
    <div class="time-container">
      <span class="currentTime">{{ currentTime }}</span>
      <span class="timeslash">/</span>
      <span class="duration">{{ duration }}</span>
    </div>
  </div>
</template>
<script>
if (process.browser) {
  // eslint-disable-next-line no-var
  var WaveSurfer = require('wavesurfer.js')
}
export default {
  name: 'Audioplayer',
  props: {
    event: {
      type: Object,
      default: null
    },
    audiofile: {
      type: String,
      default: null
    },
    waveformFilename: {
      type: String,
      default: null
    },
    waveformdata: {
      type: String,
      default: null
    },
    audioHeight: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      status: 'paused',
      wavesurfer: null,
      currentTime: '00:00',
      duration: '00:00'
    }
  },
  computed: {},
  mounted() {
    this.audioInit()
  },
  methods: {
    audioInit() {
      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#f4f4f4',
        progressColor: '#df8028',
        cursorColor: '#df8028',
        barWidth: 1,
        normalize: true,
        height: this.audioHeight || 24,
        responsive: true,
        backend: 'MediaElement',
        closeAudioContext: true,
        partialRender: true
      })

      this.$nextTick(() => {
        if (this.audioHeight) {
          if (window.innerWidth < 992) {
            this.wavesurfer.setHeight(24)
          } else {
            this.wavesurfer.setHeight(this.audioHeight)
          }
          window.addEventListener('resize', () => {
            if (window.innerWidth < 992) {
              this.wavesurfer.setHeight(24)
            } else {
              this.wavesurfer.setHeight(this.audioHeight)
            }
          })
        }
      })

      this.loadWaveform()
      const wavesurfer = this.wavesurfer

      wavesurfer.on('play', () => {
        this.status = 'playing'
      })

      wavesurfer.on('pause', () => {
        this.status = 'paused'
      })

      wavesurfer.on('finish', () => {
        wavesurfer.seekTo(0)
        this.currentTime = this.$dayjs
          .duration(wavesurfer.getCurrentTime(), 'seconds')
          .format('mm:ss')
      })

      wavesurfer.on('ready', () => {
        this.duration = parseInt(this.wavesurfer.getDuration())
        if (this.duration / 60 < 60) {
          this.currentTime = this.$dayjs
            .duration(wavesurfer.getCurrentTime(), 'seconds')
            .format('mm:ss')
          this.duration = this.$dayjs
            .duration(wavesurfer.getDuration(), 'seconds')
            .format('mm:ss')
        } else {
          this.currentTime = this.$dayjs
            .duration(wavesurfer.getCurrentTime(), 'seconds')
            .format('HH:mm:ss')
          this.duration = this.$dayjs
            .duration(wavesurfer.getDuration(), 'seconds')
            .format('HH:mm:ss')
        }
      })
      wavesurfer.on('audioprocess', () => {
        this.duration = parseInt(wavesurfer.getDuration())
        if (this.duration / 60 < 60) {
          this.currentTime = this.$dayjs
            .duration(wavesurfer.getCurrentTime(), 'seconds')
            .format('mm:ss')
          this.duration = this.$dayjs
            .duration(wavesurfer.getDuration(), 'seconds')
            .format('mm:ss')
        } else {
          this.currentTime = this.$dayjs
            .duration(wavesurfer.getCurrentTime(), 'seconds')
            .format('HH:mm:ss')
          this.duration = this.$dayjs
            .duration(wavesurfer.getDuration(), 'seconds')
            .format('HH:mm:ss')
        }
      })
    },
    loadWaveform() {
      const waveform = require('../../static/waveforms/' + this.waveformFilename)
      const peaksArray = waveform.data
      this.wavesurfer.loadMediaElement(
        this.audiofile,
        peaksArray.map(p => p / 128),
        true,
        this.wavesurfer.getDuration()
      )
    },
    audioPlayPause() {
      this.wavesurfer.playPause()
    },
    audioDestroy() {
      this.wavesurfer.destroy()
      this.wavesurfer = null
    }
  }
}
</script>
<style lang="scss">
$headerHeight: 61px;
$black: #303030;
$white: #f4f4f4;
$red: #945043;
$red-faded: #94504385;
$orange: #df8028;
$dark-gray: #444c4c;
$border-dark-gray: #5f5f5f;
$light-gray: #cecece;

.container-audio {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  background: $red;
  padding: 10px;
  border-radius: 28px;
  position: relative;

  .audio-play {
    width: 36px;
    position: relative;
    height: 36px;
    margin-bottom: -36px;
    top: -3px;
    text-align: center;
    color: $red;
    background: $white;
    border-radius: 36px;

    .oi-media-play {
      display: block;
      top: 10px;
      left: 2px;
      font-size: 18px;
      position: relative;
    }
    .oi-media-pause {
      display: block;
      top: 10px;
      left: 0px;
      font-size: 18px;
      position: relative;
    }
  }
  .container-waveform {
    border-radius: 0px;
    margin-left: 55px;
    margin-top: -36px;
    background: transparent;
    padding: 3px;
    position: relative;

    .waveform {
      width: 78%;
      position: relative;
    }
  }
  .time-container {
    font-size: 13px;
    top: 15px;
    right: 20px;
    margin-top: 0px;
    text-align: right;
    display: inline-block;
    position: absolute;
    color: $white;
  }
}

@media (min-width: 992px) {

  .container-audio.size-lg {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    background: $red;
    padding: 15px;
    border-radius: 54px;
    position: relative;

    .audio-play {
      width: 54px;
      position: relative;
      height: 54px;
      margin-bottom: -54px;
      top: 2px;
      text-align: center;
      color: $red;
      background: $white;
      border-radius: 54px;

      .oi-media-play {
        display: block;
        top: 17px;
        left: 2px;
        font-size: 26px;
        position: relative;
      }

      .oi-media-pause {
        display: block;
        top: 17px;
        left: 0px;
        font-size: 26px;
        position: relative;
      }
    }
    .container-waveform {
      border-radius: 0px;
      margin-left: 75px;
      margin-top: -56px;
      background: transparent;
      padding: 3px;
      position: relative;

      .waveform {
        width: 76%;
        position: relative;
      }
    }

    .time-container {
      font-size: 18px;
      margin-top: 0px;
      text-align: right;
      display: inline-block;
      position: absolute;
      right: 30px;
      top: 28px;
      color: $white;
    }
  }
}

@media (max-width: 1200px) {
  .container-audio.size-lg .container-waveform .waveform {
    width: 74%;
  }
}

@media (max-width: 1024px) {
  .waveform {
    width: 70%;
    position: relative;
  }
  .modal {
    .timeslash, .duration {
      display: none;
    }
  }
}
@media (max-width: 885px) {
  .waveform {
    width: 60%;
    position: relative;
  }
}

@media (max-width: 768px) {
  .container-audio {
    .container-waveform {
      margin-left: 45px;

      .waveform {
        width: 60%;
        position: relative;
      }
    }

    .time-container {
      right: 12px;

      .timeslash, .duration {
        display: none;
      }
    }
  }
}

@media (max-width: 576px) {
  .waveform {
    width: 50%;
  }
}
@media (max-width: 460px) {
  span.hyphen {
    display: inline!important;
  }
}
</style>
