import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';


import {useState} from 'react'

import { setCookie, getCookie, hasCookie } from 'cookies-next';

const WatchOpensCard = ()=>{

    const { push } = useRouter();

    const [step, setStep] = useState(1);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [wrongPassword, setWrongPassword] = useState(false)

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
                                    style={{margin: '10px'}}
                                />
                                <TextField
                                    required
                                    id="password-1"
                                    label="Password"
                                    defaultValue={tempPassword}
                                    onChange={(e)=>setTempPassword(e.target.value)}
                                    placeholder="Enter Your Password"
                                    type='password'
                                    variant="standard"
                                    style={{margin: '10px'}}
                                />
                                {wrongPassword && <Typography sx={{ fontSize: 12, color: 'red' }} gutterBottom>
                                    Wrong Id Or Password
                                </Typography>}
                            </CardContent>
                            <CardActions>
                                <Button size="large" onClick={submitCreds} style={{margin: '10px'}}>Submit</Button>
                                <Button size="small" style={{margin: '10px'}} onClick={()=>push('/create')}>Create New Tracking ID</Button>
                                {hasCookie('trackingId') && <Tooltip title={getCookie('trackingId')}>
                                        <Button size="large" onClick={()=>push('/opens')} style={{margin: '10px'}}>Use Saved ID</Button>
                                    </Tooltip>}
                            </CardActions>
                        </>
    function submitCreds(){
        const body = JSON.stringify({ 
            "user_id": tempTrackingId,
            "password": tempPassword 
        })
        console.log(body)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body
        };
        fetch("https://amersulaimantrackingpixel.pythonanywhere.com/opens", requestOptions).then((response)=>{
            response.json().then((data)=>{
                if (data.e!=='wrong id or password'){
                    // set cookies
                    setCookie('trackingId', tempTrackingId)
                    setCookie('password', tempPassword)
                    setWrongPassword(false);
                    setTrackingId(tempTrackingId);
                    setPassword(tempPassword);
                    setStep(4)
                } else {
                    setWrongPassword(true)
                }
            })
        })
    }

    // Step 2
    const step2Content = <>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Step 1: Create a New Tracking Id
                                </Typography>
                                <TextField
                                    required
                                    id="recipientAddress"
                                    label="New Password"
                                    defaultValue={tempPassword}
                                    onChange={(e)=>setTempPassword(e.target.value)}
                                    placeholder="Create a New Password"
                                    type="password"
                                    variant="standard"
                                    style={{marginRight: '20px'}}
                                />
                                
                            </CardContent>
                            <CardActions>
                                <Button size="large" onClick={createNewCreds}>Submit</Button>
                            </CardActions>
                        </>
    function createNewCreds(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: tempPassword })
          };
          fetch("https://amersulaimantrackingpixel.pythonanywhere.com/createId", requestOptions)
            .then((response)=>response.json())
            .then((data)=>{
                const localTempTrackingId = data.user_id
                const localTempPassword = tempPassword
                // set cookies
                setCookie('trackingId', localTempTrackingId);
                setCookie('password', localTempPassword)
                setTrackingId(localTempTrackingId)
                setPassword(localTempPassword)
                setStep(3);
            })
    }


    // Step 3
    const step3Content = <>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Here is your New Tracking ID (Don&apos;t lose it)
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} gutterBottom>
                                    {trackingId}
                                </Typography>
                                
                            </CardContent>
                            <CardActions>
                                <Button size="large" onClick={()=>{setStep(4)}}>Next</Button>
                            </CardActions>
                        </>


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
                                <Button size="large" onClick={()=>{
                                    setStep(5);
                                    setCookie('recipAddress', recipAddress);
                                }}>Submit</Button>
                            </CardActions>
                        </>

    // Step 5
    const step5Content = <>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Embed this Image Tag in The Email You Send
                                </Typography>
                                <Typography id='image-tag'>
                                    {'<img src="https://amersulaimantrackingpixel'}<br/>{'.pythonanywhere.com/'}<br/>{getCookie('trackingId')}<br/>{ '/' + recipAddress + '/getpixel.png" />'}
                                </Typography>
                                
                            </CardContent>
                            <CardActions>
                                <Button size="large" onClick={()=>setStep(1)}>Done</Button>
                                <Button size="large" onClick={() => {navigator.clipboard.writeText(document.getElementById("image-tag").innerText.replaceAll('\n', ''))}}>Copy To Clipboard</Button>
                            </CardActions>
    </>

    return(
        <Card sx={{ minWidth: 275 }}>
            { step===1 && step1Content }
            { step===2 && step2Content }
            { step===3 && step3Content }
            { step===4 && step4Content }
            { step===5 && step5Content }
      
      
        </Card>
    )

    
}

export default WatchOpensCard;