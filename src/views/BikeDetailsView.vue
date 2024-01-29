<script lang="ts">
import { useBikeStore, mapActions, mapState } from '@/core/store'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { BikeRent, BikeRentDetails } from '@/core/api/modules/typings/bike'
import { defineComponent } from 'vue'

import { LoadingSpinner } from '@/components/loading'
import { BikeImageSelector, BikeSpecs, type BikeSpecsProps, BikePrice, BikeBookmark } from '@/components/bike'
import { Chip } from '@/components/chip'
import { BookingAddressMap, BookingPricing, BookingDate, BookingFeedback } from '@/components/booking'
import { CurrencyCode, USER_ID } from '@/core/config'

import { BreadcrumbsLayout } from '@/components/layout'
import { NotFound } from '@/components/error'

interface DatePickerData {
  isSelected: boolean
  dateToRent: any
}

export default defineComponent({
  name: 'BikeDetailsView',
  components: {
    BreadcrumbsLayout,
    LoadingSpinner,
    BikeImageSelector,
    BikeSpecs,
    BikePrice,
    Chip,
    BookingAddressMap,
    BookingPricing,
    BookingDate,
    BookingFeedback,
    BikeBookmark,
    NotFound
  },
  metaInfo() {
    const { name } = this.data || {}

    return {
      title: name ? `${name} - BikeRent Vue` : 'Details - BikeRent Vue'
    }
  },
  data: () => ({
    isLoading: false,
    currency: CurrencyCode.EUR,
    mockAddress: '745 Atlantic Ave, Boston, MA 02111, United States',
    isBookmarked: false,
    isDateSelected: false,
    isBikeRented: false,
    dateToRent: [],
    rentAmountDetails: {},
    windowWidth: window.innerWidth
  }),
  computed: {
    ...mapState(useBikeStore, ['getBikeById']),
    hasData() {
      return !!this.data
    },
    id() {
      const { id } = this.$route.params || {}

      return Number(id)
    },
    data() {
      return (this.id && this.getBikeById(this.id)) || null
    },
    rentDetails(): BikeRentDetails {
      return { bikeId: this.id, userId: parseInt(USER_ID), dateFrom: this.dateToRent[0], dateTo: this.dateToRent[1] }
    },
    images() {
      return this.data?.imageUrls || []
    },
    specs(): BikeSpecsProps {
      const { bodySize, maxLoad, ratings } = this.data || {}

      return {
        bodySize,
        maxLoad,
        ratings
      }
    },
    isMobile() {
      return this.windowWidth <= 475
    }
  },
  async beforeMount() {
    if (!this.data) {
      this.isLoading = true
      await this.fetchBikeList()
      this.isLoading = false
    }

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  },
  methods: {
    ...mapActions(useBikeStore, {
      fetchBikeList: 'fetchList',
      fetchBikeAmount: 'fetchAmount',
      rentBike: 'rentBike'
    }),

    async handleEmit({ isSelected, dateToRent }: DatePickerData) {
      this.isDateSelected = isSelected
      this.dateToRent = dateToRent

      if (this.isDateSelected && this.dateToRent) {
        try {
          this.rentAmountDetails = await this.fetchBikeAmount(this.rentDetails)
        } catch (e) {
          this.isDateSelected = false
          alert(e)
        }
      }
    },

    handleAddBooking() {
      try {
        this.rentBike(this.rentDetails)
        this.isBikeRented = true
      } catch (e) {
        alert(e)
      }
    }
  }
})
</script>

<template>
  <div v-if="hasData && !isMobile" class="absolute top-0 left-0 pl-2">
    <breadcrumbs-layout theme="primary" :breadcrumbs="[{ name: data!.name }]" />
  </div>

  <div class="page page--details">
    <template v-if="isLoading">
      <div class="text-center my-32">
        <loading-spinner />
      </div>
    </template>
    <template v-else-if="!hasData">
      <not-found />
    </template>
    <template v-else>
      <div class="grid gap-x-6 grid-cols-1">
        <div>
          <div class="card p-8" :class="{ 'mobile-view': isMobile }">
            <bike-image-selector :images="images" :is-mobile="isMobile" class="mb-8" />

            <bike-specs :specs="specs" />

            <div v-if="!isMobile" class="divider" />

            <div class="card p-8 m-0" :class="{ 'mobile-view mobile-view-info': isMobile }">
              <article>
                <div class="flex">
                  <div>
                    <h2 class="font-extrabold text-2xl mb-2 lg:text-4xl">{{ data!.name }}</h2>
                    <chip color="secondary" size="sm">{{ data!.type }}</chip>
                  </div>

                  <div v-if="!isMobile" class="ml-auto">
                    <bike-bookmark v-model:active="isBookmarked" :width="60" size="2xl" outlined />
                  </div>
                </div>

                <p class="text-sm lg:text-regular">{{ data!.description }}</p>
              </article>

              <section class="pricing">
                <div class="divider" />
                <div class="flex">
                  <div class="font-semibold">Day</div>
                  <bike-price :price="data!.rate" :currency="currency" rate="daily" class="ml-auto" />
                </div>
                <div class="flex">
                  <div class="font-semibold">Week</div>
                  <bike-price :price="data!.rate * 7" :currency="currency" rate="weekly" class="ml-auto" />
                </div>
                <div class="divider" />
              </section>

              <div class="w-full">
                <h4 class="lg:text-2xl font-bold mb-4">Full adress after booking</h4>
                <booking-address-map :address="mockAddress" />
              </div>
            </div>
          </div>
        </div>

        <div v-if="!isMobile">
          <div v-if="!isBikeRented" class="card p-8">
            <div class="flex justify-center items-center flex-col">
              <h2 class="self-start mb-4">Select date and time</h2>
              <booking-date class="lg:self-start w-full" @update:date="handleEmit" />
            </div>

            <div v-if="isDateSelected" class="mt-5">
              <h3 class="text-base mb-4">Booking Overview</h3>

              <div class="divider" />

              <booking-pricing
                :rent-amount-details="(rentAmountDetails as BikeRent)"
                :currency="currency"
                class="mb-8"
              />

              <button class="button button--primary w-full py-5" @click="handleAddBooking">Add to booking</button>
            </div>
          </div>

          <div v-else>
            <booking-feedback
              :image-to-render="images[0]"
              :bike-name="data!.name"
              :chip-text="data!.type"
            ></booking-feedback>
          </div>
        </div>

        <div v-if="isMobile" class="rent-button flex">
          <bike-bookmark v-model:active="isBookmarked" :width="70" size="2xl" outlined />
          <button class="button button--secondary w-full py-5 mobile-view ml-3" @click="handleAddBooking">
            Rent Bike
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.page--details {
  position: relative;

  .grid {
    @include breakpoint('lg') {
      grid-template-columns: minmax(400px, 67%) 1fr;
    }
    .rent-button {
      position: sticky;
      width: 100%;
      bottom: 0;
      left: 0;
      background-color: #1f49d1;
      color: white;
      padding: 24px;
      z-index: 10;
    }
    .mobile-view {
      color: white;
      border: none;
      padding: 0;

      &.mobile-view-info {
        background-color: #1f49d1;
        padding: 40px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        .divider {
          color: #d9d9d9;
        }
      }
      &.button {
        background: #ffd775;
        color: black;
        font-size: 1rem;
        font-weight: bold;
      }
    }
  }
}
</style>
