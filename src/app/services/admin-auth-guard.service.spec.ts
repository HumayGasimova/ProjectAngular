import { TestBed } from '@angular/core/testing';

import { AdminAuthGuard } from 'app/shared/services/admin-auth-guard.service';

describe('AdminAuthGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAuthGuard = TestBed.get(AdminAuthGuard);
    expect(service).toBeTruthy();
  });
});
