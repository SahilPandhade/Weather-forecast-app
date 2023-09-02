import { useEffect, useState } from "react";
import { ApiResponse } from "../Types/Types";
import { DUMMY_DATA } from "../constants/constants";

export const useWeatherData = (cityName: string, countryCode: string, debounceTime: number = 1000) => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
    const [globeLongitude, setGlobeLongitude] = useState<number>(0)
    const [globeLatitude,setGlobeLatitude] = useState<number>(0)
    useEffect(() => {
        let timeOut: NodeJS.Timeout | null = null;
        const fetchData = async () => {
            //const API_URL = process.env.REACT_APP_API_URL!;
            const API_KEY = process.env.REACT_APP_API_KEY!;
            setLoading(true)
            setError(null)
            try {
                const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${API_KEY}`
                const weatherApiResponse = await fetch(weatherApiUrl);
                const weatherData = await weatherApiResponse.json();
                if (weatherApiResponse.status === 429) {
                    setRateLimitExceeded(true)
                    setError('Please try again later')
                }
                else {
                    setData(weatherData);
                    // if (weatherData && weatherData.coord && weatherData?.coord.lat) {
                    //     setGlobeLatitude(Math.min(90, Math.max(-90, parseFloat(weatherData.coord.lat))))
                    // }
                    // if (weatherData && weatherData.coord && weatherData?.coord.lon) {
                    //     setGlobeLongitude(Math.min(90, Math.max(-90, ((parseFloat(weatherData.coord.lon) + 180) % 360) - 180)))
                    // }
                }
            } catch (error) {
                setError('An error occurred while fetching data from the API.');
            } finally {
                setLoading(false);
            }
        };
        if (cityName.trim() && countryCode.trim()) {
            if (timeOut) {
                clearTimeout(timeOut);
            }

            timeOut = setTimeout(fetchData, debounceTime);
        }
        return () => {
            if (timeOut) {
                clearTimeout(timeOut);
            }
        };
        //fetchData();
        // setTimeout(() => {
        //     setData(DUMMY_DATA)
        //     setLoading(false);
        // }, 2000)
    }, [cityName, countryCode, debounceTime]);

    return { data, loading, error, rateLimitExceeded ,globeLatitude,globeLongitude};
};