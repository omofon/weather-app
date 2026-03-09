import { useEffect, useState } from "react";
import Header from "./components/ui/Header";
import SearchBar from "./components/ui/SearchBar";

import useLocation from "./hooks/useLocation";
import getCoordinates from "./utils/getCoordinates";
import ErrorState from "./components/ui/ErrorState";
import Loading from "./components/ui/LoadingState";
import HourlyForecast from "./components/weather/HourlyForecast";
import HourData from "./components/weather/HourData";

function App() {
  // States for weather app
  const [units, setUnits] = useState({
    temperature: "celsius", // fahrenheit
    windspeed: "kmh", //mph
    precipitation: "mm", // inch
  });

  const [day, setDay] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const { coords, status, error } = useLocation(locationQuery);

  return (
    <div className="flex flex-col space-y-10 items-center justify-start mx-auto max-w-xl md:max-w-5xl lg:max-w-7xl xl:max-w-9xl px-5 sm:px-12 lg:px-8">
      <Header units={units} setUnits={setUnits} />
      <main className="flex flex-col gap-5 items-center">
        <h1 className="text-center mb-5 md:mb-10">
          How's the sky looking today?
        </h1>
        <SearchBar
          setLocationQuery={setLocationQuery}
          isSearching={status === "loading"}
        />

        <section>
          {status === "error" && <ErrorState message={error} />}
        </section>

        <section>{status === "loading" && <Loading />}</section>
        <section>
          <div>
            {
              <HourlyForecast day={day} setDay={setDay} status={status}>
                <HourData
                  img="assets/images/icon-sunny.webp"
                  hour="2 PM"
                  temp="20C"
                />
              </HourlyForecast>
            }
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
