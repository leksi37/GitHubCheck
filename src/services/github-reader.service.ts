import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 * This service handles Github API requests
 */
export class GithubReaderService {

  //Currently NOT in use
  public githubSubject: Subject<any> = new Subject<any>();
  public errorSubject: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  /**
   * Perform a GET request to aquire the repos for the specified in the parameters user in Github
   * Method can also simply return an Observable, but instead I use rxJs Subject to pass information from the service to the subscribed component 
   * @param username the github username 
   * Currently NOT in use
   */
  public checkForRepos(username: string) {
    this.httpClient.get(`https://api.github.com/users/${username}/repos`)
      .subscribe((response: any) => {
        let arr: [] = response;
        if (arr.length == 0) {
          this.errorSubject.next("User doesn't have any public repositories.");
        } else {
          for (let j = 0; j < arr.length; j++) {
            this.githubSubject.next(arr[j]);
          }
        }
      }, () => {
        this.errorSubject.next("User doesn't exist")
      });
  }

  /**
   * GET request to a specific repository to retrieve detailed information about it
   * @param repoUrl the github API repository url
   * Currently NOT in use
  */
  public getRepoInfo(repoUrl: string) {
    this.httpClient.get(repoUrl)
      .subscribe((response: any) => {
        this.githubSubject.next(response);
      }, () => {
        this.errorSubject.next("Problem occurred, while trying to access the selected repository. Please try again.")
      });
  }

  /**
   * GET request to a specific repository to retrieve detailed information about it
   * Same as getRepoInfo, but returns an Observable and without the subscribe method
   * @param repoUrl the github API repository url
   */
  public getRepoInfoObservable(repoUrl: string): Observable<any> {
    return this.httpClient.get(repoUrl);
  }

  /**
   * Perform a GET request to aquire the repos for the specified in the parameters user in Github
   * @param username  the github username 
   * returns an Observable, which makes it different from checkForRepos(), where a subscription is used
   */
  public checkForReposObservable(username: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${username}/repos`);
  }

  /**
   * A simple case where it makes sense to use Subject instead of Observable
   * Currently NOT in use
  */
  public getRepoDetailsPeriodically(repoUrl: string) {
    while (true) {
      let timeout = setTimeout(() => {
        this.getRepoInfo(repoUrl);
        clearTimeout(timeout);
      }, 10000);
    }
  }


}

