import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MovieListObject, MovieSearchResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  private readonly api_key = 'bc3cbb180a0ca2a35eb2d9c278f6d3b3';

  getMovies(): Observable<MovieListObject[]> {
    const requiredParameters = {
      api_key: this.api_key,
    };

    return this.httpClient
      .get<MovieSearchResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        {
          params: requiredParameters,
        }
      )
      .pipe(map((response) => response.results));
  }

  getMovie(id: string): Observable<MovieListObject> {
    return this.httpClient.get<MovieListObject>(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: this.api_key,
        },
      }
    );
  }
  searchMovies(term: string): Observable<MovieListObject[]> {
    return this.httpClient
      .get<MovieSearchResponse>(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: this.api_key,
          query: term,
        },
      })
      .pipe(map((response) => response.results));
  }
}
