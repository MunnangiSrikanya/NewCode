/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CustomPagination from './CustomPagination';
import './Intent.css';

// Define the structure of your card data based on the API response
interface CardData {
  pyID: string;
  pxCreateDateTime: string;
  pyStatusWork: string;
  ClientsName: string | null;
  pxUpdateDateTime: string;
  pxUpdateOpName: string;
  pzInsKey: string;
  // Add other properties from the API response if needed
}

const CardComponent: React.FC = () => {
  const [page, setPage] = useState(1);
  const [intentList, setIntentList] = useState<CardData[]>([]);
  const [rowsPerPage] = useState(5); // Fixed rows per page, adjust as necessary

  useEffect(() => {
    const fetchIntentList = async () => {
      try {
        const ItemList = await PCore.getDataApiUtils().getData('D_IntentList_1', '', 'app/polaris-ec'); // Replace with your actual data fetching logic
        if (ItemList?.status === 200) {
          setIntentList(ItemList?.data?.data || []);
          console.log(ItemList?.data?.data, 'Received Created list for Intent');
        }
      } catch (error) {
        console.error('Error fetching intent list:', error);
      }
    };
    fetchIntentList();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const currentPageRows = intentList.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Define the headers based on the API data
  const headers = [
    { key: 'pyID', label: 'Case ID' },
    { key: 'pxUpdateOpName', label: 'Updated By' },
    { key: 'pzInsKey', label: 'Key' },
    { key: 'pxCreateDateTime', label: 'Created Date' },
    { key: 'pxUpdateDateTime', label: 'Update Date Time' },
    { key: 'pyStatusWork', label: 'Status' }
    // Add other headers as needed
  ];

  return (
    <Grid container className='container'>
      <Grid item xs={12} className='header-row'>
        <Grid container className='card-header'>
          {headers.map((header, index) => (
            <Grid item xs={3} key={index} className='grid-layout'>
              <Typography variant='body1' className='Typography-Header'>
                {header.label}
              </Typography>
              <IconButton size='small' className='Typography-Header'>
                <MoreVertIcon className='Typography-Header' />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {currentPageRows.map((row, index) => (
        <Grid item xs={12} key={index} className='card-grid-item'>
          <Card className='card'>
            <CardContent className='card-content'>
              <Grid container>
                {headers.map(
                  (header, headerIndex) =>
                    header.key !== 'pyStatusWork' && (
                      <Grid item xs={3} key={headerIndex}>
                        <Typography variant='body2' className='card-title'>
                          {header.key === 'ClientsName' && row[header.key] === null ? 'N/A' : row[header.key as keyof CardData]}
                        </Typography>
                      </Grid>
                    )
                )}
                <Grid item xs={3}>
                  <Button variant='contained' className={row.pyStatusWork === 'Submitted' ? 'submitted-button' : 'in-progress-button'}>
                    {row.pyStatusWork}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} className='pagination-container'>
        <CustomPagination count={Math.ceil(intentList.length / rowsPerPage)} page={page} onChange={handleChangePage} />
      </Grid>
    </Grid>
  );
};

export default CardComponent;
