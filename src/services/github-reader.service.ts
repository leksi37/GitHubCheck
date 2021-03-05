import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Repo } from 'src/shared-classes/repo';

@Injectable({
  providedIn: 'root'
})

/**
 * This service handles Github API requests
 */
export class GithubReaderService {

  constructor(private httpClient: HttpClient) { }

  /**
   * GET request to a specific repository to retrieve detailed information about it
   * @param repoUrl the github API repository url
   */
  public getRepoInfoObservable(repoUrl: string): Observable<any> {
    return this.httpClient.get(repoUrl);
  }

  /**
   * Perform a GET request to aquire the repos for the specified in the parameters user in Github
   * @param username  the github username 
   */
  public checkForReposObservable(username: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${username}/repos`);
  }


}

