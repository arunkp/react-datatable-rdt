import React, { useState } from 'react';
import ReactDataTableRDT from './data-table';
import { columnType } from '@src/utils/PropTypes';

const App = () => {
  const [columnData, setcolumnData] = useState<columnType[] | string>(
    'id name'
  );

  const changeData = () => {
    setcolumnData([
      { field: 'id', fieldHeader: 'ID' },
      { field: 'name', fieldHeader: 'Name' },
      { field: 'email', fieldHeader: 'Email' },
    ]);
  };

  return (
    <>
      <ReactDataTableRDT
        tableTitle={<h1>This is a table header</h1>}
        rows={[
          { id: '1', name: 'Arun Rao' },
          { id: '2', name: 'John Doe', email: 'john@example.com' },
        ]}
        columns={columnData}
        selectable
      />
      <button onClick={changeData}>Change Data</button>
    </>
  );
};

export default App;
