import React, { useState } from 'react';
import ReactDataTableRDT from './data-table';
const App = () => {
    const [columnData, setcolumnData] = useState('id name');
    const changeData = () => {
        setcolumnData([
            { field: 'id', fieldHeader: 'ID' },
            { field: 'name', fieldHeader: 'Name' },
            { field: 'email', fieldHeader: 'Email' },
        ]);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(ReactDataTableRDT, { tableTitle: React.createElement("h1", null, "This is a table header"), rows: [
                { id: '1', name: 'Arun Rao' },
                { id: '2', name: 'John Doe', email: 'john@example.com' },
            ], columns: columnData, selectable: true }),
        React.createElement("button", { onClick: changeData }, "Change Data")));
};
export default App;
