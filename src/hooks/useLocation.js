import { useEffect, useState, useRef } from "react";
import getCoordinates from "../utils/getCoordinates";

export default function useLocation(searchQuery) {
  const [coords, setCoords] = useState(null);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

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

    // 2. AUTO-DETECTION (Only if no search query and not yet attempted)
    if (!searchQuery && !hasAttemptedAutoLocate.current) {
      hasAttemptedAutoLocate.current = true;

      if (!navigator.geolocation) {
        setStatus("idle"); // If not supported, just stay idle, don't error.
        return;
      }

      // We don't set status to "loading" immediately for auto-locate
      // so we don't flash a loading spinner if the user hasn't allowed it yet.
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setStatus("loading");
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
            // If reverse geocoding fails, we remain idle
            setStatus("idle");
          }
        },
        (err) => {
          // PERMISSION_DENIED (1) or other errors:
          // Just reset to idle. No error state, no UI noise.
          setStatus("idle");
        },
      );
    }
  }, [searchQuery]);

  return { coords, location, status, error };
}
