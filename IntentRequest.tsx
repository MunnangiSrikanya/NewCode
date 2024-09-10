/* eslint-disable */
import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import {
  Card,
  Grid,
  Divider,
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem,
  TextField,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomPagination from './CustomPagination';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DragIndicatorOutlinedIcon from '@material-ui/icons/DragIndicatorOutlined';
import './Intent.css';
import { ColDef } from 'ag-grid-community';
import { withStyles } from '@material-ui/styles';
import ButtonGroupComponent from './ButtonGroupComponent';
import { ExpandMore } from '@material-ui/icons';
// Type for the column definition
interface ColumnDef {
  headerName: string;
  field: string;
  cellRenderer?: (params: any) => JSX.Element;
}

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 13
  }
}))(Tooltip);
interface RequestData {
  pyID: string;
  pxCreateDateTime: string;
  pyStatusWork: string;
  ClientsName: string | null;
  pxUpdateDateTime: string;
  pxUpdateOpName: string;
  pxCreateOpName: string;
}

const getColumns = (): ColDef[] => [
  { headerName: 'Case ID', field: 'pyID' },
  { headerName: 'Clients Name', field: 'ClientsName' },
  { headerName: 'Updated Date', field: 'pxUpdateDateTime' },
  { headerName: 'Updated Name', field: 'pxUpdateOpName' },
  { headerName: 'Created Name', field: 'pxCreateOpName' },
  { headerName: 'Created Date', field: 'pxCreateDateTime' },
  {
    headerName: 'Status',
    field: 'pyStatusWork',
    cellRenderer: (params: any) => {
      const { textColor, backgroundColor } = getStatusStyles(params.value);
      const icon = getStatusIcon(params.value);
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginTop: '0.2rem',
            backgroundColor,
            lineHeight: 0,
            padding: '4px',
            borderRadius: '4px'
          }}
        >
          {icon}
          <span style={{ color: textColor }}>{params.value}</span>
        </div>
      );
    }
  }
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Submitted':
      return {
        textColor: 'green',
        backgroundColor: 'lightgreen'
      };
    case 'In Progress':
      return {
        textColor: 'orange',
        backgroundColor: 'lightyellow'
      };
    case 'Not Submitted':
      return {
        textColor: 'red',
        backgroundColor: 'lightcoral'
      };
    default:
      return {
        textColor: 'gray',
        backgroundColor: 'lightgray'
      };
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Submitted':
      return <CheckCircleOutlinedIcon style={{ color: 'green' }} />;
    case 'In Progress':
      return <AccessTimeOutlinedIcon style={{ color: 'orange' }} />;
    case 'Not Submitted':
      return <CancelOutlinedIcon style={{ color: 'red' }} />;
    default:
      return <DragIndicatorOutlinedIcon style={{ color: 'gray' }} />;
  }
};

const IntentRequests: React.FC = () => {
  const [pageTable, setPageTable] = useState<number>(1);
  const [pageCard, setPageCard] = useState<number>(1);
  const [rowsPerPage] = useState<number>(10);
  const [requestData, setRequestData] = useState<RequestData[]>([]);
  const [alignment, setAlignment] = useState<'tableView' | 'gridView'>('tableView');
  const gridRef = useRef<AgGridReact | null>(null);
  const [caseValue, setCaseValue] = useState<string>('Month-to-Date');
  const [sortValue, setSortValue] = useState<string>('Case ID');
  const [selectedCaseType, setSelectedCaseType] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ItemList = await PCore.getDataApiUtils().getData('D_IntentList_1', '', 'app/polaris-ec'); // Replace with your actual data fetching logic
        if (ItemList?.status === 200) {
          setRequestData(ItemList?.data?.data || []);
          console.log(ItemList?.data?.data, 'Received Created list for Intent');
        }
      } catch (error) {
        console.error('Error fetching intent list:', error);
      }
    };
    fetchData();
  }, []);

  const handleChangePageTable = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPageTable(newPage);
  };

  const handleChangePageCard = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPageCard(newPage);
  };

  const handleCaseChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCaseValue(event.target.value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSortValue(event.target.value);
  };

  const handleSelectedCaseType = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCaseType(event.target.value);
  };

  const currentPageRowsTable = requestData.slice((pageTable - 1) * rowsPerPage, pageTable * rowsPerPage);
  const currentPageRowsCard = requestData.slice((pageCard - 1) * rowsPerPage, pageCard * rowsPerPage);

  return (
    <Grid container spacing={2} style={{ justifyContent: 'space-between' }}>
      <Grid item xs={2}>
        <p>Filter your search</p>
        <Divider />
        <div>
          <div className='header-display'>
            <p>Cases Within</p>
            <a href='#' className='clear'>
              Clear all
            </a>
          </div>
          <div className='data-display'>
            <RadioGroup aria-label='cases-within' name='cases-within' value={caseValue} onChange={handleCaseChange}>
              <FormControlLabel value='Month-to-Date' control={<Radio color='default' />} label='Month-to-Date' />
              <FormControlLabel value='Last three months' control={<Radio color='default' />} label='Last three months' />
              <FormControlLabel value='Year-to-Date' control={<Radio color='default' />} label='Year-to-Date' />
              <FormControlLabel value='Custom Date Range' control={<Radio color='default' />} label='Custom Date Range' />
            </RadioGroup>
          </div>
        </div>
        <Divider />
        <div>
          <div className='header-display'>
            <p>Sort By</p>
            <a href='#' className='clear'>
              Clear all
            </a>
          </div>
          <div className='data-display'>
            <RadioGroup aria-label='sort-by' name='sort-by' value={sortValue} onChange={handleSortChange}>
              <FormControlLabel value='Case ID' control={<Radio color='default' />} label='Case ID' />
              <FormControlLabel value='Submitted Date' control={<Radio color='default' />} label='Submitted Date' />
            </RadioGroup>
            <TextField
              select
              label='Enter Case Type'
              size='small'
              margin='normal'
              variant='outlined'
              value={selectedCaseType}
              onChange={handleSelectedCaseType}
              className='text-field'
            >
              <MenuItem value='Type 1'>Type 1</MenuItem>
              <MenuItem value='Type 2'>Type 2</MenuItem>
            </TextField>
          </div>
        </div>
      </Grid>
      <Grid item xs={10}>
        {alignment === 'tableView' && (
          <>
            <ButtonGroupComponent setPageCard={setPageCard} setPageTable={setPageTable} alignment={alignment} setAlignment={setAlignment} />
            <div className='ag-theme-alpine table-view'>
              <AgGridReact ref={gridRef} rowData={currentPageRowsTable} columnDefs={getColumns()} pagination={false} domLayout='autoHeight' />
            </div>
            <CustomPagination count={Math.ceil(requestData.length / rowsPerPage)} page={pageTable} onChange={handleChangePageTable} />
          </>
        )}

        {alignment === 'gridView' && (
          <>
            <Accordion defaultExpanded>
              <AccordionSummary
                aria-controls='panel1a-content'
                id='panel1a-header'
                style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
              >
                <h2 className='reasearch-filters'>
                  <ExpandMore fontSize='large' style={{ marginRight: 1 }} />
                </h2>
                <h2 className='reasearch-filters'>Research Filters</h2>
              </AccordionSummary>
              <AccordionDetails>
                <img src='assets\img\ResearchFilter.svg' alt='Research Filter' width='100%' height='auto' />
              </AccordionDetails>
            </Accordion>
            <ButtonGroupComponent setPageCard={setPageCard} setPageTable={setPageTable} alignment={alignment} setAlignment={setAlignment} />
            {currentPageRowsCard.map(item => (
              <Card key={item.pyID} className='grid-view'>
                <div className='card-display'>
                  <div>
                    <p>Case #</p>
                    <LightTooltip title={item.pyID} placement='top-start'>
                      <h4 className='id-display'> {item.pyID}</h4>
                    </LightTooltip>
                    <p>
                      {' '}
                      On {item.pxCreateDateTime} | For {item.pxCreateOpName}
                    </p>
                  </div>
                  <div>
                    {' '}
                    <p>Case Type</p>
                    {/* <LightTooltip title={item} placement='top-start'>
                      <p>{item}</p>
                      </LightTooltip> */}
                  </div>
                </div>
                <div className='card-display'>
                  <div>
                    <p>Filename</p>
                    {/* <LightTooltip title={item} placement='top-start' className='custom-tooltip'>
                      <p>{item}</p>
                      </LightTooltip> */}
                  </div>
                  <div>
                    <p>Effective Date</p>
                    <LightTooltip title={item.pxUpdateDateTime} placement='top-start'>
                      <p>{item.pxUpdateDateTime}</p>
                    </LightTooltip>
                  </div>
                </div>
                <Divider />
                <div
                  className='status-display'
                  style={{
                    backgroundColor: getStatusStyles(item.pyStatusWork).backgroundColor
                  }}
                >
                  {getStatusIcon(item.pyStatusWork)}
                  <p style={{ color: getStatusStyles(item.pyStatusWork).textColor }}>{item.pyStatusWork}</p>
                </div>
              </Card>
            ))}
            <CustomPagination count={Math.ceil(requestData.length / rowsPerPage)} page={pageCard} onChange={handleChangePageCard} />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default IntentRequests;
