/* eslint-disable */
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from '@material-ui/core';
import React from 'react';

// Define a type for the column prop
interface Column {
  field: string;
}

interface TableComponentProps {
  columns: Column[];
}

const TableComponent: React.FC<TableComponentProps> = ({ columns }) => {
  return (
    <div>
      <TableContainer style={{ border: '1px solid lightGray' }}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} style={{ borderRight: '1px solid lightGray' }}>
                  {column.field}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='right'>No items for the filters applied</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
