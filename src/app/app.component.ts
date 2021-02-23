import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GithubReaderService } from 'src/services/github-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public repoName = "";

  //used as error notifier
  public errorMessage = "";

  //Github user repository list
  public repoList = new Array<Repo>();

  //Guhub reposioty details list
  public repoInfo = new Array<any>();

  constructor(private _githubService: GithubReaderService){}

  onEnter(userName: any){
    this.searchForRepos(userName);
  }

  //Search for repositories by the given in the parameters username through the Github Service
  searchForRepos(userName: any){
    this.repoList = [];
    this.errorMessage = "";
    this.repoInfo = [];
    //Avoids duplicate display of information
    let exists: boolean = false;

    let sub = (this._githubService.githubSubject.subscribe((response: any) => {
      let repo = new Repo(response.name, response.html_url, response.url);
      for(let i = 0; i < this.repoList.length; i++){
        if(this.repoList[i].name == repo.name){
          exists = true;
        }
      }
      if(!exists)
        this.repoList.push(repo);
    }));

    let errorSub = (this._githubService.errorSubject.subscribe((response: string) => {
      this.errorMessage = response;
    }));

    this._githubService.checkForRepos(userName);

    //created timeout to unsubscribe, which I later clear so no memory leak would occur
    let timeout: any;
    timeout = setTimeout(terminateSub, 3000);
    function terminateSub(){
      sub.unsubscribe();
      errorSub.unsubscribe();
      clearTimeout(timeout);
    }
  }

  //request detailed information about the repository with the specified in the parameters url
  public requestRepoInfo(url: any){
    this.repoInfo = [];
    this.errorMessage = "";

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
  public homepageUrl: string;
  public displayUrl: string;

  constructor(name: string, homepageUrl: string, displayUrl: string){
    this.name = name;
    this.homepageUrl = homepageUrl;
    this.displayUrl = displayUrl;
  }
}