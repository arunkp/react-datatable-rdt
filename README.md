# React Data Table RDT

## React Tables on steroids, build a powerful table with all flexibility and customization out of the box.

-----------

## Getting started

<pre>npm i react-datatable-rdt</pre>

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

## Example

```

<ReactDataTableRDT
    tableTitle={<h1>This is a table header</h1>}
    rows={[
        { id: '1', name: 'Arun Rao',  email: 'arun@example.com' },
        { id: '2', name: 'John Doe', email: 'john@example.com' },
    ]}
    columns={[
        { field: 'id', fieldHeader: 'ID' },
        { field: 'name', fieldHeader: 'Name' },
        { field: 'email', fieldHeader: 'Email' },
    ]}
    />

```

## How to contribute?

- git clone this repository or fork this repository
- make your changes in a new branch
- create a Pull Request


## Contributors

- [Arun Rao](https://www.linkedin.com/in/arunraokalya)
