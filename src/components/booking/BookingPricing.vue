<script lang="ts">
import type { BikeRent } from '@/core/api/modules/typings/bike'
import { defineComponent, type PropType } from 'vue'
import { Icon } from '@/components/icon/'
import type { CurrencyCode } from '@/core/config'
import { formatCurrency } from '@/core/helpers/currency'

export default defineComponent({
  name: 'BookingPricing',
  components: { Icon },
  props: {
    rentAmountDetails: {
      type: Object as PropType<BikeRent>,
      required: true
    },
    currency: {
      type: String as PropType<CurrencyCode>,
      required: true
    }
  },
  computed: {
    rentAmount(): number {
      return this.rentAmountDetails.rentAmount
    },
    fee(): number {
      return this.rentAmountDetails.fee
    },
    totalAmount(): number {
      return this.rentAmountDetails.totalAmount
    }
  },
  methods: {
    formatPrice(value: number): String {
      return formatCurrency(value, this.currency)
    }
  }
})
</script>

<template>
  <section class="booking-pricing">
    <div class="grid grid-cols-2 gap-y-3 text-sm">
      <div class="flex items-center">
        Subtotal
        <icon type="solid" size="xs" class="ml-1">circle-info</icon>
      </div>
      <div class="text-right">{{ formatPrice(rentAmount) }}</div>

      <div class="flex items-center">
        Service Fee
        <icon type="solid" size="xs" class="ml-1">circle-info</icon>
      </div>
      <div class="text-right">{{ formatPrice(fee) }}</div>

      <div class="flex items-center text-base">Total</div>
      <div class="text-right text-2xl font-bold">{{ formatPrice(totalAmount) }}</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.booking-pricing {
  position: relative;
}
</style>
