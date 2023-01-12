import React, { useContext } from "react";
import Box from "@mui/material/Box";
import DynamicTableContainer from "./DynamicTable/DynamicTableContainer";
import CustomAlert from '../components/common/CustomAlert';
import { AlertContext } from '../contexts/alert-context';

export default function HomePage() {

    const { alert, setAlert } = useContext(AlertContext);

    const handleResetAlertShow = () => {
		setAlert({
			...alert,
			show: false,
		});
	};

    return (
        <div className='jumbotron' style={{ padding: 20 }}>
            <Box px={5}>
                <h2>Dynamic Table</h2>

                <p>Example of a data table featuring: </p>
                <li>Autocomplete search</li>
                <li>Dynamic searching</li>
                <li>Editable rows</li>
                <li>Table pagination</li>
                <br />

                <DynamicTableContainer />
                {alert.show && <CustomAlert alertStyle={alert.style} alertNote={alert.text} autoHide={1000} onClose={handleResetAlertShow} />}
                <br />
            </Box>
        </div>
    )
}