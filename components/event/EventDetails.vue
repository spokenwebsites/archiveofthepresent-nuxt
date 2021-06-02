<template>
  <DetailsBin :details="eventDetails" />
</template>

<script>
import sanitizeHtml from 'sanitize-html'
import event from '@/mixins/event.js'
import DetailsBin from '@/components/shared/DetailsBin'

export default {
  components: { DetailsBin },
  mixins: [event],
  computed: {
    event() {
      return this.$store.state.event.event
    },
    eventDetails() {
      return [
        {
          title: 'Presenters',
          detail: this.presentersGroup
        },
        {
          title: 'Performers',
          detail: this.performersGroup
        },
        {
          title: 'Speakers',
          detail: this.speakersGroup
        },
        {
          title: 'Series Organizer',
          detail: this.seriesOrganizersGroup
        },
        {
          title: 'Venue',
          detail: this.venue
        },
        {
          title: 'Location',
          detail: `${this.city || this.town}, ${this.state}`
        },
        {
          title: 'Description',
          detail: sanitizeHtml(this.description)
        }
      ]
    }
  }
}
</script>
