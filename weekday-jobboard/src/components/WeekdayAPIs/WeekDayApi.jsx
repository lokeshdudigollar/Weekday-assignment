//this component  is used to fetch data from given api

import React, { useCallback, useEffect, useState } from 'react';

//redux imports
import { storeData, filterData } from '../../redux/actions/ApiActions';
import { useDispatch, useSelector } from 'react-redux';

const WeekDayApi = ({setJobData}) => {

  //declare all state data
  const [loading, setLoading] = useState(false);
  const [error, setError]  = useState('');
 
    //states for handling scrolling data
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);


  //declare redux hook for dispatch
  const dispatch = useDispatch();

  //handle scrolling behaviour using window scroll
  const handleScroll = useCallback(() => {  
    if (
      window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
      loading ||
      !hasMore
    )
      return;
    //setting page state to be used as offset to load more data
    setPage((prevPage) => prevPage + 1);
    

    
  }, [loading, hasMore]);


  //every time there's change in scrolling behaviour useEffect called and updated

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
 
  }, [handleScroll]);


  //This hook is used to fetch data and handle renders and re-renders based on offset
  useEffect(() =>{

    const fetchJobs = async() =>{
      const requestOptions = ({
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "limit": 10,
                "offset": page //is used for loading more data
              })
            
      });
      setLoading(true);
      try{

        //fetching the response from server
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON",requestOptions)

        //check for errors
        if (!response.ok) {
          throw new Error('Failed to fetch job listings');
        }
        
        //load the data in json
        const data = await response.json(); 
        
        //condition to check if more data needs to loaded or  not
        console.log('page',page)
        if (data.jdList.length === 0) {
              setHasMore(false);
        } else {
          if(page == 0){
            //jdList is the  initial list of jobs
            //use this data to update the state
            setJobData(data.jdList);

            //dispath the data to redux api action
            dispatch(storeData(data.jdList));
            
          }else{

            //for loading more data
            //it needs to add  previous data with current data
            setJobData((prevJobs) => [...prevJobs, ...data.jdList]);

            dispatch(storeData((prevJobs) => [...prevJobs, ...data.jdList])); 

          }
                    
        }
                    

      }catch(error){
        setError(error.message);
        console.log(error.message);
      }

      setLoading(false);
    }

    fetchJobs();
  },[page]);


  return (
    <></>
  )
}

export default WeekDayApi;