<template lang="pug">
#home
  Header(:title="title")
  main
    b-container
      .row.mt-5
        .col-lg-3.col-md-4.mb-5.filters.mx-md-0mx-4
          label.mr-sm-2.h6(for="keywords") Filter By
          b-form-input.mb-4(v-model="filters.keywords" onfocus="this.select()", type="text", id="keywords", name="filterKeywords", placeholder="Search by keywords", debounce="500")

          label.mr-sm-2(for="presenters") Presenters
          b-form-select.mb-4(v-model="filters.presenters", name="presenters", id="presenters", @change="filterReset('presenters')")
            b-form-select-option(value='') Show All
            b-form-select-option(v-for="(presenter, index) in master.creators" :key="'presenters'+index" :value="presenter") {{ presenter }}

          label.mr-sm-2(for="performers") Performers
          b-form-select.mb-4(v-model="filters.performers", name="performers", id="performers", @change="filterReset('performers')")
            b-form-select-option(value='') Show All
            b-form-select-option(v-for="(performer, index) in master.contributors" :key="'performers'+index" :value="performer") {{ performer }}

          label.mr-sm-2(for="years") Year
          b-form-select.mb-4(v-model="filters.years", name="years", id="years", @change="filterReset('years')")
            b-form-select-option(value='') Show All
            b-form-select-option(v-for="(year, index) in master.years" :key="'years'+index" :value="year") {{ year }}

          .text-center
            b-button(variant="red", @click="filterReset('none')") Reset Filters

        .col
          .row(v-if="filteredEvents.length>=1")
            .col-md-6.col-lg-4.pb-4.px-md-2.px-4(v-for="(event, index) in filteredEvents" :key="event.id")
              b-card.h-100(no-body).mx-md-0.mx-4
                b-card-img-lazy(v-if="event.media.poster", :src="getImage(event, event.media.poster, '800_sq')", :blank-src="getImage(event, event.media.poster, '10_sq')", max-width="100%", height="auto", fluid-grow, fluid, :alt="event.name", top)
                b-card-img-lazy(v-else, src="~/assets/img/no-img.jpg", max-width="100%", height="auto", fluid-grow, fluid, :alt="event.name", top)
                b-card-body
                  div.d-flex.flex-column.align-items-start.h-100
                    .mb-auto
                      h6
                        b-link.stretched-link.d-none.d-sm-inline(:href="event.slug", @click="openModal(event, $event)") {{ event.title }}
                        b-link.stretched-link.d-inline.d-sm-none(:to="event.slug") {{ event.title }}
                      b-card-text.mt-4 #[em {{ join(event.contributors) }}, {{ join(event.creators) }}]
                    .d-flex.w-100.justify-content-between.mt-4
                      div.text-left {{ event.year }}
                      div.text-right {{ event.location.details.city }}
          .row(v-else)
            .col
              h6.text-center.pt-4 There are no events that match the keyword: "{{filters.keywords}}".

  b-modal(id="modal", size="lg", hide-footer, no-fade, v-if="modalState", @hide="hideModal", headerCloseContent="")
    b-container.mb-5
      h5.pb-2(v-if="currentEvent.dates.length > 1")
        span(v-for="(date, index) in currentEvent.dates" :key="'date'+index") {{ date | moment("MMMM D, YYYY") }}
      h5.pb-2(v-else) {{ currentEvent.dates[0] | moment("MMMM D, YYYY") }}
      h2.pb-3 {{ currentEvent.title }}
      p.pre-wrap.pb-4.font-italic {{ currentEvent.description }}
      hr.pb-1
      .row
        .col.px-1.px-sm-2
          audioplayer(v-if="currentEvent.fileStream", ref="audioplayer", :audiofile="'/aud/'+currentEvent.fileStream", :waveformFilename="currentEvent.waveform", :event="currentEvent")

      .row.pt-2
        .col-4.offset-sm-1.px-1.pb-2
          b-link(:to="currentEvent.slug+'?image=poster'")
            b-img-lazy.w-100(v-if="currentEvent.media.poster" :src="getImage(currentEvent, currentEvent.media.poster, '800_sq')", :blank-src="getImage(currentEvent, currentEvent.media.poster, '10_sq')", fluid, fluid-grow)
        .col-sm-6

          .row
            .col-4.px-1.pb-2(v-if="currentEvent.media.images && index < 6" v-for="(image, index) in currentEvent.media.images" :key="'image'+index")
              b-link(:to="currentEvent.slug+'?image='+index")
                b-img-lazy.w-100(:src="getImage(currentEvent, image,'800_sq')", :blank-src="getImage(currentEvent, image, '10_sq')", fluid, fluid-grow)

      .text-center.mt-5
        b-link.btn.btn-red(:to="currentEvent.slug", role="button") More info
  Footer
</template>

<script>
import config from '@/nuxt.config.js'
import axios from 'axios'
import eventMixins from '@/mixins/eventMixins.js'
import Audioplayer from '@/components/Audioplayer'

export default {
  async asyncData ({ params }) {
    const path = config.dev ? process.env.DEV_EVENTS_PATH_FILE : process.env.PROD_EVENTS_PATH_FILE
    console.log(path)
    const { data } = await axios.get(path)
    return { events: data.events, master: data.master }
  },
  name: 'Home',
  data: () => ({
    title: 'Home',
    filters: {
      keywords: '',
      presenters: '',
      performers: '',
      years: ''
    },
    modalState: false
  }),
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        // { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },
  components: {
    Audioplayer
  },
  mounted () {

  },
  mixins: [
    eventMixins
  ],
  methods: {
    getImage (data, image, size) {
      return require(`~/assets${data.media.path.img}${image.basename}-${size}${image.ext}`)
      // if (config.dev) {
      //   return data.media.host + data.media.path.img + image.basename + '-' + size + image.ext
      // } else {
      //   return require(`~/assets${data.media.path.img}${image.basename}-${size}${image.ext}`)
      // }
    },

    filterReset (exclude) {
      if (exclude === 'performers') {
        this.filters.presenters = ''
        this.filters.years = ''
      } else if (exclude === 'presenters') {
        this.filters.performers = ''
        this.filters.years = ''
      } else if (exclude === 'years') {
        this.filters.performers = ''
        this.filters.presenters = ''
      } else {
        this.filters.keywords = ''
        this.filters.performers = ''
        this.filters.presenters = ''
        this.filters.years = ''
      }
    },

    openModal (data, e) {
      e.preventDefault()
      this.modalState = true
      this.updateCurrentEvent(data)
      this.$nextTick(() => {
        this.$bvModal.show('modal')
        this.$nextTick(() => {
          this.$refs.audioplayer.audioInit()
        })
      })
    },

    hideModal () {
      this.modalState = false
      this.$refs.audioplayer.wavesurfer.destroy()
      this.$refs.audioplayer.audioDestroy()
    },

    updateCurrentEvent (val) {
      this.$store.commit('events/updateCurrentEvent', val)
    }

  },

  computed: {

    currentEvent () {
      return this.$store.state.events.currentEvent
    },

    filteredEvents () {
      return this.events.filter(event => {
        const keywords = this.filters.keywords.toLowerCase()
        const presenters = this.filters.presenters.toLowerCase()
        const years = this.filters.years.toLowerCase()
        const performers = this.filters.performers.toLowerCase()
        return (event.title.toLowerCase().includes(keywords) || this.join(event.creators).toLowerCase().includes(keywords) || this.join(event.contributors).toLowerCase().includes(keywords) || event.year.toLowerCase().includes(keywords) || event.location.details.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(keywords)) && (this.join(event.creators).toLowerCase().trim().includes(presenters.trim())) && (this.join(event.contributors).toLowerCase().trim().includes(performers.trim()))
      })
    }

  },

  created () {
  }
}
</script>

<style lang="sass">
</style>
