
export class LikeComponent {
    constructor(private _numberOfLikes?: number, private _isEnabled?: boolean) {
    }

    onClick(){
        this._numberOfLikes = (this._isEnabled) ?  -1 : +1;
        this._isEnabled = false;
    }
    get NumberOfLikes() {
        return this.NumberOfLikes;
    }

    get IsEnabled() {
        return this._isEnabled;
    }
}