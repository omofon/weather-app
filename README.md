# Weather Now 🌤️

![Design preview for the Weather app coding challenge](./preview.jpg)

A responsive weather application built as an intermediate challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49).

🔗 **Live Demo:** [weather-app-ashley.vercel.app](https://weather-app-ashley.vercel.app/)

---

## The Challenge

Users should be able to:

1. Search for weather information by entering a location in the search bar
2. View current weather conditions including temperature, weather icon, and location details
3. See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
4. Browse a 7-day weather forecast with daily high/low temperatures and weather icons
5. View an hourly forecast showing temperature changes throughout the day
6. Switch between different days of the week using the day selector in the hourly forecast section
7. Toggle between Imperial and Metric measurement units via the units dropdown
8. Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
9. View the optimal layout for the interface depending on their device's screen size
10. See hover and focus states for all interactive elements on the page

---

## What is this project?

Weather Now fetches location and weather data from external APIs and renders it in a clean, responsive UI. It uses three APIs:

- **Auto-detect user location:** [BigDataCloud Reverse Geocode](https://api.bigdatacloud.net/data/reverse-geocode-client)
- **Coordinates from city query:** [Open-Meteo Geocoding API](https://geocoding-api.open-meteo.com/v1)
- **Weather data from coordinates:** [Open-Meteo Weather API](https://api.open-meteo.com/v1/forecast)

---

## Built With

- [React](https://reactjs.org/) — UI library
- [Vite](https://vitejs.dev/) — Build tool
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Open-Meteo SDK](https://www.npmjs.com/package/openmeteo) — Weather data fetching

---

## How It Works

When the app loads, it requests the user's location from the browser. If granted, it reverse-geocodes the coordinates to get the city name, then fetches weather data from Open-Meteo. If location access is denied, the app stays idle with no error — the user can search manually.

When a user submits a city search:
- The query is passed to the `useLocation` hook, which fetches coordinates and location details via the geocoding API.
- The resolved coordinates are passed to the `useWeatherForecast` hook, which retrieves current conditions, hourly data (next 24 hours), and a 7-day daily forecast from Open-Meteo.

Unit preferences (temperature, wind speed, precipitation) are managed at the app level and passed down as parameters to the weather fetch, so all data is returned in the user's chosen units.

---

## Project Structure

```
src/
├── components/
│   └── ui/
│       ├── Header.jsx
│       ├── SearchBar.jsx
│       ├── WeatherDashboard.jsx
│       ├── ErrorState.jsx
│       └── LoadingState.jsx
├── hooks/
│   ├── useLocation.jsx
│   └── useWeatherForecast.jsx
├── utils/
│   ├── getCoordinates.js
│   └── formatInput.js
└── App.jsx
```

---

## Getting Started

```bash
git clone https://github.com/omofon/weather-app.git
npm install
npm run dev
```

---

## Additional Challenges

These are open Frontend Mentor extensions to the project — feel free to pick one up:

- [x] Add geolocation detection to automatically show weather for the user's current location on first visit *(completed)*
- [ ] Implement a favorites/saved locations system where users can bookmark frequently checked locations
- [ ] Implement a "Compare Locations" feature to view weather side-by-side for multiple locations
- [ ] Include UV index, visibility, and air pressure data *(available via Open-Meteo)*
- [ ] Add sunrise/sunset times with visual indicators
- [ ] Add animated weather backgrounds that change based on current conditions
- [ ] Implement voice search functionality
- [ ] Create dark/light mode themes that adapt to the time of day
- [ ] Add progressive web app (PWA) capabilities for mobile installation

---

## License

MIT License © 2026 Abasiomofon Udoh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## Author

- Frontend Mentor — [@omofon](https://www.frontendmentor.io/profile/omofon)
- GitHub — [@omofon](https://github.com/omofon)