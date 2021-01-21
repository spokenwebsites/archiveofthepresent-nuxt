import helpers from '@/mixins/helpers.js'

export default {
  mixins: [helpers],
  computed: {
    images() {
      return this.event.media.images
    },
    featured() {
      return this.event.media.featured
    },
    featuredImage() {
      return this.featured.image && this.featured.image[0]
        ? this.featured.image[0]
        : this.images && this.images[0]
          ? this.images[0]
          : null
    },
    posters() {
      return this.event.media.posters
    },
    poster() {
      return this.event.media.posters[0]
    },
    hasPoster() {
      return this.posters.length
    },
    photos() {
      return this.event.media.photos
    },
    hasPhoto() {
      return this.photos.length
    },
    documents() {
      return this.event.media.documents
    },
    hasDocument() {
      return this.documents.length
    },
    hasImage() {
      return this.images.length || this.featuredImage
    },
    additionalMaterials() {
      return this.hasPoster ? this.images.length > 1 : this.hasImage
    },
    audio() {
      return this.event.media.audio
    },
    featuredAudio() {
      return this.featured.audio && this.featured.audio[0]
        ? this.featured.audio[0]
        : this.audio && this.audio[0]
          ? this.audio[0]
          : null
    },
    videos() {
      return this.event.media.videos
    },
    featuredVideo() {
      return this.featured.video && this.featured.video[0]
        ? this.featured.video[0]
        : this.videos && this.videos[0]
          ? this.videos[0]
          : null
    },
    eventTitle() {
      return this.event.title
    },
    slug() {
      return this.event.slug
    },
    creators() {
      return this.event.creators.length ? this.event.creators : null
    },
    creatorsGroup() {
      return this.joinNames(this.creators)
    },
    contributors() {
      return this.event.contributors.length ? this.event.contributors : null
    },
    contributorsGroup() {
      return this.joinNames(this.contributors)
    },
    presenters() {
      return this.event.presenters.length ? this.event.presenters : null
    },
    presentersGroup() {
      return this.joinNames(this.presenters)
    },
    performers() {
      return this.event.performers.length ? this.event.performers : null
    },
    performersGroup() {
      return this.joinNames(this.performers)
    },
    speakers() {
      return this.event.speakers.length ? this.event.speakers : null
    },
    speakersGroup() {
      return this.joinNames(this.speakers)
    },
    seriesOrganizers() {
      return this.event.seriesOrganizers.length ? this.event.seriesOrganizers : null
    },
    seriesOrganizersGroup() {
      return this.joinNames(this.seriesOrganizers)
    },
    venue() {
      return this.event.venue
    },
    description() {
      return this.event.description
    },
    year() {
      return this.event.year
    },
    locationDetails() {
      return this.event.location.details
    },
    town() {
      return this.locationDetails.town
    },
    city() {
      return this.locationDetails.city
    },
    state() {
      return this.locationDetails.state
    }
  }
}
