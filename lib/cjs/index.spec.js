"use strict";
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
const react_1 = __importDefault(require("react"));
require("@testing-library/jest-dom");
const react_2 = require("@testing-library/react");
const index_1 = __importDefault(require("./index"));
//test block
test('component should not contain any values', () => __awaiter(void 0, void 0, void 0, function* () {
    // render the component on virtual dom
    (0, react_2.render)(react_1.default.createElement(index_1.default, { rows: [], columns: [] }));
    expect(react_2.screen.getByTestId('tbody')).toBeEmptyDOMElement();
    expect(react_2.screen.getByTestId('thead')).toBeEmptyDOMElement();
}));
//test block
test('if the field is not enabled in header, the corresponding value should not render', () => __awaiter(void 0, void 0, void 0, function* () {
    // render the component on virtual dom
    (0, react_2.render)(react_1.default.createElement(index_1.default, { tableTitle: react_1.default.createElement("h1", null, "This is a table header"), rows: [
            { id: '1', name: 'Arun Rao' },
            { id: '2', name: 'John Doe', email: 'john@example.com' },
        ], columns: [
            { field: 'id', fieldHeader: 'ID' },
            { field: 'name', fieldHeader: 'Name' },
        ] }));
    expect(react_2.screen.getAllByTestId('row-val')).not.toContain('john@example.com');
}));
//test block
test('email field is expected to be empty when the value is absent', () => __awaiter(void 0, void 0, void 0, function* () {
    // render the component on virtual dom
    (0, react_2.render)(react_1.default.createElement(index_1.default, { tableTitle: react_1.default.createElement("h1", null, "This is a table header"), rows: [
            { id: '1', name: 'Arun Rao' },
            { id: '2', name: 'John Doe', email: 'john@example.com' },
        ], columns: [
            { field: 'id', fieldHeader: 'ID' },
            { field: 'name', fieldHeader: 'Name' },
        ] }));
    expect(react_2.screen.getAllByTestId('row-val')).not.toContain('john@example.com');
    expect(react_2.screen.getAllByTestId('table-row')[0].textContent).toEqual('1Arun Rao');
}));
