export {};

declare global {
  interface Request {
    authUser?: { id: number };
  }
}
