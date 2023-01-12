import React, {useEffect, useState } from "react";
import { Table, TableBody, TableHead,TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import OutsideClickWrapper from './OutsideClickWrapper';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import EditableTableRow from "./EditableTableRow";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#454545",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));


export default function DynamicTable({ data, setData, page, rowsPerPage }) {

    const [editIdx, setEditIdx] = useState(-1);
    const startEditing = (x, i) => {
        setSelectedDataRow(x);
		setEditIdx(i);
	};

	const stopEditing = () => {
		setEditIdx(-1);
	};
    
    const [selectedDataRow, setSelectedDataRow] = useState(null);

    // updates assigned user
    const updateData = (selectedDataRow, newValue) => {
        let updatedData = data;
        updatedData.find(dataRow => dataRow.id === selectedDataRow.id).assignedUser = newValue;
        setData(updatedData);
    }

    const dynamicSearch = () => {
		let startIdx = (page) * rowsPerPage;
		let endIdx = startIdx + rowsPerPage;
		return data.slice(startIdx, endIdx);
    };

    useEffect(() => {
    }, []);

    return (
    <div>
        <OutsideClickWrapper setEditIdx={setEditIdx}>
            <TableContainer sx={{ maxWidth: "98%", maxHeight: 1500, mx: 1, mb: 1 }}component={Paper}>
                <Table size="small" stickyHeader aria-label="simple table">

                    <TableHead style={{backgroundColor: "black"}} >
                        <StyledTableRow>
                            <StyledTableCell align="left"><p style={{fontWeight: "bold"}}>Assigned User</p></StyledTableCell>
                            <StyledTableCell align="left"><p style={{fontWeight: "bold"}}>Product</p></StyledTableCell>
                            <StyledTableCell align="left"><p style={{fontWeight: "bold"}}>Category</p></StyledTableCell>
                            <StyledTableCell align="left"><p style={{fontWeight: "bold"}}>Description</p></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>

                    <TableBody>
                    {dynamicSearch().map((x, index) =>
                        <EditableTableRow
                            x={x}
                            i={index}
                            startEditing={startEditing}
                            editIdx={editIdx}
                            stopEditing={stopEditing}
                            updateData={updateData}
                        />
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </OutsideClickWrapper>
    </div>
    )
};