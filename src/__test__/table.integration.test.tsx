import { render } from "@testing-library/react";
import { Table } from "components/table/Table";

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

 //this test should check the followings
 // that checkbox click selects and unselects a row
 // that header checkbox selects all rows
 // that when row is clicked outside of the checkbox, it performs an event 

describe("table integration test", () => {
    test("user can select a table row by clicking checkbox", () => {
        render(<Table columns={columns} rows={rows} onRowClick={() => {}} />);
    })
})
