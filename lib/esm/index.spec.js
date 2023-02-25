var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReactDataTableRDT from './index';
//test block
test('component should not contain any values', () => __awaiter(void 0, void 0, void 0, function* () {
    // render the component on virtual dom
    render(React.createElement(ReactDataTableRDT, { rows: [], columns: [] }));
    expect(screen.getByTestId('tbody')).toBeEmptyDOMElement();
    expect(screen.getByTestId('thead')).toBeEmptyDOMElement();
}));
//test block
test('if the field is not enabled in header, the corresponding value should not render', () => __awaiter(void 0, void 0, void 0, function* () {
    // render the component on virtual dom
    render(React.createElement(ReactDataTableRDT, { tableTitle: React.createElement("h1", null, "This is a table header"), rows: [
            { id: '1', name: 'Arun Rao' },
            { id: '2', name: 'John Doe', email: 'john@example.com' },
        ], columns: [
            { field: 'id', fieldHeader: 'ID' },
            { field: 'name', fieldHeader: 'Name' },
        ] }));
    expect(screen.getAllByTestId('row-val')).not.toContain('john@example.com');
}));
//test block
test('email field is expected to be empty when the value is absent', () => __awaiter(void 0, void 0, void 0, function* () {
    // render the component on virtual dom
    render(React.createElement(ReactDataTableRDT, { tableTitle: React.createElement("h1", null, "This is a table header"), rows: [
            { id: '1', name: 'Arun Rao' },
            { id: '2', name: 'John Doe', email: 'john@example.com' },
        ], columns: [
            { field: 'id', fieldHeader: 'ID' },
            { field: 'name', fieldHeader: 'Name' },
        ] }));
    expect(screen.getAllByTestId('row-val')).not.toContain('john@example.com');
    expect(screen.getAllByTestId('table-row')[0].textContent).toEqual('1Arun Rao');
}));
