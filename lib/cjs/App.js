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
const App = () => {
    const [columnData, setcolumnData] = (0, react_1.useState)('id name');
    const changeData = () => {
        setcolumnData([
            { field: 'id', fieldHeader: 'ID' },
            { field: 'name', fieldHeader: 'Name' },
            { field: 'email', fieldHeader: 'Email' },
        ]);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(data_table_1.default, { tableTitle: react_1.default.createElement("h1", null, "This is a table header"), rows: [
                { id: '1', name: 'Arun Rao' },
                { id: '2', name: 'John Doe', email: 'john@example.com' },
            ], columns: columnData, selectable: true }),
        react_1.default.createElement("button", { onClick: changeData }, "Change Data")));
};
exports.default = App;
