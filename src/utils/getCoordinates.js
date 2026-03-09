/**
 * Async function to get location of city
 * @param {string} query
 * @returns {object}
 */
async function getCoordinates(query) {
  const geoApiUrl = "https://geocoding-api.open-meteo.com/v1";
  const url = `${geoApiUrl}/search?name=${query}&count=1`;

  const response = await fetch(url);
  const data = await response.json();
  if (!data.results?.length) throw new Error(`Location not found: ${query}`);
  const { latitude, longitude } = data.results[0];
  return { latitude, longitude };
}

export default getCoordinates;
