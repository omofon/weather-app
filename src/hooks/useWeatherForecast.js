import { useState, useEffect, useCallback } from "react";
import { fetchWeatherApi } from "openmeteo";

// --- Icon imports --- //
import SunnyIcon from "/assets/images/weather/icon-sunny.webp";
import StormyIcon from "/assets/images/weather/icon-storm.webp";
import SnowIcon from "/assets/images/weather/icon-snow.webp";
import RainIcon from "/assets/images/weather/icon-rain.webp";
import PartlyCloudyIcon from "/assets/images/weather/icon-partly-cloudy.webp";
import OvercastIcon from "/assets/images/weather/icon-overcast.webp";
import FogIcon from "/assets/images/weather/icon-fog.webp";
import DrizzleIcon from "/assets/images/weather/icon-drizzle.webp";

// --- WMO Mapping --- //
const WEATHER_MAP = {
  0: { label: "Clear", icon: SunnyIcon },
  1: { label: "Mainly Clear", icon: PartlyCloudyIcon },
  2: { label: "Partly Cloudy", icon: PartlyCloudyIcon },
  3: { label: "Overcast", icon: OvercastIcon },
  45: { label: "Foggy", icon: FogIcon },
  48: { label: "Depositing Rime Fog", icon: FogIcon },
};

function getCondition(code) {
  // Exact matches first
  if (WEATHER_MAP[code]) return WEATHER_MAP[code];

  // Range-based fallbacks
  if (code >= 51 && code <= 57) return { label: "Drizzle", icon: DrizzleIcon };
  if (code >= 61 && code <= 67) return { label: "Rain", icon: RainIcon };
  if (code >= 71 && code <= 77) return { label: "Snow", icon: SnowIcon };
  if (code >= 80 && code <= 82)
    return { label: "Rain Showers", icon: RainIcon };
  if (code >= 85 && code <= 86)
    return { label: "Snow Showers", icon: SnowIcon };
  if (code >= 95) return { label: "Thunderstorm", icon: StormyIcon };

  return { label: "Unknown", icon: SunnyIcon };
}

// --- Date Formatters --- //
const formatFullDate = (date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatHour = (date) =>
  date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });

const formatShortDay = (date) =>
  date.toLocaleDateString("en-US", { weekday: "short" });

export function useWeatherForecast(coords, units) {
  const [state, setState] = useState({
    current: null,
    hourly: [],
    daily: [],
    loading: false,
    error: null,
  });

  const { lat, lon } = coords || {};
  const { temperature, windspeed, precipitation } = units || {};

  const fetchWeather = useCallback(async () => {
    if (!lat || !lon) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    const windSpeedSymbol = windspeed === "kmh" ? "km/h" : "mph";
    const precipitationSymbol = precipitation === "inch" ? "in" : "mm";

    try {
      const params = {
        latitude: lat,
        longitude: lon,
        timezone: "auto",
        forecast_days: 7,
        temperature_unit: temperature,
        wind_speed_unit: windspeed,
        precipitation_unit: precipitation,
        current: [
          "temperature_2m",
          "apparent_temperature",
          "relative_humidity_2m",
          "wind_speed_10m",
          "precipitation",
          "weather_code",
        ],
        hourly: ["temperature_2m", "weather_code"],
        daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
      };

      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);

      if (!responses?.length)
        throw new Error("No data received from weather service.");

      const response = responses[0];
      const utcOffset = response.utcOffsetSeconds();

      // helper to convert Open-Meteo time to local Date object
      const toDate = (t) => new Date((Number(t) + utcOffset) * 1000);

      // --- Current --- //
      const c = response.current();
      const current = {
        time: toDate(c.time()),
        date: formatFullDate(toDate(c.time())),
        temp: `${Math.round(c.variables(0).value())}°`,
        feelsLike: `${Math.round(c.variables(1).value())}°`,
        humidity: `${c.variables(2).value()}%`,
        windSpeed: `${Math.round(c.variables(3).value())} ${windSpeedSymbol}`,
        precipitation: `${c.variables(4).value()} ${precipitationSymbol}`,
        condition: getCondition(c.variables(5).value()),
      };

      // --- Hourly --- //
      const h = response.hourly();
      const hourlyTemps = h.variables(0).valuesArray();
      const hourlyCodes = h.variables(1).valuesArray();
      const hourlyLength =
        (Number(h.timeEnd()) - Number(h.time())) / h.interval();

      const hourly = Array.from(
        { length: Math.min(hourlyLength, 24) },
        (_, i) => {
          const date = new Date(
            (Number(h.time()) + i * h.interval() + utcOffset) * 1000,
          );
          return {
            time: date,
            hour: formatHour(date),
            temp: `${Math.round(hourlyTemps[i])}°`,
            condition: getCondition(hourlyCodes[i]),
          };
        },
      );

      // --- Daily --- //
      const d = response.daily();
      const dailyCodes = d.variables(0).valuesArray();
      const dailyMaxTemps = d.variables(1).valuesArray();
      const dailyMinTemps = d.variables(2).valuesArray();
      const dailyLength =
        (Number(d.timeEnd()) - Number(d.time())) / d.interval();

      const daily = Array.from({ length: dailyLength }, (_, i) => {
        const date = new Date(
          (Number(d.time()) + i * d.interval() + utcOffset) * 1000,
        );
        return {
          time: date,
          day: formatShortDay(date),
          date: formatFullDate(date),
          tempMax: `${Math.round(dailyMaxTemps[i])}°`,
          tempMin: `${Math.round(dailyMinTemps[i])}°`,
          condition: getCondition(dailyCodes[i]),
        };
      });

      setState({ current, hourly, daily, loading: false, error: null });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err?.message ?? "Failed to fetch weather",
      }));
    }
  }, [lat, lon, temperature, windspeed, precipitation]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { ...state, refetch: fetchWeather };
}
