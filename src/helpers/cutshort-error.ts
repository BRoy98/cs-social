// WIP. will set it up later
export default class CutShortError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;

  constructor(errorCode: string, message: string, statusCode?: number) {
    super(message);
    this.code = errorCode;
    this.message = message;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
