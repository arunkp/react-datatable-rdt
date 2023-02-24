import React from 'react';
import ReactDataTableRDT from 'react-datatable-rdt';

function App() {
  return (
    <div className="App">
      <ReactDataTableRDT
        tableTitle={<h1>This is a table header</h1>}
        rows={[
          { id: '1', name: 'Arun Rao' },
          { id: '2', name: 'John Doe', email: 'john@example.com' },
        ]}
        columns={[
          { field: 'id', fieldHeader: 'ID' },
          { field: 'name', fieldHeader: 'Name' },
          { field: 'email', fieldHeader: 'Email' },
        ]}
      />
    </div>
  );
}

export default App;
