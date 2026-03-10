import { useState } from "react";
import UnitSection from "./header/UnitSection";
import RadioOption from "./header/RadioOption";

export default function Header({ units, setUnits }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMetric, setIsMetric] = useState(true);

  function showDropdown() {
    setIsVisible((prev) => !prev);
  }

  function changeTemperature(value) {
    setUnits((prev) => ({ ...prev, temperature: value }));
  }

  function changeWindSpeed(value) {
    setUnits((prev) => ({ ...prev, windspeed: value }));
  }

  function changePrecipitation(value) {
    setUnits((prev) => ({ ...prev, precipitation: value }));
  }

  function switchToImperial() {
    setIsMetric(false);
    setUnits({
      temperature: "fahrenheit",
      windspeed: "mph",
      precipitation: "inch",
    });
  }

  function switchToMetric() {
    setIsMetric(true);
    setUnits({
      temperature: "celsius",
      windspeed: "kmh",
      precipitation: "mm",
    });
  }

  return (
    <header className="container flex items-center justify-between py-4 md:py-5">
      <div className="flex items-center justify-center w-fit h-fit">
        <img
          src="assets/images/logo.svg"
          alt="logo"
          className="w-40 md:w-50 h-auto"
        />
      </div>

      <div className="relative">
        {/* Units Button */}
        <button
          onClick={showDropdown}
          className="relative bg-card text-font-main flex items-center gap-2 group px-4 py-3.5 rounded-xl hover:cursor-pointer hover:bg-paper 
                      ring-1 ring-transparent focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-ink"
        >
          <img src="assets/images/icon-units.svg" alt="Gear icon" />
          <span className="text-sm">Units</span>
          <img
            src="assets/images/icon-dropdown.svg"
            alt="Dropdown caret icon"
          />
        </button>

        {/* Dropdown Menu */}
        {isVisible && (
          <nav className="flex flex-col gap-1 absolute right-0 top-[calc(100%+8px)] w-50 p-1 bg-card border border-border-dim rounded-md shadow-md overflow-hidden z-100">
            <button
              onClick={isMetric ? switchToImperial : switchToMetric}
              className="bg-card text-font-main text-sm text-left w-full p-2 rounded-md hover:cursor-pointer hover:bg-paper focus:outline focus:outline-border-light transition-colors duration-200"
            >
              {isMetric ? "Switch to Imperial" : "Switch to Metric"}
            </button>

            {/* Temperature */}
            <UnitSection title="Temperature">
              <RadioOption
                id="celsius"
                name="temperature"
                label="Celsius (°C)"
                checked={units.temperature === "celsius"}
                onChange={() => changeTemperature("celsius")}
              />
              <RadioOption
                id="fahrenheit"
                name="temperature"
                label="Farenheit (°F)"
                checked={units.temperature === "fahrenheit"}
                onChange={() => changeTemperature("fahrenheit")}
              />
            </UnitSection>

            {/* Wind Speed */}
            <UnitSection title="Wind Speed">
              <RadioOption
                id="kmh"
                name="wind"
                label="km/h"
                checked={units.windspeed === "kmh"}
                onChange={() => changeWindSpeed("kmh")}
              />
              <RadioOption
                id="mph"
                name="wind"
                label="mph"
                checked={units.windspeed === "mph"}
                onChange={() => changeWindSpeed("mph")}
              />
            </UnitSection>

            {/* Precipitation */}
            <UnitSection title="Precipitation">
              <RadioOption
                id="mm"
                name="precipitation"
                label="Millimeters (mm)"
                checked={units.precipitation === "mm"}
                onChange={() => changePrecipitation("mm")}
              />
              <RadioOption
                id="inch"
                name="precipitation"
                label="Inches (in)"
                checked={units.precipitation === "inch"}
                onChange={() => changePrecipitation("inch")}
              />
            </UnitSection>
          </nav>
        )}
      </div>
    </header>
  );
}
