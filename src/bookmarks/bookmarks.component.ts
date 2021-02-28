import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BookmarkService } from 'src/services/bookmark.service';

/**
 * This component handles the bookmarks bar
 */
@Component({
  selector: 'bookmark-bar',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent {

  public bookmarks: string[] = [];
  @Output() details = new EventEmitter<Observable<string>>();
  @Output() clearAlerts = new EventEmitter();

  constructor(private _bookmarkService: BookmarkService) { }

  /**
   * Creates a bookmark through the bookmark service
   * @param repoInfo contains a string in the following formar => "repository-name:owner"
   */
  public addBookmark(repoInfo: string) {
    this._bookmarkService.addBookmark(repoInfo.substring(repoInfo.indexOf(":") + 1), repoInfo.substring(0, repoInfo.indexOf(":")));
    let timeout = setTimeout(getBookmarks.bind(this), 700);
    function getBookmarks() {
      this.bookmarks = this._bookmarkService.getBookmarks();
      clearTimeout(timeout);
    }

  }

  /**
   * Requests the details of the bookmarked repository through the bookmark service
   * @param bookmark the name of the repository
   */
  public openBookmark(bookmark: string) {
    this.clearAlerts.next();
    this.details.next(this._bookmarkService.openBookmark(bookmark));
  }
}