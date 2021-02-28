import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RepoDetailsComponent } from './repo-details.component';

describe('RepoDetailsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        RepoDetailsComponent
      ],
    }).compileComponents();
  });
});
