import {fakeAsync, TestBed} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AppComponent } from './app.component';
import {SearchService} from "./services/search.service";
import {Router} from "@angular/router";

describe('AppComponent', () => {
  let formBuilder: FormBuilder;
  let searchService: SearchService;
  let router: Router;


  beforeEach(() => {
    formBuilder = new FormBuilder();
    searchService = jasmine.createSpyObj('SearchService', ['setSearchTerm']); //function spy objects

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: SearchService, useValue: searchService },
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should call searchService.setSearchTerm with the latest search term after debounce time', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const searchService = TestBed.inject(SearchService);
    const searchValue = 'test';
    const debounceTimeMs = 1000;

    app.searchForm.setValue({ search: searchValue });

    setTimeout(() => {
      expect(searchService.setSearchTerm).toHaveBeenCalledWith(searchValue);
      done();
    }, debounceTimeMs);
  });

  describe('onSubmit', () => {
    it('should call searchService.setSearchTerm with searchValue', (done) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const searchService = TestBed.inject(SearchService);
      const searchValue = 'test';

      app.searchForm.setValue({ search: searchValue });
      app.onSubmit();

      fixture.whenStable().then(() => {
        expect(searchService.setSearchTerm).toHaveBeenCalledWith(searchValue);
        done();
      });
    });
  });

  describe('onClose', () => {
    it('should remove item from localStorage and navigate to login page', fakeAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;

      spyOn(localStorage, 'removeItem');
      spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

      app.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('isAuthenticated');
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    }));
  })
});
