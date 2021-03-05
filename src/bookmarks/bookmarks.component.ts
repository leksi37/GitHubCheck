import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BookmarkService } from 'src/services/bookmark.service';
import { Repo } from 'src/shared-classes/repo';

/**
 * This component handles the bookmarks bar
 */
@Component({
  selector: 'bookmark-bar',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent {

  public bookmarks$: Observable<string[]> | null = null;
  @Output() details = new EventEmitter<string>();
  @Output() clearAlerts = new EventEmitter();

  constructor(private _bookmarkService: BookmarkService) { }

  /**
   * Creates a bookmark through the bookmark service and requests a list with the bookmarks
   * @param repoInfo contains a Repo object
   */
  public addBookmark(repo: Repo) {
    this._bookmarkService.addBookmark(repo);
    this.bookmarks$ = this._bookmarkService.getBookmarks$();
  }

  /**
   * Requests the the bookmark Repo object
   * @param bookmark the name of the repository
   */
  public openBookmark(bookmark: string) {
    this.clearAlerts.next();
    this.details.next(this._bookmarkService.openBookmark(bookmark).url);
  }
}