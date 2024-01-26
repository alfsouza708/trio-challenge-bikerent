<script lang="ts">
import { defineComponent } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import moment from 'moment'
import '@vuepic/vue-datepicker/dist/main.css'

export default defineComponent({
  name: 'BookingDate',
  components: { VueDatePicker },
  emits: ['update:date'],
  data() {
    return {
      date: null,
      selecting: false
    }
  },
  computed: {
    minDate() {
      return moment().toDate()
    },
    maxDate() {
      return moment().add(3, 'M').toDate()
    }
  },
  watch: {
    selecting() {
      this.date && !this.selecting ? this.$emit('update:date', true) : this.$emit('update:date', false)
    }
  }
})
</script>

<template>
  <section class="booking-date">
    <vue-date-picker
      v-model="date"
      uid="date-selector"
      inline
      auto-apply
      range
      month-name-format="long"
      :hide-navigation="['time']"
      :min-date="minDate"
      :max-date="maxDate"
      prevent-min-max-navigation
      @range-start="() => (selecting = true)"
      @range-end="
        () => {
          if (selecting) selecting = false
        }
      "
    />
    <p>{{ date }}</p>
  </section>
</template>

<style lang="scss">
:root {
  --dp-font-family: 'Mont';
  --dp-border-radius: 1.5rem;
  --dp-cell-size: 3.5rem;
  --dp-menu-min-width: 375px;
  --dp-cell-padding: 16px;
}

.dp__theme_light {
  --dp-background-color: #1f49d1;
  --dp-text-color: #ffffff;
  --dp-icon-color: #ffffff;
  --dp-primary-color: #577cdd;
  --dp-border-color-hover: #ffffff;
  --dp-hover-icon-color: #1f49d1;
  --dp-hover-text-color: #1f49d1;
  --dp-range-between-dates-background-color: var(--dp-hover-color, #c1cff2);
  --dp-disabled-color: #ededed;
}

.dp__month_year_row {
  height: 5rem;

  .dp__overlay {
    border-radius: 1.5rem;
  }

  button[aria-label='Previous month'] {
    display: flex;
    justify-content: center;
    align-items: center;
    order: 1;
    width: 100px;
    height: 100px;

    & .dp__inner_nav {
      color: #fff;
      border: #fff solid 0.25px;
      border-radius: 0.5rem;
      padding: 4px;

      &:hover {
        background: none;
      }
    }
  }
  button[aria-label='Next month'] {
    display: flex;
    justify-content: center;
    align-items: center;
    order: 2;
    width: 100px;

    & .dp__inner_nav {
      color: #fff;
      border: #fff solid 0.25px;
      border-radius: 0.5rem;
      padding: 4px;

      &:hover {
        background: none;
      }
    }
  }

  .dp__month_year_wrap {
    flex-direction: column;

    button[aria-label='Open months overlay'] {
      pointer-events: none;
      font-size: large;
      font-weight: bold;
    }

    button[aria-label='Open years overlay'] {
      font-size: small;
      font-weight: lighter;
      pointer-events: none;
    }
  }
}

.dp__calendar {
  .dp__calendar_header {
    font-weight: lighter;
    color: #ededed;
  }

  .dp__calendar_header_separator {
    display: none;
  }

  .dp__calendar .dp__calendar_row .dp__calendar_item {
    .dp__today {
      border-radius: 50%;
      border-color: #fff;
    }
    .dp__range_start {
      color: #1f49d1;
      border-radius: 50%;
      background-color: #fff;
    }

    .dp__range_between {
      color: #fff;
      border: none;
      background-color: #577cdd;
    }

    .dp__range_end {
      color: #1f49d1;
      border-radius: 50%;
      background-color: #fff;
    }
  }
}
</style>
