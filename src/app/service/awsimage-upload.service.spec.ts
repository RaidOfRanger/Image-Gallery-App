import { TestBed } from '@angular/core/testing';

import { AWSImageUploadService } from './awsimage-upload.service';

describe('AWSImageUploadService', () => {
  let service: AWSImageUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AWSImageUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
