# Weather Now

![Design preview for the Weather app coding challenge](./preview.jpg)


This is an intermediate challenge from [frontendmentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49)

## The Challenge

The users should be able to:

1. Search for weather information by entering a location in the search bar
2. View current weather conditions, including temperature, weather icon, and location details
3. See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
4. Browse a 7-day weather forecast with daily high/low temperatures and weather icons
5. View an hourly forecast showing temperature changes throughout the day
6. Switch between different days of the week using the day selector in the hourly forecast section
7. Toggle between Imperial and Metric measurement units via the units dropdown
8. Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
9. View the optimal layout for the interface depending on their device's screen size
10. See hover and focus states for all interactive elements on the page

What is this project?
Weather Now fetches location and weather information from external APIs and renders it for the user consumption. 
the three apis used here are:

- Auto fetching user location: https://api.bigdatacloud.net/data/reverse-geocode-client
- Fetching coordinates from location query: [Open Meteo Geocoding](https://geocoding-api.open-meteo.com/v1)
- Fetching Weather Information from coordinates: [Open Meteo Weather API](https://api.open-meteo.com/v1/forecast)


Why does it exist?

This is an intermediate challenge from frontendmentor to improve my expertise on frontend development

How do I run it?

```bash
git clone https://github.com/omofon/weather-app.git
npm install
npm run dev
```
How is it built?
This is a frontend project built with react and tailwindcss through vite

the project renders weather data through states to the ui

when the app loads, it request the users location from the browser. if the request is successful, the app fetches the coordinates of the user's city and then, weather data from open meteo and displays on the ui. if the reuquest fails, it does silently. the user searches a city and submit. the city query is passed to the uselocation hook which fetches the coordinates and location details.

the coordinates details along with other paramaters are passed to the useWeatherForecast hook whch get data for current, hourly and daily


How can I contribute or use it?
there are additional challenges to work on the project from frontendmentor which i have not completed, feel free to hop on any

- Add geolocation detection to automatically show weather for the user's current location on first visit [I have worked on this]
- Implement a favorites/saved locations system where users can bookmark frequently checked locations
- Implement a "Compare Locations" feature to view weather side-by-side for multiple locations
- Include UV index, visibility, and air pressure data (available via Open-Meteo)
- Add sunrise/sunset times with visual indicators
- Add animated weather backgrounds that change based on current conditions
- Implement voice search functionality
- Create dark/light mode themes that adapt to the time of day
- Add progressive web app (PWA) capabilities for mobile installation