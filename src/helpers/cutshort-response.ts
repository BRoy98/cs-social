export enum ResponseStatus {
  SUCCESS = "success",
  FAILURE = "failure",
}

// WIP. will set it up later
export class CutShortResponse {
  public readonly status: ResponseStatus;
  public readonly data: object;

  constructor(data: object, status: ResponseStatus) {
    this.data = data;
    this.status = status;
  }
}
