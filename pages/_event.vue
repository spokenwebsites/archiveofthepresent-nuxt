<template lang="pug">
#event
  Header(:title="event.title")
  main
    b-container.page-content.mb-5
      .row
        .col-sm-10.offset-sm-1
          h5.pb-2.pt-4(v-if="event.dates.length > 1")
            span(v-for="(date, index) in event.dates" :key="'date'+index") {{ date | moment("MMMM D, YYYY") }}
          h5.pb-2.pt-4(v-else) {{ event.dates[0] | moment("MMMM D, YYYY") }}
          h1.pb-4 {{ event.title }}

          h6.pt-3 Audio

          audioplayer.size-lg(ref="audioplayer", :audiofile="'/aud/'+event.fileStream", :waveformFilename="event.waveform", :event="event", :audioHeight="54")

          h6.py-3 Details

          p.mb-4
            strong Presenters
            br
            | {{ join(event.creators) }}
          p.mb-4
            strong Performers
            br
            | {{ join(event.contributors) }}
          p.mb-4
            strong Venue
            br
            | {{ event.venue }}
          p.mb-4
            strong Location
            br
            | {{ event.location.details.city }}, {{ event.location.details.state }}
          p.mb-4.pb-4
            strong Description
            br
            | {{ event.description }}

          hr

          .pt-4(v-if="event.media.poster")
            h6.py-4 Event Poster

            b-link(id="modalLinkposter", @click="openModal(event, event.media.poster, 'poster', $event)")
              b-img-lazy(:src="getImage(event, event.media.poster, '800_sq')", :blank-src="getImage(event, event.media.poster, '10_sq')", rounded="circle", width="200")

          .py-5
            h6.pt-4 Additional Materials

              .row.pt-4.px-2
                .col-2.px-1.pb-2(v-if="event.media.images" v-for="(image, index) in event.media.images" :key="'image'+index")
                  b-link(:id="'modalLink'+index", @click="openModal(event, image, 'image', $event)")
                    b-img-lazy.w-100(:src="getImage(event, image, '800_sq')", :blank-src="getImage(event, image, '10_sq')")

  b-modal(id="modal", size="lg", no-fade, hide-footer, v-if="modalState", @hide="hideModal", headerCloseContent="")

    b-container.mb-5
      h6 {{ modalTitle }}
      b-img-lazy.mt-2.mb-5.w-100(:src="modalImg.lg", :blank-src="modalImg.sm")
      h5.mb-4
        strong {{ modalData.title }}
      p.mb-1
        em {{ modalData.caption }}
      p
        strong {{ modalData.credits }}
      p.text-right
        strong
          a(v-if="modalPdf", :href="modalPdf", target="_blank") Download PDF
  Footer
</template>

<script>
import config from '@/nuxt.config.js'
import axios from 'axios'
import eventMixins from '@/mixins/eventMixins.js'
import Audioplayer from '@/components/Audioplayer'

export default {
  async asyncData ({ params }) {
    const path = config.dev ? process.env.DEV_EVENTS_PATH_FILE + params.event : process.env.PROD_EVENTS_PATH_FILE + params.event
    console.log(path)
    const { data } = await axios.get(path)
    return { event: data.event }
  },
  name: 'Event',
  data: () => ({
    modalState: false,
    modalData: null,
    modalTitle: null,
    modalImg: {},
    modalPdf: null
  }),
  head () {
    return {
      title: this.event.title,
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
    console.log(this.event)
    this.$nextTick(() => {
      this.$refs.audioplayer.audioInit()
    })
    if (this.$route.query.image) {
      const modalLink = 'modalLink' + this.$route.query.image
      document.querySelector('#' + modalLink).click()
    }
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
    getPdf (data, image) {
      return require(`~/assets${data.media.path.img}${image.basename}.pdf`)
    },
    openModal (data, image, type, e) {
      e.preventDefault()
      if (type === 'poster') {
        this.modalTitle = 'Event Poster'
      } else {
        this.modalTitle = 'Additional Materials'
      }
      this.modalImg.lg = this.getImage(data, image, '800')
      this.modalImg.sm = this.getImage(data, image, '10')
      if (image.pdf) this.modalPdf = this.getPdf(data, image)

      this.modalData = image
      this.modalState = true
      this.$nextTick(() => {
        this.$bvModal.show('modal')
      })
      history.pushState('', '', '/' + this.event.slug)
    },

    hideModal () {
      this.modalState = false
      this.modalData = null
      this.modalTitle = null
      this.modalImg.lg = null
      this.modalImg.sm = null
      this.modalPdf = null
    }

  },

  computed: {

  },

  created () {
  }
}
</script>

<style lang="sass">
</style>
