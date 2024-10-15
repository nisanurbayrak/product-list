export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokinExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokinExpirationDate || new Date() > this._tokinExpirationDate) {
      return null;
    }
    return this._token;
  }
}
