/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Table } from './Table';
import { server } from 'mocks/axios.mock';



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

 



describe("table component renders", () => {
    beforeAll(() => server.listen({
        onUnhandledRequest: "error"
    }))
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())


    const getTable = async () => {
        let table;
        table = render(<Table columns={columns} rows={rows} onRowClick={() => {}} />)
        return table
    }

    beforeEach(() => getTable())

    it("Should render without crashing", () => {
        const table = screen.getByRole("table")
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
        const allRows = screen.getAllByTestId("body-row")
        expect(allRows).toHaveLength(rows.length)
    })
})

describe("table events", () => {
    test("that it performs an event on row click", async () => {
        const onClick = jest.fn()
        render(<Table columns={columns} rows={rows} onRowClick={onClick} />)
        const tableRows = screen.getAllByTestId("row-data")

        // fireEvent.click(tableRows[0])
        // expect(onClick.mock.calls.length).toEqual(1);

       userEvent.click(tableRows[0])
       expect(onClick).toHaveBeenCalledTimes(1)
    })
})


