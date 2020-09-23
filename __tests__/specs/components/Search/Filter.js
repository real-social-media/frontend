/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "testFilterButtons"] }] */
import React from 'react'
import { renderWithProviders, fireEvent, within } from 'tests/utils'
import FilterComponent from 'components/Search/Filter'

const callbacks = {
  handlePostsAllFilter: jest.fn(),
  handlePostsViewedFilter: jest.fn(),
  handlePostsNotViewedFilter: jest.fn(),
  handlePostsVerifiedFilter: jest.fn(),
  handlePostsNotVerifiedFilter: jest.fn(),
}

const setup = (props) => renderWithProviders(<FilterComponent {...callbacks} {...props} />)

const testFilterButtons = (holder, expected) => {
  const { getAllByRole } = holder
  const $buttons = getAllByRole('button')

  const testButton = ($button, { name, fn, selected }) => {
    expect(within($button).getByText(name)).toBeTruthy()
    expect($button).toHaveProp('accessibilityState', { selected })
    expect(fn).not.toHaveBeenCalled()

    fireEvent.press($button)

    if (selected) {
      expect(fn).not.toHaveBeenCalled()
    } else {
      expect(fn).toHaveBeenCalled()
    }
  }

  testButton($buttons[0], {
    name: 'All',
    selected: expected.all.isActive,
    fn: callbacks.handlePostsAllFilter,
  })

  testButton($buttons[1], {
    name: 'Verified',
    selected: expected.verified.isActive,
    fn: callbacks.handlePostsVerifiedFilter,
  })

  testButton($buttons[2], {
    name: 'Unverified',
    selected: expected.unverified.isActive,
    fn: callbacks.handlePostsNotVerifiedFilter,
  })

  testButton($buttons[3], {
    name: 'Viewed',
    selected: expected.viewed.isActive,
    fn: callbacks.handlePostsViewedFilter,
  })

  testButton($buttons[4], {
    name: 'Unviewed',
    selected: expected.unviewed.isActive,
    fn: callbacks.handlePostsNotViewedFilter,
  })
}

describe('Search filter component', () => {
  afterEach(() => {
    Object.values(callbacks).forEach((fn) => fn.mockClear())
  })

  it('All', () => {
    const holder = setup({
      trendingFilters: {
        viewedStatus: undefined,
        verifiedStatus: undefined,
      },
    })

    testFilterButtons(holder, {
      all: { isActive: true },
      verified: { isActive: false },
      unverified: { isActive: false },
      viewed: { isActive: false },
      unviewed: { isActive: false },
    })
  })

  it('Verified', () => {
    const holder = setup({
      trendingFilters: {
        viewedStatus: undefined,
        verifiedStatus: true,
      },
    })

    testFilterButtons(holder, {
      all: { isActive: false },
      verified: { isActive: true },
      unverified: { isActive: false },
      viewed: { isActive: false },
      unviewed: { isActive: false },
    })
  })

  it('Unverified', () => {
    const holder = setup({
      trendingFilters: {
        viewedStatus: undefined,
        verifiedStatus: false,
      },
    })

    testFilterButtons(holder, {
      all: { isActive: false },
      verified: { isActive: false },
      unverified: { isActive: true },
      viewed: { isActive: false },
      unviewed: { isActive: false },
    })
  })

  it('Viewed', () => {
    const holder = setup({
      trendingFilters: {
        viewedStatus: 'VIEWED',
        verifiedStatus: undefined,
      },
    })

    testFilterButtons(holder, {
      all: { isActive: false },
      verified: { isActive: false },
      unverified: { isActive: false },
      viewed: { isActive: true },
      unviewed: { isActive: false },
    })
  })

  it('Unviewed', () => {
    const holder = setup({
      trendingFilters: {
        viewedStatus: 'NOT_VIEWED',
        verifiedStatus: undefined,
      },
    })

    testFilterButtons(holder, {
      all: { isActive: false },
      verified: { isActive: false },
      unverified: { isActive: false },
      viewed: { isActive: false },
      unviewed: { isActive: true },
    })
  })
})
