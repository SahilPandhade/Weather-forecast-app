import { useEffect, useState } from "react";
import { ApiResponse } from "../Types/Types";
import { DUMMY_DATA } from "../constants/constants";

export const useWeatherData = (cityName: string, countryCode: string, debounceTime: number = 1000) => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
    useEffect(() => {
        let timeOut: NodeJS.Timeout | null = null;
        const fetchData = async () => {
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

    return { data, loading, error, rateLimitExceeded };
};