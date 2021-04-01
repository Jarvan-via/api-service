declare namespace Express {
  export interface Request {
    timestamp: number,
    logCtx: import('../common').LogCtx,
  }
}