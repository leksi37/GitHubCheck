import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookmark } from 'src/shared-classes/bookmark';
import { GithubReaderService } from './github-reader.service';

@Injectable({
  providedIn: 'root'
})

/**
 * This service handles the creation and the requests for details of bookmarks
 */
export class BookmarkService {
  private bookmarks: Bookmark[] = [];
  constructor(private _githubService: GithubReaderService) { }

  /**
   * Creation of a bookmark, github service is used to perform a request for the Repo object, which is to be saved in the Bookmark object
   * @param repoName the name of the repository
   * @param owner the owner of the repository
   */
  public addBookmark(repoName: string, owner: string) {
    let repo = this._githubService.checkForReposObservable(owner);
    repo.forEach(repoArr => {
      repoArr.forEach((repo: any) => {
        if (repo.name == repoName)
          this.bookmarks.push(new Bookmark(repo.name, repo));
      });
    });
  }

  /**
   * Return a list with the names of the bookmarks (repositories)
   * This could be better achieved through a subscription, without the need to call the getBookmarks method after the creation of a new bookmark.
   */
  public getBookmarks(): string[] {
    let stringBookmarks = [];
    for (let i = 0; i < this.bookmarks.length; i++) {
      if (this.bookmarks[i] != null)
        stringBookmarks.push(this.bookmarks[i].name);
    }
    return stringBookmarks;
  }

  /**
   * Performs a request through the github service to retrieve the details for the provided in the params repostory
   * @param name the name of the bookmark (repository), which details are to be retrieved
   */
  public openBookmark(name: string): Observable<string> {
    for (let i = 0; i < this.bookmarks.length; i++) {
      if (this.bookmarks[i] != null && this.bookmarks[i].name == name) {
        return this._githubService.getRepoInfoObservable(this.bookmarks[i].repo.url);
      }
    }
    return null;
  }

}

