import { useParams,Link } from 'react-router-dom';
import firebase from "firebase/compat";
import {useEffect,useState,useRef} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {Button, FormControl, FormLabel} from "@mui/material";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "./Details.css";

export default function Details(){
    // uid of actv user
    const {uid} = useParams();
    const collegeList = [ " Birla Institute of Technology, Mesra", "Banaras Hindu University, Varanasi", 
    "Central University of Jharkhand, Ranchi", "Chandigarh University, Mohali",  
    "Delhi Technological University, New Delhi", "Dr. B R Ambedkar National Institute of Technology, Jalandhar", 
    "Dr. C.V. Raman University, Bilaspur", "Gandhi Institute of Technology and Management, Visakhapatnam", 
    "GNA University, Phagwara", "Indian Institute of Information Technology, Allahabad", 
    "Indian Institute of Information Technology, Guwahati", 
    "Indian Institute of Science, Banglore", "Indian Institute of Teacher Education, Gandhinagar", 
    "Indian Institute of Technology, Bombay", "Indian Institute of Technology, Kharagpur", 
    "Indian Statistical Institute, Kolkata", "Indira Gandhi Institute of Medical Science, Patna", 
    "Indraprastha Institute of Information Technology, New Delhi", 
    "Institute of Advanced Research, Gandhinagar", "Institute of Chemical Technology, Mumbai" ,
    "Institute of Infrastructure, Technology, Research and Management, Ahmedabad", 
    "International Institute of Information Technology, Bhubaneswar", "ISBM University, Gariyaband", 
    "Jadavpur University, Kolkata" ];

    const interests = ["competitive programming", "data sructures", "algorithms", "web development", 
    "reactjs", "nodejs", "javascript", "cpp", "html", "css", "expressjs", "firebase", "materialui", "bootstrap",
    "competitive programming", "data sructures", "algorithms", "web development", 
    "reactjs", "nodejs", "javascript", "cpp", "html", "css", "expressjs", "firebase", "materialui", "bootstrap", 
    "competitive programming", "data sructures", "algorithms", "web development", 
    "reactjs", "nodejs", "javascript", "cpp", "html", "css", "expressjs", "firebase", "materialui", "bootstrap",
    "competitive programming", "data sructures", "algorithms", "web development", 
    "reactjs", "nodejs", "javascript", "cpp", "html", "css", "expressjs", "firebase", "materialui", "bootstrap"];
    
    // to check if user is logged in or not
    const auth = firebase.auth();
    const db = firebase.firestore();

    const [user,loading,err] = useAuthState(auth);

    return (
        <div className="Details">
            <div className="form-heading"> User Details </div>
            <div className="form-container">
                <form action="">
                <FormControl fullWidth sx={{fontFamily:"Poppins"}}>
                    <TextField label="Name" defaultValue="Ishan Pandey" margin="normal"/>
                    <TextField label="Bio" defaultValue="Short bio about me" 
                    helperText="*Short bio of you in 50 chars" margin="normal"/>
                    <FormLabel component="legend" >Interests</FormLabel>
                    <div className="interest-container" margin="normal">
                        {interests.map(interest=>
                            <FormControlLabel control={<Checkbox />} label={interest} />)}
                    </div>
                    <TextField select label="College/Univesity" defaultValue="Your college" margin="normal">
                        {collegeList.map(college=>
                            <MenuItem key={college} value={college}>{college}</MenuItem>
                        )}
                    </TextField>
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel component="legend" >Fill Two Programming Languages</FormLabel>
                    <TextField label="Programming Language 1" defaultValue="Some Language" margin="normal"/>
                    <TextField label="Programming Language 2" defaultValue="Some Language" margin="normal"/>
                </FormControl>
                <div className="form-btn">
                    <Button variant="contained">Save</Button>
                </div>
                </form>
            </div>
        </div>
    )
}