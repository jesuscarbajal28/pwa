import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChuckNorrisService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://api.chucknorris.io/jokes/random';

  public getChistes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
