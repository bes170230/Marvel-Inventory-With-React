import React, {useState} from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { MarvelForm } from '../../components';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 130 },
  {
    field: 'name',
    headerName: 'Movie',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'release_date',
    headerName: 'Release Date',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'runtime',
    headerName: 'Runtime',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'budget',
    headerName: 'Budget',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'director',
    headerName: 'Director',
    type: 'number',
    width: 110,
    editable: true,
  },
  
];

interface gridData {
  data: {
    id?:string;
  }
}

export const DataTable = () => {
 let { marvelData, getData } = useGetData();
 let [open, setOpen] = useState(false);
 let [gridData, setData] = useState<GridSelectionModel>([])

 let handleOpen = () => {
   setOpen(true);
 }

 let handleClose = () => {
  setOpen(false);
}

let deleteData = async () => {
  await serverCalls.delete(`${gridData[0]}`)
  getData();
}

console.log(gridData) // A list of IDs from checked rows

  return (
      <div style={{ height: 400, width: '100%' }}>
          <h2>Movies In Inventory</h2>
        <DataGrid
          rows={marvelData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={newSelectionModel => setData(newSelectionModel)}
          {...marvelData}
        />
        <Button onClick={handleOpen} color='primary'>Update</Button>
        <Button onClick={deleteData} color='warning'>Delete</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Update a Movie</DialogTitle>
          <DialogContent>
            <DialogContentText>Updating Movie ID: {gridData[0]}</DialogContentText>
          <MarvelForm id={`${gridData[0]}`} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }