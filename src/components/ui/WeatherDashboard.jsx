import { useState } from "react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-paper border border-border-dim rounded-xl hover:bg-paper transition-colors duration-200 p-5 ${className}`}
  >
    {children}
  </div>
);

const LoadingSkeleton = ({ className = "" }) => (
  <div className={`bg-white/5 animate-pulse rounded ${className}`} />
);

export default function WeatherDashboard({
  location,
  current,
  hourly,
  daily,
  loading,
}) {
  const [day, setDay] = useState("Today");
  const [isVisible, setIsVisible] = useState(false);

  // Fallback for DAYS if loading
  const DAYS = loading
    ? ["-"]
    : [
        "Today",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

  function showDropdown() {
    setIsVisible((prev) => !prev);
  }

  // Early return if core data is missing
  if (!current) return null;

  return (
    <section className="mt-5 mx-auto max-w-xl md:max-w-5xl lg:max-w-7xl xl:max-w-9xl grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
      {/* Left Section: Current & Daily */}
      <div className="lg:col-span-8 space-y-8">
        {/* Current Weather Hero */}
        <div
          className={`overflow-hidden rounded-2xl min-h-75 flex p-8 ${
            loading
              ? "bg-paper animate-pulse"
              : "bg-[url('/assets/images/bg-today-small.svg')] md:bg-[url('/assets/images/bg-today-large.svg')] bg-cover bg-center"
          }`}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-font-muted rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-font-muted rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-3 h-3 bg-font-muted rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-font-muted text-center">Loading...</span>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center gap-4 w-full">
              <div className="flex flex-col gap-2 text-center md:text-left items-center md:items-start">
                <h2 className="text-font-main text-4xl font-medium tracking-wide">
                  {`${location?.city || "Unknown"}, ${location?.country || ""}`}
                </h2>
                <p className="text-font-muted text-lg mt-1">{current.date}</p>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-6">
                <img
                  src={current.condition.icon}
                  alt={current.condition.label}
                  className="w-24 h-24"
                />
                <span className="text-right text-8xl md:text-9xl font-bold tracking-wide text-font-main font-display">
                  {current.temp}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            className={`flex flex-col justify-between min-h-30 ${loading ? "animate-pulse" : ""}`}
          >
            <span className="text-font-muted">Feels Like</span>
            <span className="text-2xl text-font-main">
              {loading ? "-" : current.feelsLike}
            </span>
          </Card>
          <Card
            className={`flex flex-col justify-between min-h-30 ${loading ? "animate-pulse" : ""}`}
          >
            <span className="text-font-muted">Humidity</span>
            <span className="text-2xl text-font-main">
              {loading ? "-" : current.humidity}
            </span>
          </Card>
          <Card
            className={`flex flex-col justify-between min-h-30 ${loading ? "animate-pulse" : ""}`}
          >
            <span className="text-font-muted">Wind</span>
            <span className="text-2xl text-font-main">
              {loading ? "-" : current.windSpeed}
            </span>
          </Card>
          <Card
            className={`flex flex-col justify-between min-h-30 ${loading ? "animate-pulse" : ""}`}
          >
            <span className="text-font-muted">Precipitation</span>
            <span className="text-2xl text-font-main">
              {loading ? "-" : current.precipitation}
            </span>
          </Card>
        </div>

        {/* Daily Forecast */}
        <section>
          <h3 className="text-lg font-medium mb-4 text-font-main">
            Daily forecast
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {(loading ? Array(7).fill(0) : daily).map((item, i) => (
              <Card
                key={i}
                className={`flex flex-col items-center gap-2 py-4 px-2 ${loading ? "w-26 h-36.5" : ""}`}
              >
                {loading ? (
                  <>
                    <LoadingSkeleton className="h-4 w-12" />
                    <LoadingSkeleton className="h-12 w-12 rounded-full" />
                    <LoadingSkeleton className="h-4 w-16" />
                  </>
                ) : (
                  <>
                    <span className="text-base font-semibold text-font-main">
                      {item.day}
                    </span>
                    <img
                      src={item.condition.icon}
                      alt={item.condition.label}
                      className="w-12 h-12"
                    />
                    <div className="flex w-full justify-between items-center px-2">
                      <span className="text-base text-white/80">
                        {item.tempMax}
                      </span>
                      <span className="text-font-muted">{item.tempMin}</span>
                    </div>
                  </>
                )}
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Right Section: Hourly Forecast */}
      <div className="lg:col-span-4 h-168.5">
        <Card className="h-full flex flex-col rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-white/80">
              Hourly forecast
            </h3>
            <div className="relative">
              <button
                onClick={showDropdown}
                className="bg-paper text-font-main flex items-center gap-2 px-4 py-3 rounded-md hover:cursor-pointer hover:bg-paper ring-1 ring-transparent focus:ring-white"
              >
                <span>{day}</span>
                <img src="assets/images/icon-dropdown.svg" alt="Dropdown" />
              </button>

              {isVisible && (
                <nav className="absolute right-0 top-[calc(100%+8px)] w-40 p-1 bg-card border border-border-dim rounded-md shadow-md z-50">
                  {loading ? (
                    <span>-</span>
                  ) : (
                    DAYS.map((date) => (
                      <button
                        key={date}
                        onClick={() => {
                          setDay(date);
                          setIsVisible(false);
                        }}
                        className="text-sm text-left w-full p-2 hover:bg-paper rounded-md"
                      >
                        {date}
                      </button>
                    ))
                  )}
                </nav>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {(loading ? Array(10).fill(0) : hourly).map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 bg-paper border border-border-dim rounded-xl hover:bg-white/5 transition-colors ${loading ? "w-82.6 h-16.4" : ""}`}
              >
                {loading ? (
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-4">
                      <LoadingSkeleton className="h-8 w-8 rounded-full" />
                      <LoadingSkeleton className="h-4 w-16" />
                    </div>
                    <LoadingSkeleton className="h-4 w-10" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <img
                        src={item.condition.icon}
                        alt={item.condition.label}
                        className="w-8 h-8"
                      />
                      <span className="font-medium text-font-main">
                        {item.hour}
                      </span>
                    </div>
                    <span className="font-bold">{item.temp}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
