import { useState } from "react";

import "./App.css";
import search from "./assets/icons/search.svg";
import { useStateContext } from "./Context";
import { BackgroundLayout, WeatherCard, MiniCard } from "./Compenents";

function App() {
    const [input, setInput] = useState("");

    const { weather, thisLocation, values, setPlace } = useStateContext();

    const submitCity = () => {
        if (input.trim() !== "") {
            setPlace(input); // Update the place in the context
            setInput(""); // Clear the input field
        } else {
            alert("Please enter a valid city name.");
        }
    };

    return (
        <div className="w-full min-h-screen text-white px-4 sm:px-8">

            <nav className="w-full p-3 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="font-bold tracking-wide text-2xl sm:text-3xl text-center sm:text-left">Weather App</h1>

                <div className="bg-white w-full sm:w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
                    <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />

                    <input
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                submitCity();
                            }
                        }}
                        type="text"
                        placeholder="Search city"
                        className="focus:outline-none w-full text-[#212121] text-base"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
            </nav>

            <BackgroundLayout></BackgroundLayout>

            <main className="w-full flex flex-col md:flex-row py-4 px-6 md:px-[10%] items-center md:items-start justify-between gap-6">
              <div className="w-full md:w-[45%] flex justify-center md:justify-start">
                <WeatherCard
                    place={thisLocation}
                    windspeed={weather.wspd}
                    humidity={weather.humidity}
                    temperature={weather.temp}
                    heatIndex={weather.heatindex}
                    iconString={weather.conditions}
                    conditions={weather.conditions}
                />
                </div>

                <div className="w-full md:w-[50%] flex flex-wrap gap-4 justify-center md:justify-end">
                    {values?.slice(1, 7).map((curr) => {
                        return (
                            <MiniCard
                                key={curr.datetime}
                                time={curr.datetime}
                                temp={curr.temp}
                                iconString={curr.conditions}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default App;