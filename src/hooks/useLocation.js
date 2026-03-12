import { useEffect, useState, useRef } from "react";
import getCoordinates from "../utils/getCoordinates";

export default function useLocation(searchQuery) {
  const [coords, setCoords] = useState(null);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  // Use a ref to track if we've already tried auto-detecting
  // This prevents the infinite loop and the dependency error
  const hasAttemptedAutoLocate = useRef(false);

  useEffect(() => {
    // 1. MANUAL SEARCH LOGIC
    if (searchQuery) {
      const fetchBySearch = async () => {
        setStatus("loading");
        setError(null);
        try {
          const data = await getCoordinates(searchQuery);
          if (data) {
            setCoords({ lat: data.latitude, lon: data.longitude });
            setLocation({ city: data.name, country: data.country });
            setStatus("success");
          } else {
            throw new Error("Location not found");
          }
        } catch (err) {
          setError(err.message);
          setStatus("error");
        }
      };
      fetchBySearch();
      return;
    }

    // 2. AUTO-DETECTION LOGIC (Runs only if no search query and haven't tried yet)
    if (!searchQuery && !hasAttemptedAutoLocate.current) {
      hasAttemptedAutoLocate.current = true;

      if (!navigator.geolocation) {
        setError("Geolocation not supported");
        setStatus("error");
        return;
      }

      setStatus("loading");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
            );
            const data = await res.json();
            setCoords({ lat, lon });
            setLocation({
              city: data.city || data.locality || "Current Location",
              country: data.countryName || "",
            });
            setStatus("success");
          } catch (err) {
            setError("Failed to identify current city");
            setStatus("error");
          }
        },
        (err) => {
          let msg = "Location denied. Please search manually.";
          if (err.code === 2) msg = "Position unavailable.";
          if (err.code === 3) msg = "Location request timed out.";
          setError(msg);
          setStatus("error");
        },
      );
    }
  }, [searchQuery]);

  return { coords, location, status, error };
}
