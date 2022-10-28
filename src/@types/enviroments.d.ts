/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    TOKEN_SECRET: string;

    MAPBOX_URL: string;
    MAPBOX_API_KEY: string;
  }
}
