import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { BookingDate } from '@/components/booking'

describe('BookingDate', () => {
  it('renders correctly', () => {
    const wrapper = mount(BookingDate)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
