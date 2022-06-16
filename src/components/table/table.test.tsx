import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Table } from './Table';


const columns = [
    {id: "id", label: "Product ID"},
    {id: "title", label: "Title" },
    {id: "url", label: "URL", width: "15rem" },
    {id: "thumbnail", label: "Thumbnail" }
];

const rows = [
    { id: 1, title: 'John', url: 'imageurl-1.com', thumbnail: "thumbnail-1.com" },
    { id: 2, title: 'John', url: 'imageurl-2.com', thumbnail: "thumbnail-2.com" },
    { id: 3, title: 'John', url: 'imageurl-3.com', thumbnail: "thumbnail-3.com" },
    { id: 4, title: 'John', url: 'imageurl-4.com', thumbnail: "thumbnail-4.com" },
    { id: 5, title: 'John', url: 'imageurl-5.com', thumbnail: "thumbnail-5.com" }
 ];

describe("table component", () => {
    // const setup = () => 

    beforeEach(() => {
        render(<Table columns={columns} rows={rows} onRowClick={() => {}} />)
    })

    it("Should render without crashing", () => {
        const table = screen.getByTestId("table")
        expect(table).toBeInTheDocument()
    })

    it("should have a table head", () => {
        const thead = screen.getByTestId("t-head")
        expect(thead).toBeInTheDocument()
    })

    it("should have a table body", () => {
        const tbody = screen.getByTestId("t-body")
        expect(tbody).toBeInTheDocument()
    })

    test("that number of unique columns is equal to number of column array length", () => {
        const allColumns = screen.getAllByTestId("th")
        expect(allColumns).toHaveLength(columns.length)
    })

    test("that number of unique rows is equal to number of rows array length", () => {
        const allRows = screen.getAllByTestId("table-row")
        expect(allRows).toHaveLength(rows.length)
    })
})