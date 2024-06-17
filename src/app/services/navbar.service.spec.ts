import { TestBed } from '@angular/core/testing';
import { NavbarService } from './navbar.service';

describe('NavbarService', () => {
  let service: NavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the title', (done) => {
    const testTitle = 'Test Title';
    service.setTitle(testTitle);

    service.title$.subscribe((title) => {
      expect(title).toBe(testTitle);
      done();
    });
  });
});
