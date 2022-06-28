
export type Config = {
    RAPID_API_HOST: string,
    RAPID_API_KEY: string,
    RAPID_API_URL: string
}


export const config:Config = {   
    RAPID_API_HOST: process.env.REACT_APP_RAPID_API_HOST ?? '',
    RAPID_API_KEY: process.env.REACT_APP_RAPID_API_KEY ?? '',
    RAPID_API_URL: process.env.REACT_APP_RAPID_API_URL ?? ''
}