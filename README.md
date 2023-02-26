![github_cover](https://user-images.githubusercontent.com/4560500/221427285-ab662d6b-f96b-4471-a73a-4cefc9e9bf48.png)

# React Data Table(RDT)

## React Tables on steroids, build a powerful table with all flexibility and customization out of the box.

-----------

## Getting started

<pre>npm i react-datatable-rdt@latest</pre>

<pre>import ReactDataTableRDT from 'react-datatable-rdt'</pre> 

Once you are done with importing, you can start using the `<ReactDataTableRDT />` component.

### Mandatory Props
``` 
  /*
    @tableTitle adds some text above the table, it could be a any HTML/JSX tag or a string
    Optional
    */
  tableTitle?: ReactNode | string;

  /*
    @columns accepts a array of objects, every object must have field and fieldHeader
    IMPORTANT: The field value will be used to map the rows.
    */
  columns?: string | columnType[];

  /*
    @selectable makes all the rows selectable with a visible checkbox
    default: false;
    Optional
    */
  selectable?: boolean;
  
  /*
  @getSelectedRow is a function which gives all the selected rows by the user.
  */
  getSelectedRow?: (selectedRows: dataType[]) => void;

  conditional Props:
  IMPORTANT: You can only pass data prop or paginated prop, not both.

  data: dataType[];

  /* 
  perPageSize: number of rows
  @default: 5

   */
  perPageSize?: number;
  
  /*
  pagined: if you use this prop,  you cant use data prop
  */
  paginated: {
    data: dataType[];
    total: number;
    skip: number;
    take: number;
  };


  ```

## Basic Usage

```
import React, { useState } from 'react';
import ReactDataTableRDT, { dataType } from 'react-datatable-rdt';

const App = () => {
  const [rawData] = useState<dataType[]>([
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
  ]);

  return (
    <>
      <div style={{ margin: '20px' }}>
        {rawData && (
          <ReactDataTableRDT
            tableTitle={<h1>This is a table header</h1>}
            selectable
            columns={[
              { field: 'id', fieldHeader: 'ID' },
              { field: 'firstName', fieldHeader: 'First Name' },
              { field: 'lastName', fieldHeader: 'last Name' },
              { field: 'age', fieldHeader: 'Age' },
            ]}
            data={rawData}
            getSelectedRow={(rows) => console.log('rows->', rows)}
          />
        )}
      </div>
    </>
  );
};

export default App;

```

## How to contribute?

- Clone this repository or fork this repository
- make your changes in a new branch
- create a Pull Request


## Contributors

- Arun Rao [Github](https://github.com/arunkp) - [Linkedin](https://www.linkedin.com/in/arunraokalya)
