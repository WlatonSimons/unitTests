export interface MovieSearchResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: MovieListObject[];
  }
  
  export interface MovieListObject {
    id: number;
    adult: boolean;
    overview: string;
    genre_ids: number[];
    release_date: string;
    original_title: string;
    original_language: string;
    title: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
    poster_path: string | null;
    backdrop_path: string | null;
  }
  