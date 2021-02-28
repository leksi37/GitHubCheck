import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserInputComponent } from './user-input.component';

describe('UserInputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        UserInputComponent
      ],
    }).compileComponents();
  });
});
