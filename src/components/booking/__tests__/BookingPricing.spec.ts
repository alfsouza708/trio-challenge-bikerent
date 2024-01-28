import { describe, expect, it } from 'vitest'

import { BookingPricing } from '@/components/booking'
import { CurrencyCode } from '@/core/config'
import { formatCurrency } from '@/core/helpers/currency'
import { mockedPricingDetails } from '@/mocks'
import { mount } from '@vue/test-utils'

describe('BookingPricing', () => {
  it('renders correctly', () => {
    const wrapper = mount(BookingPricing, {
      props: { rentAmountDetails: mockedPricingDetails, currency: CurrencyCode.EUR }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('show different currency price', () => {
    const wrapper = mount(BookingPricing, {
      props: { rentAmountDetails: mockedPricingDetails, currency: CurrencyCode.USD }
    })

    const compare = `Subtotal ${formatCurrency(
      mockedPricingDetails.rentAmount,
      CurrencyCode.USD
    )} Service Fee ${formatCurrency(mockedPricingDetails.fee, CurrencyCode.USD)}Total${formatCurrency(
      mockedPricingDetails.totalAmount,
      CurrencyCode.USD
    )}`

    expect(wrapper.text()).equal(compare)
  })

  it('show price rate', () => {
    const wrapper = mount(BookingPricing, {
      props: { rentAmountDetails: mockedPricingDetails, currency: CurrencyCode.EUR }
    })

    const compare = `Subtotal ${formatCurrency(
      mockedPricingDetails.rentAmount,
      CurrencyCode.EUR
    )} Service Fee ${formatCurrency(mockedPricingDetails.fee, CurrencyCode.EUR)}Total${formatCurrency(
      mockedPricingDetails.totalAmount,
      CurrencyCode.EUR
    )}`

    expect(wrapper.text()).equal(compare)
  })
})
