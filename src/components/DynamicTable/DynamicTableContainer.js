import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CustomAutocomplete from "./CustomAutocomplete";
import DynamicTable from "./DynamicTable";
import TablePaginator from "./TablePaginator";
import LeftRightAlignContainer from "../common/LeftRightAlignContainer";
import { v4 as uuid } from 'uuid';

export default function DynamicTableContainer() {

    const [tableData, setTableData] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]); // data filtered by dynamic search
    const [loading, setLoading] = useState(true);

    // table pagination and filtering
    const [page, setPage] = useState(0);
    const [rowCount, setRowCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filterData = (filter) => {
        let filteredTableData;

        // x.title is the sample object attribute, tweak according to your data
        if(isNaN(filter) || (filter === "")) {
            filteredTableData = tableData.filter(x => x.title.toLowerCase().includes(filter.toLowerCase()));
        } else {
            filteredTableData = tableData.filter(x => x.title.toString().includes(filter));
        }

        setPage(0);
        setRowCount(filteredTableData.length);
        setFilteredTableData(filteredTableData);
    }

    const onInputChangeHandler = (newInputValue, setOptions) => {

        filterData(newInputValue);

        fetch('https://dummyjson.com/products/search?q='+ newInputValue)
        .then(res => res.json())
        .then(res => {
            let productTitles = res.products.map(product => product.title);
            setOptions(productTitles);
        })
        .catch(err => {
            console.log(err);
        })
    };

    useEffect(() => {
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(res => {

            let products = res.products;

            fetch('https://dummyjson.com/users/')
            .then(res => res.json())
            .then(res => {
                let users = res.users.slice(0, products.length);
                try {
                    let productsUserAssigned = products.map((item, index) => ({
                        ...item,
                        assignedUser: users[index].firstName + " " + users[index].lastName
                    }));

                    setTableData(productsUserAssigned);

                    setFilteredTableData(productsUserAssigned);
                    setRowCount(products.length);
                    setLoading(false);
                } catch(err) {
                    console.log(err);
                }
            })
        })
        .catch(err => console.log(err));
    },[])

    return (
        <Card>
            <Box px={5}>
                {loading && <p>Loading...</p>}
                {!loading &&
                <Box>
                    <LeftRightAlignContainer
                        LeftComponent={
                            <Stack spacing={2} direction="row">
                                <h4>Search Product Data</h4>
                                <CustomAutocomplete
                                    inputLabel={"Type ..."}
                                    onInputChangeHandler={onInputChangeHandler}
                                    customWidth={400}
                                    onBlurHandler={() => {}}
                                />
                            </Stack>
                        }
                        RightComponent={
                            <TablePaginator 
                                page={page}
                                setPage={setPage}
                                rowsPerPage={rowsPerPage}
                                setRowsPerPage={setRowsPerPage}
                                rowCount={rowCount}                        
                            />
                        }
                    />
                    <DynamicTable
                        data={filteredTableData}
                        setData={setTableData}
                        page={page}
                        rowsPerPage={rowsPerPage}
                    />
                    <TablePaginator 
                        page={page}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        rowCount={rowCount}                        
                    />
                </Box>
                }
            </Box>
        </Card>
    )
}