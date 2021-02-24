import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Observer, ReplaySubject, Subject, Subscription } from 'rxjs';
import { GithubReaderService } from 'src/services/github-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public repoName = "";

  //used as error notifier
  public errorMessage: string = "";
  public isError$ = new Subject<boolean>();

  //Github user repository list
  public repositories$: Observable<Repo[]>|null= null;

  //Github reposioty details list
  public repoInfo = new Array<any>();

  private subscription: any;

  public time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
  
  constructor(private _githubService: GithubReaderService){}

  public ngOnDestroy(){
    this.subscription.unsubscribe();
    this.isError$.unsubscribe();
  }

  onEnter(userName: any){
    this.searchForRepos(userName);
  }

  //Search for repositories by the given in the parameters username through the Github Service
  searchForRepos(userName: any){
      this.isError$.next(false);

      
    if(userName == ""){
      this.errorMessage = "Please enter a username";
      activateError.call(this);
    }
    else{
      this.repositories$ = this._githubService.checkForReposAsync(userName);
    //Subscribtion is used, so that the end user would be notified if an error occurs.
    //Subscription is cleared upon destruction of the component => ngOnDestroy();
    this.subscription = this.repositories$.subscribe(response => {
      let repo: Repo[] = response;
        if(repo.length == 0){
          this.errorMessage = "User doesn't have any public repositories.";
          activateError.call(this);
        }
    }, () => {
      this.errorMessage = "User doesn't exist";
      activateError.call(this);
    });
    }
    

    function activateError(){
      this.isError$.next(true);
      this.repositories$ = null;
    }

    //The following code is doing exactly the same as the one above.
    //The only difference is that in the code below are used rxjs's Subjects and 
    //  in the code above an Observable is being returned and error handling hapens in this method not in the GitHubService 

    //let exists: boolean = false;
    // let sub = (this._githubService.githubSubject.subscribe((response: any) => {
    //   let repo = new Repo(response.name, response.html_url, response.url);
    //   for(let i = 0; i < this.repoList.length; i++){
    //     if(this.repoList[i].name == repo.name){
    //       exists = true;
    //     }
    //   }
    //   if(!exists)
    //     this.repoList.push(repo);
    // }));

    // let errorSub = (this._githubService.errorSubject.subscribe((response: string) => {
    //   this.errorMessage = response;
    // }));

    // this._githubService.checkForRepos(userName);

    // //created timeout to unsubscribe, which I later clear so no memory leak would occur
    // let timeout: any;
    // timeout = setTimeout(terminateSub, 3000);
    // function terminateSub(){
    //   sub.unsubscribe();
    //   // errorSub.unsubscribe();
    //   clearTimeout(timeout);
    // }
  }

  //request detailed information about the repository with the specified in the parameters url
  public requestRepoInfo(url: any){
    this.repoInfo = [];

    let sub = (this._githubService.githubSubject.subscribe((response: any) => {
      this.repoName = response.name;
      this.repoInfo.push(`Id: ${response.id}`);
      this.repoInfo.push(`Full name: ${response.full_name}`);
      this.repoInfo.push(`Private: ${response.private}`);
      this.repoInfo.push(`Description: ${response.description}`);
      this.repoInfo.push(`Created: ${response.created_at}`);
      this.repoInfo.push(`Updated: ${response.updated_at}`);
      this.repoInfo.push(`Pushed: ${response.pushed_at}`);
      this.repoInfo.push(`Repository size: ${response.size}`);
      sub.unsubscribe();
    }));
    this._githubService.getRepoInfo(url);
  }

}

//Manual repository representational object for proper display of the main information of the Github repos in the html
export class Repo{
  public name: string;
  public html_url: string;
  public url: string;

  constructor(name: string, html_url: string, url: string){
    this.name = name;
    this.html_url = html_url;
    this.url = url;
  }
}