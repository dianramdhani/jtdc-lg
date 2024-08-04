declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PASSWORD: string;
      URL: string;
      URL_QUERY: string;
      CHROME_PATH: string;
    }
  }
}
export {};
