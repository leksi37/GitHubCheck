import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Repo } from 'src/shared-classes/repo';


@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})

/**
 * This component is responsible for the alert messages, to notify the user when something is wrong
 */
export class AlertComponent {
  public errorMessage: string = "";
  @Input() repositories$: Observable<Repo[]>;

  public NO_REPOSITORIES = "No public repositories were found for that user";
  private NO_INPUT = "Please enter a username";
  private NO_USER = "User doesn't exist";

  /**
   * Sets the error message to "User doesn't exist" when an invalid github name has been entered as user input
   */
  public setUserNotFound() {
    this.errorMessage = this.NO_USER;
  }

 /**
 * Sets the error message to "Please enter a username" when nothing is entered as user input, but a search atempt is made
 */
  public setNoInput() {
    this.errorMessage = this.NO_INPUT;
  }

  /**
  * Sets the error message to an empty string, so that the alert box is hidden 
  * (can be also achived with a boolean box to set it to active or inactive, but I choose this approach:
  * hiding and showing depending of the length of the @param errorMessage and the number of items inside @field repositories$)
  */
  public setEmpty() {
    this.errorMessage = "";
  }
}