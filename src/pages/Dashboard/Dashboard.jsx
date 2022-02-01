import React from 'react'

import { Grid, Typography } from '@mui/material'

const Dashboard = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" component="h1" gutterBottom >Dashboard</Typography>
            </Grid>
        </Grid>
    )
}

export default Dashboard