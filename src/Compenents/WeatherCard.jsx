import React, { useEffect, useState } from 'react';
import { useDate } from '../Utils/useDate';

import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';

import '../index.css';

const WeatherCard = ({
    temperature,
    windspeed,
    humidity,
    place,
    heatIndex,
    iconString,
    conditions,
}) => {
    const [icon, setIcon] = useState(sun);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Update the icon based on weather conditions
        if (iconString) {
            if (iconString.toLowerCase().includes('cloud')) {
                setIcon(cloud);
            } else if (iconString.toLowerCase().includes('rain')) {
                setIcon(rain);
            } else if (iconString.toLowerCase().includes('clear')) {
                setIcon(sun);
            } else if (iconString.toLowerCase().includes('thunder')) {
                setIcon(storm);
            } else if (iconString.toLowerCase().includes('fog')) {
                setIcon(fog);
            } else if (iconString.toLowerCase().includes('snow')) {
                setIcon(snow);
            } else if (iconString.toLowerCase().includes('wind')) {
                setIcon(wind);
            }
        }
    }, [iconString]);

    useEffect(() => {
        // Update the current time every second
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="w-full max-w-[22rem] min-w-[18rem] h-auto md:h-[30rem] glassCard p-4 mx-auto md:mx-0">

            <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-4 mt-6 mb-4">
                <img src={icon} alt="weather_icon" className='w-20 h-20 sm:w-24 sm:h-24'/>
                <p className="font-bold text-4xl sm:text-5xl">
                    {temperature}&deg;C
                </p>
            </div>

            <div className="font-bold text-center text-lg sm:text-xl">{place}</div>
            
                <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 text-sm sm:text-base">

                    <p className="flex-1 text-center p-2"> {currentTime.toDateString()} </p>
                    <p className="flex-1 text-center p-2"> {currentTime.toLocaleTimeString()} </p>

                </div>

                <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
                    <p className="flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg">
                        Wind Speed <span className="font-normal">{windspeed}</span>
                    </p>
                    <p className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600">
                        Humidity <span className="font-normal">{humidity}</span>
                    </p>
                </div>

                <div className="w-full p-3 mt-4 flex justify-between items-center text-sm sm:text-lg">
                    <p className="font-semibold ">Heat Index </p>
                    <p className="text-lg">{heatIndex ? heatIndex : 'N/A'}</p>
                </div>

                <hr className="bg-slate-600 my-2" />
                <div className="w-full p-4 flex justify-center items-center text-xl sm:text-3xl font-semibold">
                    {conditions}
                </div>
            </div>
               
    );
};

export default WeatherCard;