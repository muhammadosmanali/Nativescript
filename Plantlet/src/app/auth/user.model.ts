
export class UserModel {
    constructor(
        public id: string,
        private _accessToken: string,
        private _refreshToken: string,
        private _tokenExpirationDate: Date
    ) {}

    get isAuth() {
        return !!this.accessToken;
    }

    get accessToken() {
        if(!this._accessToken) {
            return null;
        }
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._accessToken;
    }

    get refreshToken() {
        return this._refreshToken;
    }

    get timeToExpiry() {
        return this._tokenExpirationDate.getTime() - new Date().getTime();
    }
}
