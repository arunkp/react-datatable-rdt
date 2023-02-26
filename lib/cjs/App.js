"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react")); // , { useState }
const data_table_1 = __importDefault(require("./data-table"));
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
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null, "Upload a file"),
        rawData && (react_1.default.createElement(data_table_1.default, { tableTitle: react_1.default.createElement("h1", null, "This is a table header"), selectable: true, data: rawData })),
        react_1.default.createElement("button", { onClick: changeData }, "Change Data")));
};
exports.default = App;
