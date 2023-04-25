import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import {useState} from 'react'


const CreatePixelCard = ()=>{

    const [step, setStep] = useState(1);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const [trackingId, setTrackingId] = useState('')
    const [password, setPassword] = useState('')

    const [tempTrackingId, setTempTrackingId] = useState('')
    const [tempPassword, setTempPassword] = useState('')
    const [recipAddress, setRecipAddress] = useState('')

    // check if there are cookies for trackingid then ask if to use it or another one in a separate step
    const step1Content = <>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Step 1: Enter your Tracking ID Information
                                </Typography>
                                <TextField
                                    required
                                    id="tracking-id"
                                    label="Tracking ID"
                                    defaultValue={tempTrackingId}
                                    onChange={(e)=>setTempTrackingId(e.target.value)}
                                    placeholder="Enter Your Tracking ID"
                                    variant="standard"
                                    style={{marginRight: '20px'}}
                                />
                                <TextField
                                    required
                                    id="password-1"
                                    label="Password"
                                    defaultValue={tempPassword}
                                    onChange={(e)=>setTempPassword(e.target.value)}
                                    placeholder="Enter Your Password"
                                    variant="standard"
                                />
                            </CardContent>
                            <CardActions>
                                <Button size="large" onClick={submitCreds}>Submit</Button>
                                <div style={{width: '20px'}}></div>
                                <Button size="small">Create New Tracking ID</Button>
                            </CardActions>
                        </>
    function submitCreds(){

        // Authenticate First
        setTrackingId(tempTrackingId);
        setPassword(tempPassword);

        // Set cookies first
        setStep(4)
    }



    // Step 4
    const step4Content = <>

                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Step 2: Enter the recipient&apos;s email address
                                </Typography>
                                <TextField
                                    required
                                    id="recipientAddress"
                                    label="Recipient Email Address"
                                    defaultValue={recipAddress}
                                    onChange={(e)=>setRecipAddress(e.target.value)}
                                    placeholder="Enter The Recipient Email Address"
                                    variant="standard"
                                    style={{marginRight: '20px'}}
                                />
                                
                            </CardContent>
                            <CardActions>
                                <Button size="large" onClick={submitRecipAddress}>Submit</Button>
                            </CardActions>
                        </>
    function submitRecipAddress(){
        setStep(5)
    }

    const step5Content = <>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Embed this Image Tag in The Email You Send
                                </Typography>
                                <Typography>
                                    {'<img src="https://amersulaimantrackingpixel.pythonanywhere.com/' + trackingId + '/' + recipAddress + '/getpixel.png" />'}
                                </Typography>
                                
                            </CardContent>
                            <CardActions>
                                <Button size="large" onClick={submitRecipAddress}>Submit</Button>
                            </CardActions>
    </>

    return(
        <Card sx={{ minWidth: 275 }}>
            {step===1 && step1Content}
            {step===4 && step4Content}
            {step===5 && step5Content}
      
      
        </Card>
    )

    
}

export default CreatePixelCard;