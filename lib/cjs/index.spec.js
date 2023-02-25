"use strict";
// import React from 'react';
// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import ReactDataTableRDT from './data-table';
// //test block
// test('component should not contain any values', async () => {
//   // render the component on virtual dom
//   render(<ReactDataTableRDT rows={[]} columns={[]} />);
//   expect(screen.getByTestId('tbody')).toBeEmptyDOMElement();
//   expect(screen.getByTestId('thead')).toBeEmptyDOMElement();
// });
// //test block
// test('if the field is not enabled in header, the corresponding value should not render', async () => {
//   // render the component on virtual dom
//   render(
//     <ReactDataTableRDT
//       tableTitle={<h1>This is a table header</h1>}
//       rows={[
//         { id: '1', name: 'Arun Rao' },
//         { id: '2', name: 'John Doe', email: 'john@example.com' },
//       ]}
//       columns={[
//         { field: 'id', fieldHeader: 'ID' },
//         { field: 'name', fieldHeader: 'Name' },
//       ]}
//     />
//   );
//   expect(screen.getAllByTestId('row-val')).not.toContain('john@example.com');
// });
// //test block
// test('email field is expected to be empty when the value is absent', async () => {
//   // render the component on virtual dom
//   render(
//     <ReactDataTableRDT
//       tableTitle={<h1>This is a table header</h1>}
//       rows={[
//         { id: '1', name: 'Arun Rao' },
//         { id: '2', name: 'John Doe', email: 'john@example.com' },
//       ]}
//       columns={[
//         { field: 'id', fieldHeader: 'ID' },
//         { field: 'name', fieldHeader: 'Name' },
//       ]}
//     />
//   );
//   expect(screen.getAllByTestId('row-val')).not.toContain('john@example.com');
//   expect(screen.getAllByTestId('table-row')[0].textContent).toEqual(
//     '1Arun Rao'
//   );
// });
