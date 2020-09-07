import React from 'react'
import { renderWithProviders, within, fireEvent } from 'tests/utils'
import Accordion from 'templates/Accordion'
import testIDs from 'templates/Accordion/test-ids'

const items = [1, 2, 3].map((i) => ({
  onPress: jest.fn(),
  text: `Item ${i}`,
}))

const setup = (props) => renderWithProviders(<Accordion {...props} />)

describe('Accordion template', () => {
  it('empty list by default', () => {
    const { queryAllByTestId } = setup()

    expect(queryAllByTestId(testIDs.item)).toHaveLength(0)
  })

  it('render items', async () => {
    const { queryAllByTestId } = setup({ items })
    const itemsEls = queryAllByTestId(testIDs.item)

    await Promise.all(
      items.map(async (item, index) => {
        const $el = within(itemsEls[index])
        const $text = await $el.getByA11yRole('text')
        const $button = await $el.getByA11yRole('button')

        expect($text).toHaveTextContent(item.text)
        expect($button).toBeTruthy()
      }),
    )

    expect(itemsEls).toHaveLength(items.length)
  })

  it('each item should have onPress callback', async () => {
    const { queryAllByTestId } = setup({ items })
    const itemsEls = queryAllByTestId(testIDs.item)

    await Promise.all(
      items.map(async (item, index) => {
        const $button = await within(itemsEls[index]).getByA11yRole('button')

        fireEvent.press($button)
        expect(item.onPress).toHaveBeenCalled()
      }),
    )
  })

  it('should toggle loading state', async () => {
    const oddItemsWithLoading = items.map((item, index) => ({ ...item, loading: index % 2 === 0 }))
    const { queryAllByTestId } = setup({ items: oddItemsWithLoading })
    const itemsEls = queryAllByTestId(testIDs.item)

    await Promise.all(
      oddItemsWithLoading.map(async (item, index) => {
        const $row = itemsEls[index]
        const $loading = await within($row).queryByA11yRole('progressbar')

        if (item.loading) {
          expect($row).toContainElement($loading)
        } else {
          expect($row).not.toContainElement($loading)
        }
      }),
    )
  })
})
