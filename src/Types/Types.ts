interface Coord {
    lon: number;
    lat: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

interface Rain {
    '1h'?: number;
    '3h'?:number;
}

interface Clouds {
    all: number;
}

interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface StrictApiResponse {
    coord: Partial<Coord>;
    weather: Partial<Weather[]>;
    base: string;
    main: Partial<Main>;
    visibility: number;
    wind: Partial<Wind>;
    rain: Partial<Rain>;
    clouds: Partial<Clouds>;
    dt: number;
    sys: Partial<Sys>;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export type ApiResponse = Partial<StrictApiResponse>
export interface CardProps{
    data:ApiResponse
}
