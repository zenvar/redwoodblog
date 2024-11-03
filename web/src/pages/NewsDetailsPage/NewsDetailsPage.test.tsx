import { render } from '@redwoodjs/testing/web'

import NewsDetailsPage from './NewsDetailsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewsDetailsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewsDetailsPage />)
    }).not.toThrow()
  })
})
