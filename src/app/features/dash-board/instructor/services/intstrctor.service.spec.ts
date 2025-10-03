import { TestBed } from '@angular/core/testing';

import { IntstrctorService } from './instructor.service';

describe('IntstrctorService', () => {
  let service: IntstrctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntstrctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
