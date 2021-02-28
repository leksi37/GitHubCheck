import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RepoTableComponent } from './repo-table.component';

describe('RepoTableComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        RepoTableComponent
      ],
    }).compileComponents();
  });
});
