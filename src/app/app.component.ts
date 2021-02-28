import { Component, Input, SecurityContext, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Observer, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { GithubReaderService } from 'src/services/github-reader.service';
import { catchError, first, map, take } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AlertComponent } from 'src/alert/alert.component';
import { Repo } from 'src/shared-classes/repo';
import { BookmarkService } from 'src/services/bookmark.service';
import { BookmarksComponent } from 'src/bookmarks/bookmarks.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * Parent class
 */
export class AppComponent {
  @ViewChild(AlertComponent) alert: AlertComponent;
  @ViewChild(BookmarksComponent) bookmark: BookmarksComponent;

  public repoName = "";

  //Github user repository list
  public repositories$: Observable<Repo[]> = new Observable<Repo[]>();

  //Github reposioty details list
  public repoDetails$: Observable<string> | null = null;

  //Used as a clock
  public time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toLocaleTimeString()), 1000);
  });

  constructor(private _githubService: GithubReaderService) { }

  /**
   * Search for repositories by the given in the parameters username through the Github Service
   * @param userName the Github username
   * the returned value is an Observable with list of the repositories for that user
   */
  searchForRepos(userName: any) {
    this.repoDetails$ = null;
    this.alert.setEmpty();
    if (userName.length == 0) {
      this.alert.setNoInput();
    }
    else {
      this.repositories$ = this._githubService.checkForReposObservable(userName)
        .pipe(
          catchError(() => {
            this.alert.setUserNotFound();
            return of([]);
          })
        );
    }
  }

  /**
   * Requests detailed information about the repository with the specified in the parameters url
   * @param url The url to call to get detailed information about the repository
   * the returned value is an Observable, which is being handled by fetchDetails to extract the needed information
   */
  public requestRepoInfo(url: any) {
    this.fetchDetails(this._githubService.getRepoInfoObservable(url));
  }

  /**
   * Used as a redirective method from one child component to another for the creation of a bookmark
   * @param repoInfo contains a string in the following formar => "repository-name:owner"
   */
  public addBookmark(repoInfo: string) {
    this.bookmark.addBookmark(repoInfo);
  }

  /**
   * Used to fetch the details received from the bookmark component, which from the other side received it from the bookmark service
   * @param details contains details about a repository
   * The difference between this method and requestRepoInfo() is that this one is called through a bookmark and the other one through the repository table
   */
  public displayBookmarkDetails(details: Observable<string>) {
    this.fetchDetails(details);
  }

  /**
   * Clears all kinds of error messages
   */
  public clearAlerts() {
    this.alert.setEmpty();
    this.repositories$ = null;
  }

  /**
   * This method exists not to break DRY (Don't Repeat Yourself). 
   * Therefore it handles the returned details about the selected repository
   * @param observable contains details for the selected repository 
   */
  public fetchDetails(observable: Observable<string>) {
    this.repoDetails$ = observable.
      pipe(
        map((response: any) => {
          this.repoName = response.name;
          return `
        Id: ${response.id} 
        Owner: ${response.owner.login}
        Full name: ${response.full_name}
        Private: ${response.private}
        Description: ${response.description} 
        Created: ${formatDate(response.created_at)}
        Updated: ${formatDate(response.updated_at)}
        Pushed: ${formatDate(response.pushed_at)}
        Repository size: ${response.size}`;

          function formatDate(date: string): string {
            return new Date(date).toDateString();
          }
        }), catchError(() => {
          return ('Repository details were not found');
        }));
  }

}


