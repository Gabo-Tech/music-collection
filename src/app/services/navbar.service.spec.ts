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

  it('should have an initial title as an empty string', (done) => {
    service.title$.subscribe((title) => {
      expect(title).toBe('');
      done();
    });
  });

  it('should set and emit the new title', (done) => {
    const newTitle = 'Test Title';
    service.setTitle(newTitle);

    service.title$.subscribe((title) => {
      expect(title).toBe(newTitle);
      done();
    });
  });

  it('should emit the new title only once after setting it', (done) => {
    const newTitle = 'Test Title';
    let emissionCount = 0;

    service.title$.subscribe((title) => {
      emissionCount++;
      if (emissionCount === 1) {
        expect(title).toBe(newTitle);
      } else {
        fail('Title emitted more than once');
      }
    });

    service.setTitle(newTitle);
    setTimeout(() => {
      expect(emissionCount).toBe(2);
      done();
    }, 100);
  });
});
