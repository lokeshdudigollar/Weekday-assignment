//This component is used to render main UI on the frontend

import React, {useEffect, useState } from 'react';

//load the data stored in Data folder
import { jobRoles, jobLocations } from '../../FilterData/FilterData';


//load materialUI
import { CircularProgress,Grid,Dialog,DialogTitle,DialogContent,DialogActions, } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



//Home gets the JobData prop from WeekDayApi
function Home({ jobData }) {

  const [loading, setLoading] = useState(false);
  const [error, setError]  = useState('');
  
    //states to show full job details
  const [selectedJob, setSelectedJob] = useState(null);
  const [open, setOpen] = useState(false);

  
    //states to be used for filtering data based on user selection
  const [roles, setRoles] = useState([]);
  const [location, setLocation]  = useState([])
  const [exp, setExp]  = useState([]);
  const [pay, setPay]  = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([])

  //This function is used to display limited job details text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  //This function is used to show more details of job through popup
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  //To close popup
  const handleClose = () => {
    setOpen(false);
  };


  //recording change in user selections for jobRole
  const handleRoleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRoles(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  };

  //recording change in user selections for Locations
  const handleLocationChange = (event) => {
    const {
      target: { value },
    } = event;
    setLocation(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  };

  //recording change in user selections for Experience
  const handleExpChange = (event) => {
    setExp([...exp, event.target.value]);
  }

  //recording change in user selections for Minimum Base Pay
  const handlePayChange = (event) =>{
    setPay([...pay,event.target.value]);
  }

  const handlefilterJobs = () =>{
    //Apply filters
    //or operator is used so user can filter with either of the inputs
    const filteredJobsData = jobData.filter((job) => 
                                roles.includes(job.jobRole) ||
                                location.includes(job.location) ||
                                exp.includes(job.minExp) ||
                                pay.includes(job.minJdSalary)                         
                                
                            );
        //update the state data to capture the filtered data
        setFilteredJobs(filteredJobsData);
    }

    //to make sure above function is called whenever there's change in user selections
   useEffect(handlefilterJobs,[roles,location, exp, pay])

  

  return (
    <div>
        <div>
            {/*using materialUI grid and FormControls to show the filter options*/}
            {/*each FormControl has different filter input*/}
            <Grid container spacing={3} alignItems="center">
                <Grid item sx={{marginLeft:'100px'}}>
                    <p>Filter:</p>
                </Grid>
                <Grid item>
                    <FormControl sx={{ m: 2, width: 200 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            multiple
                            value={roles}
                            onChange={handleRoleChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                        {jobRoles.map((role) =>(
                            <MenuItem key={role} value={role}>
                                <Checkbox checked={roles.indexOf(role) > -1} />
                                <ListItemText primary={role} />
                            </MenuItem>
                        
                        ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 2, width: 200 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Locations</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            multiple
                            value={location}
                            onChange={handleLocationChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                        {jobLocations.map((loc) =>(
                            <MenuItem key={loc} value={loc}>
                                <Checkbox checked={location.indexOf(loc) > -1} />
                                <ListItemText primary={loc} />
                            </MenuItem>
                        
                        ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 2, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Experience</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            autoWidth
                            value={exp}
                            onChange={handleExpChange}
                            >
                            <MenuItem value={0}>Fresher</MenuItem>
                            <MenuItem value={1}>1 year</MenuItem>
                            <MenuItem value={2}>2 years</MenuItem>
                            <MenuItem value={3}>3 years</MenuItem>
                            <MenuItem value={4}>4 years</MenuItem>
                            <MenuItem value={5}>5 years</MenuItem>
                            <MenuItem value={9999999}>5+</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 2, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Minimum Base Pay</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            autoWidth
                            value={pay}
                            onChange={handlePayChange}
                            >
                            <MenuItem value={3}>3 USD</MenuItem>
                            <MenuItem value={15}>15 USD</MenuItem>
                            <MenuItem value={23}>23 USD</MenuItem>
                            <MenuItem value={26}>26 USD</MenuItem>
                            <MenuItem value={35}>35 USD</MenuItem>
                            <MenuItem value={61}>61 USD</MenuItem>
                            <MenuItem value={64}>64 USD</MenuItem>
                            <MenuItem value={9999999}>64 USD+</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>  
            </Grid>
            
        </div>

        <div>
            {loading && !error && !jobData.length ? (
                <CircularProgress />
            ): error? (
                <h2>{error}</h2>

            ) : (
                <Grid container spacing={3} alignItems="center">
                {/*if there's filter data that is rendered else full jobData is rendered*/}
                {/*Since there's no company name coming from API, Weekday is used for all jobs*/}
                {/*the data is mapped to get each job's details*/}
                {(filteredJobs.length ? filteredJobs : jobData).map((job, index) => (
                        <Grid item xs={12} sm={6} md={4} key ={index}>
                            <Card sx={{maxWidth: '100%', margin: '20px'}}>
                                <CardContent>
                                <Typography  gutterBottom variant="h5" component="h2">
                                    {"Weekday"}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h5">
                                    {job.jobRole}
                                </Typography>
                                <Typography sx={{fontSize:'15px'}} gutterBottom variant="h6" component="h6">
                                    {job.location}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {truncateText(job.jobDetailsFromCompany, 100)}
                                </Typography>
                                <Button sx={{marginLeft:'100px'}} size="small" color="primary" onClick={() => handleViewDetails(job)}>
                                    View job
                                </Button>
                                <Typography gutterBottom variant="h7" component="h6">
                                    {job.minExp  === null ? 
                                        (
                                            "No Experience Required"
                                        ) : (
                                            `Experience required: ${job.minExp}-${job.maxExp} years`

                                        )
                                    }
                                    
                                </Typography>
                                <Button sx={{marginLeft:'100px'}} size="small" color="primary" variant="outlined">
                                    Apply Now
                                </Button>
                                </CardContent>

                            </Card>
                        </Grid>

                    ))}
                
                    {loading && <CircularProgress />}
                </Grid>
            )}

            {/*To display popup*/}
            <Dialog open={open} onClose={handleClose} aria-labelledby="job-details-dialog-title">
                <DialogTitle id="job-details-dialog-title">{`Job Role: ${selectedJob?.jobRole}`}</DialogTitle>
                <DialogContent>
                <Typography variant="body1">{"Details of Job:"}</Typography><br />
                <Typography variant="body1">{selectedJob?.jobDetailsFromCompany}</Typography>
                
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        </div>
      
      
    </div>
  );
}

export default Home;
