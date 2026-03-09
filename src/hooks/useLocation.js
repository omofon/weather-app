import { useEffect, useState } from "react";
import getCoordinates from "../utils/getCoordinates";

export default function useLocation(searchQuery) {
  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchCoords = async () => {
      setStatus("loading");
      setError(null);

      try {
        const data = await getCoordinates(searchQuery);

        if (data) {
          setCoords({ lat: data.latitude, lon: data.longitude });
          setStatus("success");
        } else {
          throw new Error("Location not found");
        }
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    };

    fetchCoords();
  }, [searchQuery]);

  return { coords, status, error };
}
