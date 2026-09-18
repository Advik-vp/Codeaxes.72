import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SearchBar } from './SearchBar.tsx'

function Harness() {
  const [value, setValue] = useState('')
  return <SearchBar value={value} onChange={setValue} />
}

describe('SearchBar', () => {
  it('lets the user type a query', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const input = screen.getByRole('searchbox', { name: /search projects/i })
    await user.type(input, 'react')
    expect(input).toHaveValue('react')
  })
})
