import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth.service";

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let router: Router;

  let fixture: ComponentFixture<MovieDetailsComponent>;


  beforeEach(async () => {
    const activatedRouteMock = {
      snapshot: {
        paramMap: convertToParamMap({ id: 'test' })
      }
    };

    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to movies on successful login', () => {
    const navigateSpy = spyOn(router, 'navigate')
    component.onClose()
    expect(navigateSpy).toHaveBeenCalledWith(['/movies']);
  });
});
