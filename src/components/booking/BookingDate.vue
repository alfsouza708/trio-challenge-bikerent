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
      selecting: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight * 0.8
    }
  },
  computed: {
    minDate() {
      return moment().toDate()
    },
    maxDate() {
      return moment().add(3, 'M').toDate()
    },
    isMobile() {
      return this.windowWidth <= 475
    }
  },
  watch: {
    selecting() {
      this.date && !this.selecting && !this.isMobile
        ? this.$emit('update:date', { isSelected: true, dateToRent: this.formatDates(this.date) })
        : this.$emit('update:date', { isSelected: false, dateToRent: [] })
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  },
  methods: {
    handleModelUpdate() {
      if (this.isMobile && this.date) {
        this.$emit('update:date', { isSelected: true, dateToRent: this.formatDates(this.date) })
      }
    },
    formatDates(date: Date[]) {
      if (date) {
        return date.map((date) => moment(date).format('YYYY-MM-DD'))
      }
    },
    formatDatesMobile(date: Date[]) {
      const datesFormated = date.map((date) => moment(date).format('MMM/DD'))

      return `From ${datesFormated[0]} to ${datesFormated[1]}`
    }
  }
})
</script>

<template>
  <section class="booking-date">
    <vue-date-picker
      v-model="date"
      uid="date-selector"
      :inline="!isMobile"
      :auto-apply="!isMobile"
      :teleport="true"
      range
      month-name-format="long"
      :hide-navigation="['time']"
      :min-date="minDate"
      :max-date="maxDate"
      prevent-min-max-navigation
      input-class-name="dp-custom-input"
      :clearable="false"
      :format="formatDatesMobile"
      :action-row="{ showCancel: false }"
      :config="{
        modeHeight: windowHeight,
        onClickOutside: () => {
          isMobile ? true : false
        }
      }"
      @range-start="() => (selecting = true)"
      @range-end="
        () => {
          if (selecting && !isMobile) selecting = false
        }
      "
      @update:model-value="handleModelUpdate"
    />
  </section>
</template>

<style lang="scss">
:root {
  --dp-font-family: 'Mont';
  --dp-border-radius: 40px;
  --dp-cell-size: 40px;
  --dp-menu-min-width: 375px;
  --dp-cell-padding: 12px;
  --dp-menu-padding: 24px 26px;
}

.dp__theme_light {
  --dp-background-color: #1f49d1;
  --dp-text-color: #ffffff;
  --dp-disabled-color-text: rgba(255, 255, 255, 0.5);
  --dp-icon-color: #1f49d1;
  --dp-primary-color: #577cdd;
  --dp-border-color-hover: #ffffff;
  --dp-hover-icon-color: #1f49d1;
  --dp-hover-text-color: #1f49d1;
  --dp-range-between-dates-background-color: var(--dp-hover-color, #c1cff2);
  --dp-disabled-color: rgba(0, 0, 0, 0);
}

.dp-custom-input {
  color: black;
  background-color: #fff;
}

.dp__action_row {
  justify-content: center;

  .dp__action_buttons {
    margin: 0;
  }

  .dp__action_select {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffd775;
    color: black;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 20px;
    margin: 0;
    width: 327px;
    height: 60px;
  }

  .dp__selection_preview {
    display: none;
  }
}

.dp__action_buttons {
  margin: 0;
}

.dp__action_select {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffd775;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  width: 327px;
  height: 60px;
}

.dp__selection_preview {
  display: none;
}

.dp__month_year_row {
  height: 5rem;

  .dp__overlay {
    border-radius: 1.5rem;
  }

  .dp--arrow-btn-nav {
    display: flex;
    justify-content: center;
    align-items: center;

    .dp__inner_nav {
      color: #fff;
      border: #fff solid 1px;
      border-radius: 20px;
      padding: 4px;
      width: 52px;
      height: 52px;
      background: none;

      &.dp__inner_nav_disabled {
        color: rgba(255, 255, 255, 0.5);
        border: rgba(255, 255, 255, 0.5) solid 1px;
      }
    }
  }

  button[aria-label='Previous month'] {
    order: 1;
  }
  button[aria-label='Next month'] {
    order: 2;
  }

  .dp__month_year_wrap {
    flex-direction: column;
    pointer-events: none;

    button[aria-label='Open months overlay'] {
      font-size: 34px;
      font-weight: bold;
      justify-content: flex-start;
      color: rgba(255, 255, 255, 1);
    }

    button[aria-label='Open years overlay'] {
      height: fit-content;
      width: fit-content;
      padding: 8px;
      font-size: medium;
      font-weight: normal;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}

.dp__calendar {
  .dp__calendar_header {
    font-size: 16px;
    font-weight: normal;
    color: rgba(255, 255, 255, 0.5);
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
      overflow: visible;
      z-index: 2;

      &::after {
        content: '';
        position: absolute;
        width: 24px;
        height: 40px;
        right: -8px;
        background-color: #577cdd;
        z-index: 0;
        mix-blend-mode: color;
      }
    }

    .dp__range_between {
      color: #fff;
      border: none;
      background-color: #577cdd;
      overflow: visible;
      z-index: 2;

      &::after {
        content: '';
        position: absolute;
        width: 50px;
        height: 40px;
        left: 0;
        background-color: #577cdd;
        z-index: 0;
        mix-blend-mode: color;
      }
    }

    .dp__range_end {
      color: #1f49d1;
      border-radius: 50%;
      background-color: #fff;
      overflow: visible;
      z-index: 2;

      &::before {
        content: '';
        position: absolute;
        width: 24px;
        height: 40px;
        left: -6px;
        background-color: #577cdd;
        z-index: 0;
        mix-blend-mode: color;
      }
    }

    .dp__range_start.dp__range_end {
      &::before,
      &::after {
        display: none;
      }
    }
  }
}
</style>
