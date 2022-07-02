import { renderHook, act } from '@testing-library/react-hooks';
import { useSelectRow } from "./useSelectRow";

const rows = [
    { id: 1, title: 'John', url: 'imageurl-1.com', thumbnail: "thumbnail-1.com" },
    { id: 2, title: 'John', url: 'imageurl-2.com', thumbnail: "thumbnail-2.com" },
    { id: 3, title: 'John', url: 'imageurl-3.com', thumbnail: "thumbnail-3.com" },
]
const rowData = { id: 3, title: 'John', url: 'imageurl-3.com', thumbnail: "thumbnail-3.com" }

describe("useSelectRow hook", () => {

    it("Should consist of selectAllRows function that returns a value", () => {
        const {result} = renderHook(() => useSelectRow())
        expect(result.current.selectAllRows).toBeInstanceOf(Function)
        expect(result.current.selectedRowsArray.length).toBe(0)

        act(() => {
            result.current.selectAllRows(rows)
        })
        expect(result.current.selectedRowsArray.length).toBe(rows.length)

        act(() => {
            result.current.selectAllRows(rows)
        })
        expect(result.current.selectedRowsArray.length).not.toBe(rows.length)
    })

    it("Should consist of selectSingleRow function that returns a value", () => {
        const {result} = renderHook(useSelectRow)
        expect(result.current.selectSingleRow).toBeInstanceOf(Function)
        expect(result.current.selectedRowsArray.length).toBe(0)

        act(() => {
            result.current.selectSingleRow(rowData)
        })
        expect(result.current.selectedRowsArray).toContain(rowData)

        // check that when checkbox clicked again, item is removed from the selected array
        act(() => {
            result.current.selectSingleRow(rowData)
        })
        expect(result.current.selectedRowsArray).not.toContain(rowData)
    })
})
