<template>
  <div id="home">
    <Header :title="title" />
    <main>
      <b-container>
        <div class="row mt-5">
          <div class="col-lg-3 col-md-4 mb-5 filters mx-md-0 mx-4">
            <label class="mr-sm-2 h6" for="keywords">Filter By</label>
            <b-form-input
              id="keywords"
              v-model="filters.keywords"
              class="mb-4"
              onfocus="this.select()"
              type="text"
              name="filterKeywords"
              placeholder="Search by keywords"
              debounce="500"
            ></b-form-input>
            <label class="mr-sm-2" for="presenters">Presenters</label>
            <b-form-select
              id="presenters"
              v-model="filters.presenters"
              class="mb-4"
              name="presenters"
              @change="filterReset('presenters')"
            >
              <b-form-select-option value="">Show All</b-form-select-option>
              <b-form-select-option
                v-for="(presenter, index) in master.creators"
                :key="'presenters' + index"
                :value="presenter"
              >{{ presenter }}</b-form-select-option>
            </b-form-select>
            <label class="mr-sm-2" for="performers">Performers</label>
            <b-form-select
              id="performers"
              v-model="filters.performers"
              class="mb-4"
              name="performers"
              @change="filterReset('performers')"
            >
              <b-form-select-option value="">Show All</b-form-select-option>
              <b-form-select-option
                v-for="(performer, index) in master.contributors"
                :key="'performers' + index"
                :value="performer"
              >{{ performer }}</b-form-select-option>
            </b-form-select>
            <label class="mr-sm-2" for="years">Year</label>
            <b-form-select
              id="years"
              v-model="filters.years"
              class="mb-4"
              name="years"
              @change="filterReset('years')"
            >
              <b-form-select-option value="">Show All</b-form-select-option>
              <b-form-select-option
                v-for="(year, index) in master.years"
                :key="'years' + index"
                :value="year"
              >{{ year }}</b-form-select-option>
            </b-form-select>
            <div class="text-center">
              <b-button variant="red" @click="filterReset('none')">Reset Filters</b-button>
            </div>
          </div>
          <div class="col">
            <div v-if="filteredEvents.length >= 1" class="row">
              <div
                v-for="event in filteredEvents"
                :key="event.id"
                class="col-md-6 col-lg-4 pb-4 px-md-2 px-4"
              >
                <b-card class="h-100 mx-md-0 mx-4" no-body>
                  <b-card-img-lazy
                    v-if="event.media.poster"
                    :src="getImage(event, event.media.poster, '800_sq')"
                    :blank-src="getImage(event, event.media.poster, '10_sq')"
                    max-width="100%"
                    height="auto"
                    fluid-grow
                    fluid
                    :alt="event.name"
                    top
                  />
                  <b-card-img-lazy
                    v-else
                    src="~/assets/img/no-img.jpg"
                    max-width="100%"
                    height="auto"
                    fluid-grow
                    fluid
                    :alt="event.name"
                    top
                  />
                  <b-card-body>
                    <div class="d-flex flex-column align-items-start h-100">
                      <div class="mb-auto">
                        <h6>
                          <b-link
                            class="stretched-link d-none d-sm-inline"
                            :href="event.slug"
                            @click="openModal(event, $event)"
                          >{{ event.title }}</b-link>
                          <b-link
                            class="stretched-link d-inline d-sm-none"
                            :to="event.slug"
                          >{{ event.title }}</b-link>
                        </h6>
                        <b-card-text class="mt-4">
                          <em>
                            {{ join(event.contributors) }},
                            {{ join(event.creators) }}
                          </em>
                        </b-card-text>
                      </div>
                      <div class="d-flex w-100 justify-content-between mt-4">
                        <div class="text-left">
                          {{ event.year }}
                        </div>
                        <div class="text-right">
                          {{ event.location.details.city }}
                        </div>
                      </div>
                    </div>
                  </b-card-body>
                </b-card>
              </div>
            </div>
            <div v-else class="row">
              <div class="col">
                <h6 class="text-center pt-4">
                  There are no events that match the keyword: "{{
                    filters.keywords
                  }}".
                </h6>
              </div>
            </div>
          </div>
        </div>
      </b-container>
    </main>

    <b-modal
      v-if="modalState"
      id="modal"
      size="lg"
      hide-footer
      no-fade
      header-close-content=""
      @hide="hideModal"
    >
      <b-container class="mb-5">
        <h5 v-if="currentEvent.dates.length > 1" class="pb-2">
          <span
            v-for="(date, index) in currentEvent.dates"
            :key="'date' + index"
          >{{ date | moment('MMMM D, YYYY') }}</span>
        </h5>
        <h5 v-else class="pb-2">
          {{ currentEvent.dates[0] | moment('MMMM D, YYYY') }}
        </h5>
        <h2 class="pb-3">{{ currentEvent.title }}</h2>
        <p class="pre-wrap pb-4 font-italic">{{ currentEvent.description }}</p>
        <hr class="pb-1" />
        <div class="row">
          <div class="col px-1 px-sm-2">
            <audioplayer
              v-if="currentEvent.fileStream"
              ref="audioplayer"
              :audiofile="'/aud/' + currentEvent.fileStream"
              :waveform-filename="currentEvent.waveform"
              :event="currentEvent"
            />
          </div>
        </div>
        <div class="row pt-2">
          <div class="col-4 offset-sm-1 px-1 pb-2">
            <b-link :to="currentEvent.slug + '?image=poster'">
              <b-img-lazy
                v-if="currentEvent.media.poster"
                class="w-100"
                :src="
                  getImage(currentEvent, currentEvent.media.poster, '800_sq')
                "
                :blank-src="
                  getImage(currentEvent, currentEvent.media.poster, '10_sq')
                "
                fluid
                fluid-grow
              ></b-img-lazy>
            </b-link>
          </div>
          <div class="col-sm-6">
            <div v-if="currentEvent.media.images" class="row">
              <div
                v-for="(image, index) in currentEvent.media.images"
                :key="'image' + index"
                class="col-4 px-1 pb-2"
              >
                <b-link
                  v-if="index < 6"
                  :to="currentEvent.slug + '?image=' + index"
                >
                  <b-img-lazy
                    class="w-100"
                    :src="getImage(currentEvent, image, '800_sq')"
                    :blank-src="getImage(currentEvent, image, '10_sq')"
                    fluid
                    fluid-grow
                  ></b-img-lazy>
                </b-link>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-5">
          <b-link class="btn btn-red" :to="currentEvent.slug" role="button">More info</b-link>
        </div>
      </b-container>
    </b-modal>
    <Footer />
  </div>
</template>

<script>
import config from '@/nuxt.config.js'
import axios from 'axios'
import helpers from '@/mixins/helpers.js'
import Audioplayer from '@/components/Audioplayer'

export default {
  name: 'Home',
  components: {
    Audioplayer
  },
  mixins: [helpers],
  async asyncData({ params }) {
    const path = config.dev
      ? process.env.DEV_EVENTS_PATH_FILE
      : process.env.PROD_EVENTS_PATH_FILE
    // console.log(path)
    const { data } = await axios.get(path)
    return { events: data.events, master: data.master }
  },
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
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        // { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },
  computed: {
    currentEvent() {
      return this.$store.state.events.currentEvent
    },
    filteredEvents() {
      return this.events.filter(event => {
        const keywords = this.filters.keywords.toLowerCase()
        const presenters = this.filters.presenters.toLowerCase()
        // const years = this.filters.years.toLowerCase()
        const performers = this.filters.performers.toLowerCase()
        return (
          (event.title.toLowerCase().includes(keywords) ||
            this.join(event.creators).toLowerCase().includes(keywords) ||
            this.join(event.contributors).toLowerCase().includes(keywords) ||
            event.year.toLowerCase().includes(keywords) ||
            event.location.details.city
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036F]/g, '')
              .includes(keywords)) &&
          this.join(event.creators)
            .toLowerCase()
            .trim()
            .includes(presenters.trim()) &&
          this.join(event.contributors)
            .toLowerCase()
            .trim()
            .includes(performers.trim())
        )
      })
    }
  },
  methods: {
    getImage(data, image, size) {
      return require(`~/assets${data.media.path.img}${image.basename}-${size}${image.ext}`)
    },
    filterReset(exclude) {
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
    openModal(data, e) {
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
    hideModal() {
      this.modalState = false
      this.$refs.audioplayer.wavesurfer.destroy()
      this.$refs.audioplayer.audioDestroy()
    },
    updateCurrentEvent(val) {
      this.$store.commit('events/updateCurrentEvent', val)
    }
  }
}
</script>
<style lang="scss"></style>
