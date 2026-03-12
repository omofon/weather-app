import { useState } from "react";

import Header from "./components/ui/Header";
import SearchBar from "./components/ui/SearchBar";

import useLocation from "./hooks/useLocation";
import { useWeatherForecast } from "./hooks/useWeatherForecast";

import ErrorState from "./components/ui/ErrorState";
import Loading from "./components/ui/LoadingState";
import WeatherDashboard from "./components/ui/WeatherDashboard";

function App() {
  const [units, setUnits] = useState({
    temperature: "celsius",
    windspeed: "kmh",
    precipitation: "mm",
  });
  const [locationQuery, setLocationQuery] = useState("");
  const { coords, location, status, error } = useLocation(locationQuery);
  const {
    current,
    hourly,
    daily,
    loading,
    error: weatherError,
  } = useWeatherForecast(coords, units);

  return (
    <div className="flex flex-col space-y-12 mb-12 items-center justify-start mx-auto max-w-xl md:max-w-5xl lg:max-w-7xl xl:max-w-9xl px-5 sm:px-12 lg:px-8">
      <Header units={units} setUnits={setUnits} />
      <main className="flex flex-col gap-5 items-center w-full">
        <h1 className="text-center mb-5 md:mb-10">
          How's the sky looking today?
        </h1>
        <SearchBar
          setLocationQuery={setLocationQuery}
          isSearching={status === "loading"}
        />

        {status === "error" || weatherError ? (
          <ErrorState message={error || weatherError} />
        ) : current ? (
          <WeatherDashboard
            location={location}
            current={current}
            hourly={hourly}
            daily={daily}
            loading={loading || status === "loading"}
          />
        ) : null}
      </main>
    </div>
  );
}
export default App;
