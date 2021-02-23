import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class GithubReaderService {

  public githubSubject: Subject<any> = new Subject<any>();
  public errorSubject: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  //Perform a GET request to aquire the repos for the specified in the parameters user in Github
  //Method can also simply return an Observable, but instead I use rxJs Subject to pass information from the service to the subscribed component 
  public async checkForRepos(user: string){
    this.httpClient.get(`https://api.github.com/users/${user}/repos`)
    .subscribe((response: any) => {
        let arr: [] = response;
        for(let j = 0; j < arr.length; j++){
          this.githubSubject.next(arr[j]);
        }
      
    }, () => {
      this.errorSubject.next("User doesn't exist")
    });
  }

  //GET request to a specific repository to retrieve detailed information about it
  public getRepoInfo(repoUrl: string){
    this.httpClient.get(repoUrl)
    .subscribe((response: any) => {
      this.githubSubject.next(response);
    }, () => {
      this.errorSubject.next("Problem occurred, while trying to access the selected repository. Please try again.")
    });
    // //Another option to perfrom requests *Uncomment to try this way*
    // let request = new XMLHttpRequest();
    // request.open("GET", repoUrl);
    // request.send();
    // request.onload = () => {
    //   if (request.status === 200) {
    //     this.githubSubject.next(JSON.parse(request.response));
        
    //   } else {
    //     console.log(`error ${request.status} ${request.statusText}`);
    //   }
    // };
  }

  //Makes sense to use Subject instead of Observable
  public getRepoDetailsPeriodically(repoUrl: string){
    while(true){
      let timeout = setTimeout( () => {
          this.getRepoInfo(repoUrl);
          clearTimeout(timeout);
        }, 10000 );
    }
  }
}

