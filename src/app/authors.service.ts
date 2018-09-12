
export class AuthorsService {
  private _authors = ['author1','author2','author3'];
  getAuthors() {
    return this._authors;
  }
  
}
