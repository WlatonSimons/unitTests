import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MovieListComponent, canActivate: [authGuard] },
  {
    path: 'movies/movie/:id',
    component: MovieDetailsComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
