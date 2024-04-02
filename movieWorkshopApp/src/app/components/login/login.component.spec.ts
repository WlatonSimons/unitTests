import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('LoginComponent', () => {
    beforeEach(async () => {
      authService = TestBed.inject(AuthService);
      router = TestBed.inject(Router);
    });

    it('should navigate to movies on successful login', () => {
      const authServiceSpy = spyOn(authService, 'login').and.returnValue(true);
      const navigateSpy = spyOn(router, 'navigate')

      component.loginForm.setValue({ username: 'validUsername', password: 'validPassword' });
      component.onSubmit();

      expect(authServiceSpy).toHaveBeenCalledWith('validUsername', 'validPassword');
      expect(navigateSpy).toHaveBeenCalledWith(['/movies']);
    });

    it('should display alert on failed login', () => {
      const alertSpy = spyOn(window, 'alert');
      const authServiceSpy = spyOn(authService, 'login').and.returnValue(false); // Spy on window.alert

      component.loginForm.setValue({ username: 'invalidUsername', password: 'invalidPassword' });
      component.onSubmit();

      expect(authServiceSpy).toHaveBeenCalledWith('invalidUsername', 'invalidPassword');
      expect(alertSpy).toHaveBeenCalledWith('Login failed');
    });
  });
});
