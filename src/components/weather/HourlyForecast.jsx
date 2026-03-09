import { useState } from "react";

export default function HourlyForecast({ day, setDay, status, children }) {
  const DAYS =
    status === "loading"
      ? ["-"]
      : [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
  const [isVisible, setIsVisible] = useState(false);

  function showDropdown() {
    setIsVisible((prev) => !prev);
  }

  function setDate(value) {
    setDay(value);
  }

  return (
    <div className="flex flex-col gap-2 p-2 overflow-hidden bg-card rounded-xl w-fit md:w-100">
      <header className="flex justify-between items-center">
        <h3 className="text-font-main font-medium text-xl">Hourly forecast</h3>
        <div className="relative">
          <button
            onClick={showDropdown}
            className="relative bg-paper text-font-main flex items-center gap-2 group px-4 py-3.5 rounded-md hover:cursor-pointer hover:bg-paper 
                      ring-1 ring-transparent focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-ink"
          >
            <span>{status === "loading" ? "-" : day}</span>
            <img
              src="assets/images/icon-dropdown.svg"
              alt="Dropdown caret icon"
            />
          </button>

          {/* Dropdown Menu */}
          {isVisible && (
            <nav className="flex flex-col gap-1 absolute right-0 top-[calc(100%+8px)] w-50 p-1 bg-card border border-border-dim rounded-md shadow-md overflow-hidden z-100">
              {DAYS.map((date) => {
                <button
                  key={date}
                  onClick={() => setDate(date)}
                  className="bg-card text-font-main text-sm text-left w-full p-2 rounded-md hover:cursor-pointer hover:bg-paper focus:outline focus:outline-border-light transition-colors duration-200"
                >
                  {date}
                </button>;
              })}
            </nav>
          )}
        </div>
      </header>
      <section className="flex flex-col gap-2">{children}</section>
    </div>
  );
}
