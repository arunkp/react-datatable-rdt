"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const data_table_1 = __importDefault(require("./data-table"));
const papaparse_1 = __importDefault(require("papaparse"));
const App = () => {
    const [rawData, setrawData] = (0, react_1.useState)([
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
        { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        // ['1', 'Snow', 'Jon', '35'],
    ]);
    const changeData = () => {
        setrawData([
            { field: 'id', fieldHeader: 'ID' },
            { field: 'name', fieldHeader: 'Name' },
            { field: 'email', fieldHeader: 'Email' },
        ]);
    };
    const onFileUpload = (e) => {
        var _a;
        if (e.currentTarget && ((_a = e.currentTarget.files) === null || _a === void 0 ? void 0 : _a.length)) {
            papaparse_1.default.parse(e.currentTarget.files[0], {
                complete: (result) => {
                    if (Array.isArray(result.data)) {
                        setrawData(result.data);
                    }
                },
            });
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            "Upload a file",
            react_1.default.createElement("input", { onChange: onFileUpload, placeholder: "upload file", type: "file" })),
        rawData && (react_1.default.createElement(data_table_1.default, { tableTitle: react_1.default.createElement("h1", null, "This is a table header"), selectable: true, columns: [
                { field: 'id', fieldHeader: 'ID' },
                { field: 'firstName', fieldHeader: 'First Name' },
                { field: 'lastName', fieldHeader: 'last Name' },
                { field: 'age', fieldHeader: 'Age' },
            ], data: rawData })),
        react_1.default.createElement("button", { onClick: changeData }, "Change Data")));
};
exports.default = App;
