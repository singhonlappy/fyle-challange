import { HttpClient } from '@angular/common/http';
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
  getUserrepo(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`);
  }
  getUserrepolanguages(githubUsername: string, repoName: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/repos/${githubUsername}/${repoName}/languages`);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
