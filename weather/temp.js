import React,{useEffect, useState} from 'react'
import Weathercard from './weathercard';
import "./style.css";

const Temp = () => {
    const[searchValue,setSearchValue]=useState("noida");
    const[tempInfo,setTempInfo]=useState({});
    const getWeatherInfo= async ()=>{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=5ca46300c2b17af4858ad7e68a2b94be`;
            let res = await fetch(url);
            let data = await res.json();
            const {temp,humidity,pressure}= data.main;
            const {main:weathermood}= data.weather[0];
            const{name}=data;
            const{speed}=data.wind;
            const{country,sunset}=data.sys;
            const myNewWeather ={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(myNewWeather);
            console.log(temp);
        }
        catch(error){
            console.log(error);
        }

    };
    useEffect(()=>
    {getWeatherInfo();
    },[]);


  return (

  <>
  <div className="wrap">
     <div className="search">
        <input type="search"
         placeholder="search..."
         autoFocus
         id="search"
         className="searchTerm"
         value={searchValue}
         onChange={(e)=>setSearchValue(e.target.value)}
         />
         <button className="searchButton" type ="button" 
         onClick={getWeatherInfo}>
         Search</button>
     </div>
  </div>
  {/* {our temp card} */}
  <Weathercard tempInfo={tempInfo}/>
 
  
  
  </>
  );
  
  
};

export default Temp;
