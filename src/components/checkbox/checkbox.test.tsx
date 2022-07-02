import React from 'react';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe("checkbox component", () => {
    it("renders without crashing and is unchecked", () => {
        render(<Checkbox value={false} onChange={() => {}} />)
        const checkbox = screen.getByRole("checkbox")
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).not.toBeChecked()
    })

    it("Should render as checked if value is true", () => {
        render(<Checkbox value={true} onChange={() => {}} />)
        const checkbox = screen.getByRole("checkbox")
        expect(checkbox).toBeChecked()
    })
})

