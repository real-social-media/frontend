import React from 'react'
import { renderWithProviders, fireEvent, act, within } from 'tests/utils'
import CountryCode, { a11y, filterOptions } from 'components/CountryCode'

/**
 * Mock Data
 */
const options = [
  { label: 'United States', value: 'US', flag: '🇺🇸', dialCode: '+1' },
  { label: 'United Kingdom', value: 'UK', flag: '🇬🇧', dialCode: '+44' },
]

const onChange = () => {}

const defaultProps = { options, value: options[1].value, onChange }

const setup = (props = defaultProps) => renderWithProviders(<CountryCode {...props} />)

describe('Country Code  component', () => {
  it('render value', () => {
    const { getByAccessibilityLabel } = setup()
    const $openBtn = getByAccessibilityLabel(a11y.openBtn)

    expect(within($openBtn).getByText(options[1].dialCode)).toBeTruthy()
    expect(within($openBtn).getByText(options[1].flag)).toBeTruthy()
  })

  it('modal hidden by default', () => {
    const { queryByAccessibilityLabel } = setup()

    expect(queryByAccessibilityLabel(a11y.modal)).toHaveProp('visible', false)
  })

  it('toggle modal', async () => {
    const { queryByAccessibilityLabel } = setup()

    expect(queryByAccessibilityLabel(a11y.modal)).toHaveProp('visible', false)

    await act(async () => fireEvent.press(queryByAccessibilityLabel(a11y.openBtn)))
    expect(queryByAccessibilityLabel(a11y.modal)).toHaveProp('visible', true)
    expect(within(queryByAccessibilityLabel(a11y.closeBtn)).queryByText('Close')).toBeTruthy()

    await act(async () => fireEvent.press(queryByAccessibilityLabel(a11y.closeBtn)))
    expect(queryByAccessibilityLabel(a11y.modal)).toHaveProp('visible', false)
  })

  it('render options', () => {
    const { queryAllByRole } = setup()
    const $options = queryAllByRole('radio')

    expect($options).toHaveLength(options.length)

    $options.forEach(($item, index) => {
      expect(within($item).queryByText(options[index].label)).toBeTruthy()
      expect(within($item).queryByText(options[index].dialCode)).toBeTruthy()
    })
  })

  it('onChange', () => {
    const onChange = jest.fn()
    const { queryAllByRole } = setup({ ...defaultProps, onChange })
    const $options = queryAllByRole('radio')

    $options.forEach(($item, index) => {
      fireEvent.press($item)
      expect(onChange).toHaveBeenCalledWith(options[index])
    })
  })

  it('filterOptions', () => {
    expect(filterOptions(undefined, options)).toEqual(options)
    expect(filterOptions('', options)).toEqual(options)
    expect(filterOptions('Un', options)).toEqual(options)
    expect(filterOptions('un', options)).toEqual(options)
    expect(filterOptions('UN', options)).toEqual(options)
    expect(filterOptions('Sta', options)).toEqual([options[0]])
    expect(filterOptions('US', options)).toEqual([options[0]])
    expect(filterOptions('+1', options)).toEqual([options[0]])
    expect(filterOptions('+4', options)).toEqual([options[1]])
    expect(filterOptions('UK', options)).toEqual([options[1]])
    expect(filterOptions('United K', options)).toEqual([options[1]])
  })
})
