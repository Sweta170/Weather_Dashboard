import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState("");
    const [thisLocation, setLocation] = useState("");

    // Fetch weather data
    const fetchWeather = async () => {
        if (!place || place.trim() === "") {
            alert("Please enter a valid location.");
            return;
        }

        const options = {
            method: "GET",
            url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
            params: {
                aggregateHours: "24",
                location: place.trim(), // Ensure the location is trimmed and valid
                contentType: "json",
                unitGroup: "metric",
                shortColumnNames: 0,
            },
            headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_API_KEY || "",
                "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
            },
        };

        try {
            console.log("Fetching weather data for:", place); // Debugging log
            const response = await axios.request(options);
            console.log("API Response:", response.data);

            const thisData = Object.values(response.data.locations)[0];
            if (!thisData) {
                throw new Error("No data returned for the specified location.");
            }

            setLocation(thisData.address);
            setValues(thisData.values);
            setWeather(thisData.values[0]);
        } catch (e) {
            console.error("Error fetching weather data:", e);
            alert(
                "Unable to fetch weather data. Please check the location and try again."
            );
        }
    };

    useEffect(() => {
        if (place) {
            fetchWeather();
        }
    }, [place]);

    return (
        <StateContext.Provider
            value={{
                weather,
                values,
                thisLocation,
                setPlace, // Expose setPlace to update the location
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);