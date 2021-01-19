<template>
  <div>
    <b-card class="h-100 mx-md-0 mx-4" no-body>
      <b-card-img-lazy
        v-if="featuredImage"
        :src="getImage(featuredImage, '800_sq')"
        :blank-src="getImage(featuredImage, '10_sq')"
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
                @click.prevent="openEventModal(event)"
              >{{ event.title }}</b-link>
              <b-link
                class="stretched-link d-inline d-sm-none"
                :to="event.slug"
              >{{ event.title }}</b-link>
            </h6>
            <b-card-text class="mt-4">
              <em v-if="creators">{{ joinNames(creators) }}, </em>
              <em v-if="contributors">{{ joinNames(contributors) }}</em>
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
</template>

<script>
import helpers from '@/mixins/helpers.js'
import media from '@/mixins/media.js'
import event from '@/mixins/event.js'
import modals from '@/mixins/modals.js'

export default {
  mixins: [helpers, media, event, modals],
  props: {
    event: {
      type: Object,
      default: null
    }
  },
  computed: {
    contributors() {
      return this.event.contributors.length ? this.event.contributors : null
    },
    creators() {
      return this.event.creators.length ? this.event.creators : null
    },
    presenters() {
      return this.event.presenters.length ? this.event.presenters : null
    },
    seriesOrganizers() {
      return this.event.seriesOrganizers.length ? this.event.seriesOrganizers : null
    },
    speakers() {
      return this.event.speakers.length ? this.event.speakers : null
    },
    performers() {
      return this.event.performers.length ? this.event.performers : null
    }
  }
}
</script>
<style lang="scss"></style>
