import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieListObject } from '../../types';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
movie$: Observable<MovieListObject>;

constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService){
  const id = this.route.snapshot.paramMap.get('id');
  this.movie$ = this.movieService.getMovie(id ? id : '');
}

onClose(){
  this.close();
}


private close(){
  this.router.navigate(['/movies']);
}

}
