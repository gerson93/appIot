import { TestBed } from '@angular/core/testing';

import { UpdateIpService } from './update-ip.service';

describe('UpdateIpService', () => {
  let service: UpdateIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
