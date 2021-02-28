import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'user-input-child',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})

/**
 * This component is used for the user input of the github username
 */
export class UserInputComponent {
  @Output() repoRequest = new EventEmitter<string>();

  /**
   * Requests a list with the repositories by emitting the username to the parent
   * @param username the github username
   */
  requestRepositories(username: any): void {
    this.repoRequest.next(username);
  }
  
  /**
   * Calls the requestRepositories method from above with the same user input
   * This is done so that the user have two options to search: by pressing the search button and by pressing enter
   * @param username the github username
   */
  onEnter(username: any){
    this.requestRepositories(username);
  }
}