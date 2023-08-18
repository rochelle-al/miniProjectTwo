import React, { useState } from 'react';
import classes from './Forecast.module.css';



const Forecast = () => {
   let [responseObj, setResponseObj] = useState({});
   let [city, setCity] = useState('');
   let [unit, setUnit] = useState('imperial');

   const uriEncodedCity = encodeURIComponent(city);

   async function getForecast(e) {
      e.preventDefault(); // Prevent form submission

      const apiUnit = unit === 'imperial' ? 'f' : 'c';
      console.log('API Unit:', apiUnit);

      const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${uriEncodedCity}&units=${apiUnit}`; // Use apiUnit here
      console.log('API URL:', url);
      const options = {
         method: 'GET',
         headers: {
            'X-RapidAPI-Key': '6eb5159f8fmshf3e06c0589f9003p1f5038jsn9649e3f93553',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
         }
      };

      try {
         const response = await fetch(url, options);
         const result = await response.json(); 
         console.log(result);
         setResponseObj(result); 
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <div className={classes.Wrapper}>
         <h2>Find Current Weather Conditions</h2>
         <div>
            {responseObj.current && (
               <div>
                  <p>City: {responseObj.location.name}</p>
                  <p>
                     Current Temperature:{" "}
                     {unit === "imperial"
                        ? `${responseObj.current.temp_f} °F`
                        : `${responseObj.current.temp_c} °C`}
                  </p>
                  <p>Conditions: {responseObj.current.condition.text}</p>
               </div>
            )}
         </div>
         <form onSubmit={getForecast}>
            <input
               type="text"
               placeholder="Enter City"
               maxLength="50"
               className={classes.TextInput}
               value={city}
               onChange={(e) => setCity(e.target.value)}
            />
            <label className={classes.Radio}>
               <input
                  type="radio"
                  name="units"
                  checked={unit === "imperial"}
                  value="imperial"
                  onChange={(e) => setUnit(e.target.value)}
               />
               Fahrenheit
            </label>
            <label className={classes.Radio}>
               <input
                  type="radio"
                  name="units"
                  checked={unit === "metric"}
                  value="metric"
                  onChange={(e) => setUnit(e.target.value)}
               />
               Celsius
            </label>
            <button className={classes.Button} type="submit">Get Forecast</button>
         </form>
      </div>
   )
}

export default Forecast;
