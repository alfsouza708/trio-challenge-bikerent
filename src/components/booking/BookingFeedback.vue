<script lang="ts">
import { defineComponent } from 'vue'

import { Chip } from '@/components/chip'
import { ImageLazy } from '@/components/image'

export default defineComponent({
  name: 'BookingFeedback',
  components: { Chip, ImageLazy },
  props: {
    imageToRender: {
      type: String,
      required: true
    },
    bikeName: {
      type: String,
      required: true
    },
    chipText: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {}
})
</script>

<template>
  <section class="booking-feedback card">
    <h2 class="font-bold text-2xl">Thank you!</h2>
    <p class="font-normal text-md">Your bike is booked.</p>
    <image-lazy :src="imageToRender" class="image--thanks-card" />
    <p class="font-semibold text-md">{{ bikeName }}</p>
    <chip color="secondary" size="sm">{{ chipText }}</chip>
  </section>
</template>

<style lang="scss">
.booking-feedback {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px;

  .image--thanks-card {
    width: 185px;
  }
}
</style>
