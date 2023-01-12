import React, { useContext } from "react";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableRow } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import CustomAutocomplete from "./CustomAutocomplete";
import { AlertContext } from '../../contexts/alert-context';

export default function EditableTableRow({x, i, startEditing, editIdx, updateData}) {
    
    const { alert, setAlert } = useContext(AlertContext);
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

    const currentlyEditing = editIdx === i;

    const onInputChangeHandler = (newInputValue, setOptions) => {
        fetch('https://dummyjson.com/users/search?q='+ newInputValue)
        .then(res => res.json())
        .then(res => {
            let names = res.users.map(user => user.firstName + " " + user.lastName);
            setOptions(names);
            updateData(x, newInputValue);
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    const onBlurHandler = () => {
        fetch('https://dummyjson.com/products/'+ x.id)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setAlert({
                show: true,
                text: res.title + " updated",
                style: "success"
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <StyledTableRow key={`tr-${i}`} selectable={false} sx={{
            backgroundColor: currentlyEditing && "#ffffff",
            boxShadow: currentlyEditing && 6,
            fontWeight: currentlyEditing && "bold"}}
        >
            <StyledTableCell component="th" scope="row">
                <Box>
                    <Stack spacing={1} direction="row">
                        <CustomAutocomplete
                            initialInputValue={x.assignedUser}
                            onBlurHandler={onBlurHandler}
                            onInputChangeHandler={onInputChangeHandler}
                            customWidth={150}
                            onClick={() => startEditing(x, i)}
                        />
                    </Stack>
                </Box>
            </StyledTableCell>

            <StyledTableCell component="th" scope="row">
                {x.id}: {x.title}
            </StyledTableCell>

            <StyledTableCell component="th" scope="row">
                {x.category}
            </StyledTableCell>

            <StyledTableCell component="th" scope="row">
                {x.description}
            </StyledTableCell>

        </StyledTableRow>
    );
    }