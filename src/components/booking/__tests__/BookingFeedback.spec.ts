import { beforeEach, describe, expect, it, vi } from 'vitest'

import { BookingFeedback } from '@/components/booking'
import { mockedBike } from '@/mocks'
import { mockIntersectionObserver } from '@/core/helpers/tests'

import { mount } from '@vue/test-utils'

describe('BookingFeedback', () => {
  vi.stubGlobal('IntersectionObserver', mockIntersectionObserver)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    const wrapper = mount(BookingFeedback, {
      props: { imageToRender: mockedBike.cardImage as string, bikeName: mockedBike.name, chipText: mockedBike.type }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('prop imageToRender', () => {
    const wrapper = mount(BookingFeedback, {
      props: { imageToRender: mockedBike.cardImage as string, bikeName: mockedBike.name, chipText: mockedBike.type }
    })

    expect(wrapper.findComponent('image-lazy'))
  })

  it('prop chipText', () => {
    const wrapper = mount(BookingFeedback, {
      props: { imageToRender: mockedBike.cardImage as string, bikeName: mockedBike.name, chipText: mockedBike.type }
    })

    expect(wrapper.findComponent('chip'))
  })
})
