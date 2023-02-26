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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_1 = require("@testing-library/react");
require("@testing-library/jest-dom/extend-expect");
const index_1 = __importDefault(require("./index"));
const humanizeString_1 = __importDefault(require("./utils/humanizeString"));
//test block
test('component should not contain any values', () => __awaiter(void 0, void 0, void 0, function* () {
    // render the component on virtual dom
    (0, react_1.render)(React.createElement(index_1.default, { data: [], columns: [] }));
    expect(react_1.screen.getByTestId('tbody')).toBeInTheDocument();
    expect(react_1.screen.getByTestId('thead')).toBeInTheDocument();
}));
//test block
test('if the field is not enabled in header, the corresponding value should not render', () => __awaiter(void 0, void 0, void 0, function* () {
    // render the component on virtual dom
    (0, react_1.render)(React.createElement(index_1.default, { tableTitle: React.createElement("h1", null, "This is a table header"), data: [
            { id: '1', name: 'Arun Rao' },
            { id: '2', name: 'John Doe', email: 'john@example.com' },
        ], columns: [
            { field: 'id', fieldHeader: 'ID' },
            { field: 'name', fieldHeader: 'Name' },
        ] }));
    expect(react_1.screen.getAllByTestId('row-val')).not.toContain('john@example.com');
}));
//test block
test('email field is expected to be empty when the value is absent', () => __awaiter(void 0, void 0, void 0, function* () {
    // render the component on virtual dom
    (0, react_1.render)(React.createElement(index_1.default, { tableTitle: React.createElement("h1", null, "This is a table header"), data: [
            { id: '1', name: 'Arun Rao' },
            { id: '2', name: 'John Doe', email: 'john@example.com' },
        ], columns: [
            { field: 'id', fieldHeader: 'ID' },
            { field: 'name', fieldHeader: 'Name' },
        ] }));
    expect(react_1.screen.getAllByTestId('row-val')).not.toContain('john@example.com');
    expect(react_1.screen.getAllByTestId('table-row')[0].textContent).toEqual('1Arun Rao');
}));
//test block
test('Columns must render with respective object keys with not passed as props', () => __awaiter(void 0, void 0, void 0, function* () {
    // render the component on virtual dom
    (0, react_1.render)(React.createElement(index_1.default, { tableTitle: React.createElement("h1", null, "This is a table header"), data: [
            { id: '1', name: 'Arun Rao' },
            { id: '2', name: 'John Doe', email: 'john@example.com' },
        ] }));
    expect(react_1.screen.getAllByTestId('col-name')[0].textContent).toContain((0, humanizeString_1.default)('id'));
    expect(react_1.screen.getAllByTestId('col-name')[1].textContent).toContain((0, humanizeString_1.default)('name'));
    expect(react_1.screen.getAllByTestId('col-name')[2].textContent).toContain((0, humanizeString_1.default)('email'));
}));
//test block
test('paginated Prop is rendering without data prop', () => __awaiter(void 0, void 0, void 0, function* () {
    // render the component on virtual dom
    const rawData = [
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
    ];
    (0, react_1.render)(React.createElement(index_1.default, { tableTitle: React.createElement("h1", null, "This is a table header"), paginated: {
            data: rawData,
            total: rawData.length,
            skip: 3,
            take: 3,
        } }));
}));
