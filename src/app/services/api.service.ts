import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, tap, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }
  getUserRepo(githubUsername: string, page: number, perPage: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`, { params });
  }
  getUserRepo1(githubUsername: string): Observable<any> { 

    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`);
  }

  getLanguagesForRepo(languagesUrl: string): Observable<any> {
    return this.httpClient.get(languagesUrl);
  }


  
}
