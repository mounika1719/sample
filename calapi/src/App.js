import React, {useState} from 'react'
import {Typography,Button,Grid} from '@material-ui/core'
import './App.css';
import Axios from 'axios'
import EventIcon from '@material-ui/icons/Event';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import TodayIcon from '@material-ui/icons/Today';

const useStyles = makeStyles({
  root: {
    minWidth: 375,
    backgroundColor: "#ADD8E6",
    padding:13,
    borderRadius:'15px',
   margin:'.5em'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 27,
  },
  pos: {
    marginBottom: 13,
  },
  cele:{
    paddingBottom:'5px',
    backgroundColor:"#F0FFFF",
    borderRadius:'13px'
  }
});


const App=()=> {
  const classes = useStyles();

  const[query,setQuery] = useState("");
  const[cal,setCal] = useState(null);

  const url=`http://calapi.inadiutorium.cz/api/v0/en/calendars/default/`


  


 const getData = async()=>{
  const d= new Date(query)
   const result = await Axios.get(url+d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate());
   console.log(url+d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate())
   console.log(result)
   setCal(result.data)
   setQuery("")
 
 } 
 const handleChange =(e)=>{
  setQuery(e.target.value)
  console.log(query)
}

 const onSubmit = e =>{
  e.preventDefault();
  getData();
}

  return (
    <div className="App">
     <Typography variant="h1"><EventIcon style={{ fontSize: 40}} /> calendar</Typography>
     <form className='search-form' onSubmit={onSubmit}>
       <input type='date' placeholder='search' 
       autoComplete="off"
        onChange={handleChange}
        value={query}
        /> 
        <input type='submit' value='search'/>
       </form>

   {cal?
   <Grid item sm={6}>
       <Card className={classes.root} variant="outlined">
      <CardContent>
      <CardActions>
        <Button size="large" variant="contained"><h3>{cal.date}</h3></Button>
      </CardActions>
        <Typography variant="h3" className={classes.title} color="textSecondary" gutterBottom>
        <WbSunnyIcon />  <u>Season:</u> {cal.season}
        </Typography>
        <Typography variant="h3" color="textSecondary" component="h2">
         <WatchLaterIcon/> Week:  {cal.season_week}th
        </Typography>
        <Typography variant="h3" className={classes.pos} color="textSecondary">
        <TodayIcon /> weekday: {cal.weekday}
        </Typography>
      </CardContent>
    </Card>

    <Card className={classes.root}>
    <CardContent>
    <Typography variant="h3" className={classes.cele} component="p">
    Celebrations & Speciality:  
     </Typography>
    <Typography variant="h5" className={classes.root} component="p">
      {cal.celebrations.map(e=><h3>* {e.title}</h3>)}
        </Typography>
        </CardContent>
    </Card>
    </Grid>
    :""
   }
    </div>
  );
}
export default App;
