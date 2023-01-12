
import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

// aligns 2 components to the left and right of its container
export default function LeftRightAlignContainer({ LeftComponent, RightComponent }) {

    return(
        <Grid sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1, pr: 1, pl: 1}} container>
            <Stack spacing={1} direction="row">
                {LeftComponent}
            </Stack>
            <Grid item xs>                                 
                <Stack spacing={1} sx={{display: 'flex', alignItems: 'center'}} direction="row-reverse">   
                    {RightComponent}
                </Stack>
            </Grid>
        </Grid>
    )
}