import React from 'react'; // , { useState }
import ReactDataTableRDT from 'react-datatable-rdt';
// import { columnType } from './utils/PropTypes';
// import Papa from 'papaparse';
// import { rowType } from './utils/PropTypes';

const App = () => {
  // const [columnData, setcolumnData] = useState<columnType[] | string>(
  //   'id name'
  // );

  const rawData = [
    { id: '1', name: 'Arun' },
    { id: '2', name: 'Sneha' },
    { id: '2', name: 'Sneha' },
  ];

  const changeData = () => {
    // setrawData([]);
    // setcolumnData([
    //   { field: 'id', fieldHeader: 'ID' },
    //   { field: 'name', fieldHeader: 'Name' },
    //   { field: 'email', fieldHeader: 'Email' },
    // ]);
  };

  // const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   if (e.currentTarget && e.currentTarget.files?.length) {
  //     Papa.parse(e.currentTarget.files[0], {
  //       // header: true,
  //       complete: (result) => {
  //         if (Array.isArray(result.data)) {
  //           // setrawData(result.data);
  //         }
  //       },
  //     });
  //   }
  // };

  return (
    <>
      <div>
        Upload a file
        {/* <input onChange={onFileUpload} placeholder="upload file" type="file" /> */}
      </div>
      {rawData && (
        <ReactDataTableRDT
          tableTitle={<h1>This is a table header</h1>}
          selectable
          data={rawData}
        />
      )}
      <button onClick={changeData}>Change Data</button>
    </>
  );
};

export default App;
