<template>
  <div id="about">
    <Header :title="title" />
    <main>
      <b-container class="page-content mb-5">
        <div class="row">
          <div class="col-sm-8 offset-sm-2 mb-5">
            <h6 class="pt-4">About</h6>
            <h1 class="pb-3 pt-3">About Archive <br>of the Present</h1>
            <p class="pb-4">Archive of the Present presents digital sound recordings, video, and print materials that document SpokenWeb events produced across the research network. The events documented range from the early "Performing the Archive" performances and SpokenWeb conferences held from 2010-2017 - prior to the establishment of the current SpokenWeb partnership - all the way to our most recent performances, workshops, and symposia. What differentiates these recordings from the archival recordings under development in the SpokenWeb Collections is that Archive of the Present recordings capture events that were conceived and organized by SpokenWeb members with the deliberate aim of exploring new ways of performing the archive and new modes of listening to it.</p>
            <p class="pb-4">Archive of the Present captures SpokenWeb’s interest in the relationship between the past and the present, intergenerational encounters, echoes and interventions, and the question of how we are listening to the past as a mode of performance. It is manifestation of what Camlot and McLeod call "Archives of the Present" in the title of the third and final section of CanLit Across Media: Unarchiving the Literary Event, exploring "the temporal permeability of the archive as a living concept used to describe new processural, digital, and performative formations of materials, data, and information as deployed to engage with topics of immediate currency." Technology and mediation are instantiating factors of literary historical records and they impact how we understand the Archive of the Present as an ever-expanding entity. That entity is a living archive that we are shaping through our archival practices, and developing by staging new events and acting (and recording) in the present.</p>
          </div>
        </div>
      </b-container>
    </main>
    <Footer />
  </div>
</template>

<script>
import helpers from '@/mixins/helpers.js'

export default {
  name: 'About',

  mixins: [helpers],
  data() {
    return {
      title: 'About'
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        // { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>

<style lang="scss"></style>
