import { TestBed } from '@angular/core/testing';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';

import { authGuard } from './auth.guard';
import {AuthService} from "../services/auth.service";

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));
  let authService: AuthService;
  let router = jasmine.createSpyObj('Router', ['createUrlTree']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router }
      ]
    });
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if logged in', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const authServiceSpy = spyOn(authService, 'isLoggedIn').and.returnValue(true);

    executeGuard(route, state)
    expect(authGuard).toBeTruthy()
  });
  it('should create a UrlTree for login if not logged in', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    spyOn(authService, 'isLoggedIn').and.returnValue(false);

    executeGuard(route, state);

    expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
  });
});
