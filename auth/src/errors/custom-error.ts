export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    // It's going to be passed to Error object
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
