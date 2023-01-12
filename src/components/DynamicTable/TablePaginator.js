import React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function TablePaginator(props) {

  let page = props.page;
  let rowsPerPage = props.rowsPerPage;

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.setRowsPerPage(parseInt(event.target.value, 10));
    props.setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={props.rowCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
