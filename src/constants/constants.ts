import { ApiResponse } from "../Types/Types";

export const DUMMY_DATA: ApiResponse =
{
    "coord": {
        "lon": 73.8553,
        "lat": 18.5196
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 302.67,
        "feels_like": 305.27,
        "temp_min": 302.67,
        "temp_max": 302.67,
        "pressure": 1007,
        "humidity": 61,
        "sea_level": 1007,
        "grnd_level": 946
    },
    "visibility": 10000,
    "wind": {
        "speed": 3.23,
        "deg": 283,
        "gust": 3.37
    },
    "clouds": {
        "all": 68
    },
    "dt": 1693562773,
    "sys": {
        "type": 2,
        "id": 2083365,
        "country": "IN",
        "sunrise": 1693529402,
        "sunset": 1693574400
    },
    "timezone": 19800,
    "id": 1259229,
    "name": "Pune",
    "cod": 200
}