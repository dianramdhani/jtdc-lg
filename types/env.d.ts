declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PASSWORD: string;
      URL: string;
      URL_QUERY: string;
    }
  }
}
export {};
