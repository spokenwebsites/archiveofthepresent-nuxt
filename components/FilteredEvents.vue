<template>
  <div>
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
                    @click.prevent="openEventModal(event)"
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
</template>

<script>
import helpers from '@/mixins/helpers.js'
import filters from '@/mixins/filters.js'
import events from '@/mixins/events.js'
import modals from '@/mixins/modals.js'

export default {
  mixins: [helpers, filters, events, modals],
  props: {
    events: {
      type: Array,
      default: null
    }
  }
}
</script>
