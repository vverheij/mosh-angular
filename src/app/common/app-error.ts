export class AppError {
    json: any;
    constructor(public originalError: any) {
        this.json = originalError.json;
    }
}