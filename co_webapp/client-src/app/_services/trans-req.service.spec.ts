import { TestBed, inject } from '@angular/core/testing';

import { TransReqService } from './trans-req.service';

describe('TransReqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransReqService]
    });
  });

  it('should ...', inject([TransReqService], (service: TransReqService) => {
    expect(service).toBeTruthy();
  }));
});
