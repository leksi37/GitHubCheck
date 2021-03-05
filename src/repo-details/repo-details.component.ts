import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss']
})

/**
 * This component is used for the display of the details of the selected repository
 */
export class RepoDetailsComponent {
  @Input() public repoDetails$: Observable<string>;
  @Input() public repoName: string;
  @Output() bookmark = new EventEmitter<string>();

  /**
   * This method is used for notifying the parent class that a bookmarked should be created 
   */
  public addBookmark() {
    this.repoDetails$.forEach(value => {
      let owner = value.substring(value.indexOf("Owner:") + 7, value.indexOf("Full"));
      this.bookmark.next(`${owner}:${this.repoName}`);
    });
  }
} 