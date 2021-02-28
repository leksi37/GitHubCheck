import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepoTableComponent } from './repo-table/repo-table.component';
import { UserInputComponent } from './userInput/user-input.component';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { AlertComponent } from './alert/alert.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';


@NgModule({
  declarations: [
    AppComponent,
    RepoTableComponent,
    UserInputComponent,
    RepoDetailsComponent,
    AlertComponent,
    BookmarksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
