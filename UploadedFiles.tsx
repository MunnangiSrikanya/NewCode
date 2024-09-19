import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete'

interface Column {
  headerName: string;
  field: string;
}

interface RowData {
  [key: string]: string;
  Filename: string;
  EffectiveDate: string;
  OpenEnrollmentDate: string;
}

const columns: Column[] = [
  { headerName: 'Filename', field: 'Filename' },
  { headerName: 'Effective Date', field: 'EffectiveDate' },
  { headerName: 'Open Enrollment Date', field: 'OpenEnrollmentDate' },
];
interface uploadFileProps {
  applyToAll: boolean;
  effectiveDate: string;
  openEnrollmentDate: string;
}
const UploadedFiles: React.FC<uploadFileProps> = ({
  applyToAll,
  effectiveDate,
  openEnrollmentDate,
}) => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const uploadedFiles = useSelector((state: any) => state?.file?.uploadedFiles);

  useEffect(() => {
    const formattedData: RowData[] = uploadedFiles.map((file: any) => ({
      Filename: file.name,
      EffectiveDate: applyToAll ? effectiveDate : '',
      OpenEnrollmentDate: applyToAll ? openEnrollmentDate : '',
    }));
    setRowData((prev) => [...prev, ...formattedData]);
  }, [uploadedFiles]);
  useEffect(() => {
    if (applyToAll) {
      setRowData((prev) =>
        prev.map((row) => ({
          ...row,
          EffectiveDate: effectiveDate,
          OpenEnrollmentDate: openEnrollmentDate,
        }))
      );
    }
  }, [applyToAll, effectiveDate, openEnrollmentDate]);
  const handleDelete = (index: number) => {
    setRowData((prevData) => prevData.filter((_, i) => i !== index));
  };
  return (
    <Accordion defaultExpanded style={{ boxShadow: 'none' }}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 0,
        }}
      >
        <h2 className="research-filters">
          <ExpandMore fontSize="large" style={{ marginRight: 1 }} />
        </h2>
        <h2 className="research-filters">{rowData.length === 0 ? 'Files' : 'Files Uploaded'}</h2>
      </AccordionSummary>
      <AccordionDetails>
        <div className="ag-theme-alpine" style={{ width: '100%', padding: '12px' }}>
          <TableContainer style={{ border: '1px solid lightGray' }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      style={{  textAlign: 'center' }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      style={{ textAlign: 'center' }}
                    >
                      No data
                    </TableCell>
                  </TableRow>
                ) : (
                  rowData.map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.field}
                          style={{  textAlign: 'center' }}
                        >
                          {column.field === 'EffectiveDate' ||
                          column.field === 'OpenEnrollmentDate' ? (
                            <TextField
                              type="date"
                              value={row[column.field]}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setRowData((prev) => {
                                  const updatedRow = { ...prev[index], [column.field]: newValue };
                                  return [
                                    ...prev.slice(0, index),
                                    updatedRow,
                                    ...prev.slice(index + 1),
                                  ];
                                });
                              }}
                              variant="outlined"
                              size="small"
                            />
                          ) : (
                            row[column.field]
                          )}
                        </TableCell>
                      ))}
                      <TableCell style={{ textAlign: 'center' }}>
                        <IconButton onClick={() => handleDelete(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default UploadedFiles;
