import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookmarksComponent } from './bookmarks.component';

describe('BookmarksComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        BookmarksComponent
      ],
    }).compileComponents();
  });
});
