import React, { useState } from 'react';
import ReactDataTableRDT from './data-table';
import Papa from 'papaparse';
import { dataType } from './utils/PropTypes';

const App = () => {
  const [rawData, setrawData] = useState<dataType[]>([
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // [1, 'Snow', 'Jon', '35'],
  ]);

  const changeData = () => {
    setrawData([
      { field: 'id', fieldHeader: 'ID' },
      { field: 'name', fieldHeader: 'Name' },
      { field: 'email', fieldHeader: 'Email' },
    ]);
  };

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget && e.currentTarget.files?.length) {
      Papa.parse(e.currentTarget.files[0], {
        complete: (result) => {
          if (Array.isArray(result.data)) {
            setrawData(result.data);
          }
        },
      });
    }
  };

  return (
    <>
      <div>
        Upload a file
        <input onChange={onFileUpload} placeholder="upload file" type="file" />
      </div>
      {rawData && (
        <ReactDataTableRDT
          tableTitle={<h1>This is a table header</h1>}
          selectable
          // columns={[
          //   { field: 'id', fieldHeader: 'ID' },
          //   { field: 'firstName', fieldHeader: 'First Name' },
          //   { field: 'lastName', fieldHeader: 'last Name' },
          //   { field: 'age', fieldHeader: 'Age' },
          // ]}
          data={rawData}
          getSelectedRow={(rows) => console.log(rows)}
        />
      )}
      <button onClick={changeData}>Change Data</button>
    </>
  );
};

export default App;
