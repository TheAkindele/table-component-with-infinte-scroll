import { Table } from 'components/table/Table';
import React from 'react';

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

function App() {
  return (
    <div className="App">
      <Table
        columns={columns}
        rows={rows}
        onRowClick={() => console.log("clicked")}
      />
    </div>
  );
}

export default App;
