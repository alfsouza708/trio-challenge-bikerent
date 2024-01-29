import { describe, expect, it } from 'vitest'

import { BookingAddressMap } from '@/components/booking'
import { mockedAddress } from '@/mocks'
import { mount } from '@vue/test-utils'

describe('BookingAddressMap', () => {
  it('renders correctly', () => {
    const wrapper = mount(BookingAddressMap, { props: { address: mockedAddress } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders map image correctly', () => {
    const wrapper = mount(BookingAddressMap, { props: { address: mockedAddress } })

    expect(wrapper.find('iframe').exists()).toBe(true)
  })
})
