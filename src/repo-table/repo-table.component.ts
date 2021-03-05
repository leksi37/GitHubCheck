import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  @Input() repositories: Repo[] = [];
  @Output() detailsRequest = new EventEmitter<string>();

  dataSource: MatTableDataSource<Repo>;
  //Currently not working
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.dataSource = new MatTableDataSource<Repo>(this.repositories);
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Redirects a request to the parent component to request details about the selected repository
   * @param url the specific repository url for the request
   */
  requestDetails(url: any): void {
    this.detailsRequest.next(url);
  }
}