import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Repo } from 'src/shared-classes/repo';

/**
 * This component handles the table, containing a list of the user repositories 
 */
@Component({
  selector: 'repo-list-table',
  templateUrl: './repo-table.component.html',
  styleUrls: ['./repo-table.component.scss']
})
export class RepoTableComponent {
  displayedColumns = ['name', 'url', 'details'];
  @Input() repositories$: Observable<Repo[]> = new Observable<Repo[]>();
  @Output() detailsRequest = new EventEmitter<string>();

  /**
   * Redirects a request to the parent component to request details about the selected repository
   * @param url the specific repository url for the request
   */
  requestDetails(url: any): void {
    this.detailsRequest.next(url);
  }
}