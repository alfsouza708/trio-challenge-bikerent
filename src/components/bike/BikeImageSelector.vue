<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { ImageLazy } from '@/components/image'

export default defineComponent({
  name: 'BikeImageSelector',
  components: { ImageLazy },
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true
    },
    isMobile: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data: () => ({
    selected: 0
  }),
  computed: {
    filteredImages() {
      return this.images.filter((i) => !!i)
    },
    hasImages() {
      return !!this.filteredImages.length
    },
    selectedImage() {
      return this.filteredImages[this.selected] || null
    }
  },
  methods: {
    handleClick(index: number) {
      this.selected = index
    }
  }
})
</script>

<template>
  <section v-if="hasImages" class="bike-image-selector">
    <div class="grid grid-cols-1 gap-8">
      <div class="bike-image-selector__images" :class="{ 'mobile-view': isMobile }">
        <template v-for="(image, i) in images" :key="`image-${i}`">
          <div
            class="bike-image-selector__image p-3 mb-3"
            :class="{ 'bike-image-selector__image--active': selected === i }"
            @click="handleClick(i)"
          >
            <image-lazy :src="image" class="image--cover" />
          </div>
        </template>
      </div>
      <div class="bike-image-selector__selected">
        <image-lazy
          v-if="selectedImage"
          :key="`selected-image-${selected}`"
          :src="selectedImage"
          class="image--cover aspect-wide"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bike-image-selector {
  position: relative;

  @media screen and (max-width: 600px) {
    border-radius: 32px;
    margin-top: 20px;
    margin-bottom: -20px;
    padding: 20px;
    background: white;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .grid {
    @include breakpoint('md') {
      grid-template-columns: 100px 1fr;
    }
  }

  @include element('images') {
  }
  @include element('image') {
    @apply .overflow-hidden;

    border-radius: $border-radius-xl;
    border: 1px solid get-theme-color('gray');
    cursor: pointer;

    @include modifier('active') {
      border-color: get-theme-color('primary');
    }
  }

  .mobile-view {
    display: none;
  }
}
</style>
