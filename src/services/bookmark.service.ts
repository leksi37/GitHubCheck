import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Repo } from 'src/shared-classes/repo';
import { GithubReaderService } from './github-reader.service';

@Injectable({
  providedIn: 'root'
})

/**
 * This service handles the creation and the requests for details of bookmarks
 */
export class BookmarkService {
  private bookmarks: Repo[] = [];
  private bookmarksDisplay: string[] = [];
  constructor() { }

  /**
   * Creation of a bookmark, github service is used to perform a request for the Repo object, which is to be saved in the Bookmark object
   * @param repoName the name of the repository
   * @param owner the owner of the repository
   */
  public addBookmark(repo: Repo) {
      this.bookmarks.push(repo);
      this.bookmarksDisplay.push(repo.name);
  }

  /**
   * Return an Observable with a string list, which contains the names of the bookmarks (repositories)
   * This could be better achieved through a subscription, without the need to call the getBookmarks method after the creation of a new bookmark.
   */
  public getBookmarks$(): Observable<string[]>{
    return of(this.bookmarksDisplay);
  }

  /**
   * Performs a request through the github service to retrieve the details for the provided in the params repostory
   * @param name the name of the bookmark (repository), which details are to be retrieved
   */
  public openBookmark(name: string): Repo {
    for (let i = 0; i < this.bookmarks.length; i++) {
      if (this.bookmarks[i] != null && this.bookmarks[i].name == name)
        return this.bookmarks[i];
    }
    return null;
  }

}

