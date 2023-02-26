import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReactDataTableRDT from './data-table';
import humanize from './utils/humanizeString';

//test block
test('component should not contain any values', async () => {
  // render the component on virtual dom
  render(<ReactDataTableRDT data={[]} columns={[]} />);
  expect(screen.getByTestId('tbody')).toBeInTheDocument();
  expect(screen.getByTestId('thead')).toBeInTheDocument();
});

//test block
test('if the field is not enabled in header, the corresponding value should not render', async () => {
  // render the component on virtual dom
  render(
    <ReactDataTableRDT
      tableTitle={<h1>This is a table header</h1>}
      data={[
        { id: '1', name: 'Arun Rao' },
        { id: '2', name: 'John Doe', email: 'john@example.com' },
      ]}
      columns={[
        { field: 'id', fieldHeader: 'ID' },
        { field: 'name', fieldHeader: 'Name' },
      ]}
    />
  );

  expect(screen.getAllByTestId('row-val')).not.toContain('john@example.com');
});

//test block
test('email field is expected to be empty when the value is absent', async () => {
  // render the component on virtual dom
  render(
    <ReactDataTableRDT
      tableTitle={<h1>This is a table header</h1>}
      data={[
        { id: '1', name: 'Arun Rao' },
        { id: '2', name: 'John Doe', email: 'john@example.com' },
      ]}
      columns={[
        { field: 'id', fieldHeader: 'ID' },
        { field: 'name', fieldHeader: 'Name' },
      ]}
    />
  );

  expect(screen.getAllByTestId('row-val')).not.toContain('john@example.com');
  expect(screen.getAllByTestId('table-row')[0].textContent).toEqual(
    '1Arun Rao'
  );
});

//test block
test('Columns must render with respective object keys with not passed as props', async () => {
  // render the component on virtual dom
  render(
    <ReactDataTableRDT
      tableTitle={<h1>This is a table header</h1>}
      data={[
        { id: '1', name: 'Arun Rao' },
        { id: '2', name: 'John Doe', email: 'john@example.com' },
      ]}
    />
  );

  expect(screen.getAllByTestId('col-name')[0].textContent).toContain(
    humanize('id')
  );
  expect(screen.getAllByTestId('col-name')[1].textContent).toContain(
    humanize('name')
  );
  expect(screen.getAllByTestId('col-name')[2].textContent).toContain(
    humanize('email')
  );
});

//test block
test('paginated Prop is rendering without data prop', async () => {
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
  render(
    <ReactDataTableRDT
      tableTitle={<h1>This is a table header</h1>}
      paginated={{
        data: rawData,
        total: rawData.length,
        skip: 3,
        take: 3,
      }}
    />
  );
});
