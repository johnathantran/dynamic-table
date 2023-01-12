import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete  from '@mui/material/Autocomplete';
import { Popper } from "@mui/material";

export default function CustomAutocomplete({initialInputValue, inputLabel, onBlurHandler, onInputChangeHandler, customWidth}) {
    
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState(initialInputValue);

    const styles = (theme) => ({
        popper: {
           maxWidth: "fit-content",
           padding: 0
        }
    });

    const PopperMy = function (props) {
        return <Popper {...props} style={styles.popper} placement="bottom-start" />;
    };

    useEffect(() => {},[]);

    return (
        <Autocomplete
            PopperComponent={PopperMy}
            size="small"
            disableClearable      
            sx={{ minWidth: customWidth, padding: 0, marginLeft: 0}}
            freeSolo
            options={options}
            filterOptions={(options) => options}
            inputValue={inputValue}
            getOptionLabel={option => option}
            onFocus={() => {
                setOptions([]);
            }}
            
            onChange={(e, value) => {
                console.log(value);
            }}

            onBlur={e => {
                onBlurHandler();
            }}

            onInputChange={(e, newInputValue) => {
                      
                if (newInputValue.length > 30) {
                    return
                }

                setInputValue(newInputValue);
                onInputChangeHandler(newInputValue, setOptions);
            }}

            renderInput={(params) =>
                {
                    return <TextField
                        {...params}
                        label={inputLabel}
                        inputProps={{
                            style: {  fontSize: 13, padding: 0, margin: 0, paddingBottom: 3},
                            ...params.inputProps
                        }}
                        variant="standard"
                    />
                }
            }

            renderOption={(props, option) => (    
                <li {...props}>{option}</li>
            )}
    />
    )
}