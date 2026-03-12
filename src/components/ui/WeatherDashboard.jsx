import { useState } from "react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-paper border border-border-dim rounded-md hover:bg-paper transition-colors duration-200 p-5 ${className}`}
  >
    {children}
  </div>
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
    <section className="mt-5 mx-auto max-w-xl md:max-w-5xl lg:max-w-7xl xl:max-w-9xl grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      {/* Left Section: Current & Daily */}
      <div className="lg:col-span-8 space-y-6">
        {/* Current Weather Hero */}
        <div
          className={`overflow-hidden rounded-2xl min-h-75 flex items-center justify-between p-8 ${
            loading
              ? "bg-paper animate-pulse"
              : "bg-[url('/assets/images/bg-today-small.svg')] lg:bg-[url('/assets/images/bg-today-large.svg')] bg-cover bg-center"
          }`}
        >
          <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-between lg:items-center gap-4 w-full">
            <div className="flex flex-col gap-2 text-center lg:text-left items-center lg:items-start">
              <h2 className="text-font-main text-4xl font-medium tracking-wide">
                {`${location?.city || "Unknown"}, ${location?.country || ""}`}
              </h2>
              <p className="text-white/80 text-lg mt-1">{current.date}</p>
            </div>
            <div className="flex items-center justify-between lg:justify-end gap-6">
              <img
                src={current.condition.icon}
                alt={current.condition.label}
                className="w-24 h-24"
              />
              <span className="text-right text-8xl md:text-9xl font-bold tracking-wider text-font-main font-display">
                {current.temp}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="flex flex-col justify-between min-h-35">
            <span className="text-font-muted text-sm font-medium">
              Feels Like
            </span>
            <span className="text-2xl font-semibold">{current.feelsLike}</span>
          </Card>
          <Card className="flex flex-col justify-between min-h-35">
            <span className="text-font-muted text-sm font-medium">
              Humidity
            </span>
            <span className="text-2xl font-semibold">{current.humidity}</span>
          </Card>
          <Card className="flex flex-col justify-between min-h-35">
            <span className="text-font-muted text-sm font-medium">Wind</span>
            <span className="text-2xl font-semibold">{current.windSpeed}</span>
          </Card>
          <Card className="flex flex-col justify-between min-h-35">
            <span className="text-font-muted text-sm font-medium">
              Precipitation
            </span>
            <span className="text-2xl font-semibold">
              {current.precipitation}
            </span>
          </Card>
        </div>

        {/* Daily Forecast */}
        <section>
          <h3 className="text-lg font-medium mb-4 text-font-main">
            Daily forecast
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {daily.map((item, index) => (
              <Card
                key={index}
                className="flex flex-col items-center gap-2 py-4 px-2"
              >
                <span className="text-sm font-semibold">{item.day}</span>
                <img
                  src={item.condition.icon}
                  alt={item.condition.label}
                  className="w-8 h-8"
                />
                <div className="flex gap-2">
                  <span className="text-base font-bold">{item.tempMax}</span>
                  <span className="text-xs text-font-muted">
                    {item.tempMin}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Right Section: Hourly Forecast */}
      <div className="lg:col-span-4">
        <Card className="h-full flex flex-col max-h-212.5">
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
                  {DAYS.map((date) => (
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
                  ))}
                </nav>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {hourly.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-paper border border-border-dim rounded-xl hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.condition.icon}
                    alt={item.condition.label}
                    className="w-8 h-8"
                  />
                  <span className="font-medium">{item.hour}</span>
                </div>
                <span className="font-bold">{item.temp}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
