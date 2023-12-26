import { TestBed } from '@angular/core/testing';

import { AwsgetimageService } from './awsgetimage.service';

describe('AwsgetimageService', () => {
  let service: AwsgetimageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsgetimageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
