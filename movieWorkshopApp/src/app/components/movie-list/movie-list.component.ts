import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { MovieListObject } from '../../types';
import { RouterLink } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-list.component.html',
  standalone: true,
  styleUrls: ['./movie-list.component.scss', '../../app.component.scss'],
})
export class MovieListComponent {
  movies$: Observable<MovieListObject[]> = of([]);
  #destroyRef = inject(DestroyRef);

  constructor(
    private movieService: MovieService,
    private searchService: SearchService
  ) {
    this.searchService.searchObservable
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((term) => {
        if (term) {
          this.movies$ = this.movieService.searchMovies(term);
        } else {
          this.movies$ = this.movieService.getMovies();
        }
      });
  }
}
