import { TestBed } from '@angular/core/testing';

import { WeatherApiService } from './weatherapi.service';

describe('ApixuService', () => {
  let service: WeatherApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
