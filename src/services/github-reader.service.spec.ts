import { TestBed } from '@angular/core/testing';

import { GithubReaderService } from './github-reader.service';

describe('GithubReaderService', () => {
  let service: GithubReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
