/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    TOKEN_SECRET: string;
  }
}
