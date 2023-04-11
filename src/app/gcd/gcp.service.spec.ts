import { TestBed } from '@angular/core/testing';

import { GcpService } from './gcp.service';

describe('GcpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GcpService = TestBed.get(GcpService);
    expect(service).toBeTruthy();
  });
});
