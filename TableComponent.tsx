import React from 'react';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Button,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'

// Define the type for a column
interface Column {
  headerName:string;
  field: string;
}
interface options {
  [key: string]: string;
  carrierName: string;
  code: string;
  lineofBusiness: string;
}
// Define the type for props
interface TableComponentProps {
  columns: Column[];
  rowData: options[];
  selectedFileType:string;
  handleDelete:(index: number) => void;
}

// Functional component with TypeScript
const TableComponent: React.FC<TableComponentProps> = ({ columns, rowData ,selectedFileType,handleDelete}) => {
  console.log(rowData)
  return (
    <div style={{ padding: '12px' }}>
      <TableContainer style={{ border: '1px solid lightGray' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => (
                <TableCell key={index} style={{ textAlign: 'center' }}>
                  {column.headerName}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns?.length+1}
                  style={{ textAlign: 'center' }}
                >
                  No data
                </TableCell>

              </TableRow>
            ) : (
              rowData?.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      style={{  textAlign: 'center' }}
                    >
                      {row[column.field]}
                    </TableCell>
                  ))}
                   <TableCell style={{ textAlign: 'center' }}>
                      <IconButton onClick={() => handleDelete(index)}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                </TableRow>
              ))
            )}
            {selectedFileType!=='PDL'&& <TableRow>
              <TableCell colSpan={columns.length+1} style={{ border: '1px solid lightGray' }}>
                +
                <Button
                  style={{ color: '#035C67', textDecoration: 'underline', textTransform: 'none' }}
                >
                  {' '}
                  <b>Add New Row</b>
                </Button>
              </TableCell>
            </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
