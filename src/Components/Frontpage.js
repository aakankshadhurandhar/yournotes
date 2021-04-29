import React, { useState } from 'react'
import {makeStyles} from '@material-ui/styles'
import Moment from 'react-moment';
import Img from '../assests/background.jpg'
const useStyle = makeStyles((theme) => ({
    wrapper:{
        backgroundImage: `url(${Img})`,
        height: '100%',
        width:'100%',
    },
    message:{
        color:'white',
        fontSize:'3rem',
        
    }
}));

function Frontpage() {
    const[hour,setHour]=useState(null)
    const classes=useStyle()
    
   const getHour = () => {
        const date = new Date();
        const hours = date.getHours()
        console.log(hours)
        setHour(hours)
        
       }
    
    return (
        <div className={classes.wrapper}>
            <div className={classes.message}>
            {getHour}
        
        {hour < 12 ? (hour >20? `Good Night,`:`Good Evening,` ): `Good Morning,`}<br></br>
                <Moment format="DD/MM/YYYY"></Moment>
            </div>
        </div>
    )
}

export default Frontpage
