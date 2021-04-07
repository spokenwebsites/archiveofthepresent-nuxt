import helpers from '@/mixins/helpers.js'

export default {
  mixins: [helpers],
  computed: {
    images() {
      return this.event.media ? this.event.media.images : null
    },
    featured() {
      return this.event.media ? this.event.media.featured : null
    },
    featuredImage() {
      return this.featured && this.featured.image && this.featured.image[0]
        ? this.featured.image[0]
        : this.images && this.images[0]
          ? this.images[0]
          : null
    },
    posters() {
      return this.event.media ? this.event.media.posters : null
    },
    poster() {
      return this.posters[0]
    },
    hasPoster() {
      return this.posters && this.posters.length
    },
    photos() {
      return this.event.media ? this.event.media.photos : null
    },
    hasPhoto() {
      return this.photos && this.photos.length
    },
    documents() {
      return this.media ? this.event.media.documents : null
    },
    hasDocument() {
      return this.documents && this.documents.length
    },
    hasImage() {
      return (this.images && this.images.length) || this.featuredImage
    },
    additionalMaterials() {
      return this.hasPoster ? this.images.length > 1 : this.hasImage
    },
    audio() {
      return this.event.media ? this.event.media.audio : null
    },
    featuredAudio() {
      return this.featured && this.featured.audio && this.featured.audio[0]
        ? this.featured.audio[0]
        : this.audio && this.audio[0]
          ? this.audio[0]
          : null
    },
    videos() {
      return this.event.media ? this.event.media.videos : null
    },
    featuredVideo() {
      return this.featured && this.featured.video && this.featured.video[0]
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
    mainGroup() {
      const main = []
      if (this.presentersGroup) {
        main.push(this.presentersGroup)
      }
      if (this.performersGroup) {
        main.push(this.performersGroup)
      }
      if (this.speakersGroup) {
        main.push(this.speakersGroup)
      }
      return main.join(', ')
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
