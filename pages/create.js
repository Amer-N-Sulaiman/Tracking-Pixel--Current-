import Head from 'next/head'
import Grid from '@mui/material/Grid'
import Link from 'next/Link'
import Button from '@mui/material/Button'

import CreatePixelCard from '../components/CreatePixelCard.js'

export default function Create(){
    

    return(
        <>
             <Head>
                <title>Create A Tracking Pixel</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Grid container direction="column" style={{marginTop: '70px', alignContent: "center"}}>
                    <Grid item xs={12} sm={6}>
                        <h1 style={{textAlign: 'center'}}>Create a new Tracking Pixel</h1>
                    </Grid>
                    <Grid item xs={10} sm={6} style={{textAlign: "center", marginTop: '30px'}}>    
                        <CreatePixelCard />                   
                    </Grid>
                
                </Grid>
            </main>
        </>
       
    )
}