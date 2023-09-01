import { useEffect, useState } from "react";
import { ApiResponse } from "../Types/Types";
// import { DUMMY_DATA } from "../constants/constants";

export const useWeatherData = (cityName: string, countryCode: string) => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = process.env.REACT_APP_API_URL!;
            const API_KEY = process.env.REACT_APP_API_KEY!;

            try {
                // const response = await fetch(`${API_URL}/direct?q=${cityName},${countryCode}&limit=${1}&appid=${API_KEY}`);
                // const responseData = await response.json();
                //const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${responseData[0].lat}&lon=${responseData[0].lon}&appid=${API_KEY}`;
                const weatherApiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${API_KEY}`
                const weatherApiResponse = await fetch(weatherApiUrl);
                const weatherData = await weatherApiResponse.json();
                console.log(weatherData)
                setData(weatherData);
            } catch (error) {
                setError('An error occurred while fetching data from the API.');
            } finally {
                setLoading(false);
            }
        };

         fetchData();
        // setTimeout(() => {
        //     setData(DUMMY_DATA)
        //     setLoading(false);
        // }, 2000)
    }, [cityName, countryCode]);

    return { data, loading, error };
};