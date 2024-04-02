# Task 1

## Create movie-list component

1. Run `ng g c components/movie-list`
2. Add the `movie-list-component` to `app.component.html` and see if it works

# Task 2

## Create service for fetching movies

1. Create a service that fetches popular movies from the TMDB API.
   - Run `ng g s services/movie`
2. Create a file `types.ts` in the app directory that will store the type that would be returned by the API (MovieSearchResponse) and the type that would be used to display those movie items (MovieListObject) (and other types).
3. Create a function inside `movie.service.ts` called `getMovies()` that will call the API and fetch popular movies. Use the api key and the URL provided below. Pass the api key as parameter in the GET request. The function should return an Observable of type `MovieListObject`.
4. Use this service in your `MovieListComponent` and call the `getMovies()` function and try subscribing it and console logging the result to see if the service works.

TMDB API usage docs: https://developer.themoviedb.org/reference/intro/getting-started
Popular movies endpoint: https://api.themoviedb.org/3/movie/popular
API Key: 'bc3cbb180a0ca2a35eb2d9c278f6d3b3'

# Task 3

## Display the response from `movieService` in your `MovieListCmponent`

1. Create a movies$ observable that would contain the response from the service.
2. In your constructor initialise this observable with the response returned from the service.
3. Use the for (control flow syntax) and display the `original_title` and `poster_path` attributes in your HTML. (Hint: append the `poster_path` to this URL to display the poster for the movies : https://image.tmdb.org/t/p/w200).

!! Bonus point for adding styling and make the list look nice ( You are free to use plain CSS or frameworks like Bootstrap or Tailwind ). !!

# Task 4

## Add routing

The movies component should be displayed at /movies endpoint.

1. Configure `app.component.html` to not directly use `app-movie-list` and configure your routes file to have `/movies` path which displays your movie component.
2. Configure the routes so that an empty route also loads the movie component.
3. Add a component that displays page not found error when you try to go to a route that doesn't exist. ( e.g going to `localhost:4200/shows` should show this not found component ).

# Task 5

## Show Movie details

Upon clicking the poster image, additional details about the movie should be shown.

1. Add a new component `movie-details` which would be used to show the movie details.
2. In the `movie.service` file add another function `getMovie` that takes an id as param and returns a single movie object based on the given id.
3. Configure your `MovieListCmponent` to add id of the selected movie upon clicking the poster image.
4. Update your routes to display MovieListComponent when we go to `/movies/movie/id` where id is the selected movie's id.
5. Now create a `movie$` observable which holds the detail from the `getMovie` function in your service and get the id from your route and initialise `movie$` with the value returned by the function (Hint: Look into how you can use `ActivatedRoute` to get stuff from the route).
6. Add some additional details about the movie for e.g. description and add a close button to this component so that you can use it to close and go back to the `/movies` route and display the movie list again.

API endpoint for getting movie by ID: https://api.themoviedb.org/3/movie/${id} (id to be replaced by the selected movie's id ).

!! As always make this look pretty using some styling magic for some brownie points !!

# Task 6

## Add login component and authorization service

1. Add a new `login` component which has a reactive form with two inputs for `username` and `password` and an `onSubmit` function for submitting the form.
2. Create `auth` service which would have would have a function `login` take the form values from the `login` component and compare it and return true if the entered values are correct and false if not.
3. Configure routes so that an empty path redirects to '/login' and '/login' to LoginComponent.
4. Configure `onSubmit` function to call the `login` function from the service and if it's successful login redirect to '/movies' endpoint and an alert with 'login failed' if it's unsuccesful.

# Task 7

## Add a canActivate functional guard

The movies endpoint can be accessed even after we use the auth service, so as to make it inaccessible until you are logged in, we will use a canActivate guard.

1. Use `ng g guard guards/auth` to generate `auth.guard.ts`.
2. Change your service to have an `isLoggedIn()` method which would return if you're logged in or not. Also update the `login` function to add a value to the localStorage which would can be used in the `isLoggedIn()` function to check the status.
3. Use the auth service in your guard and configure it so that if they are logged in they are able to access the movies enpoint and if not they stay on login endpoint ( Hint: look into how router.createUrlTree is used for guards ).
4. Now update your routes file so that the movies endpoint uses the auth guard.

# Task 8

## Add search functionality to get movies

We can add a search bar to the navbar and use a reactive form to get movies by keywords.

1. In your `app.component.html` right before the logout button add a reactive form which has one input field called `search` and a button to submit that search.
2. Create a new search service that would pass this value from the search form from app component to movie component.
3. Update your movie service to have a `searchMovies` function that takes in a query string and returns an array of movie based on that keyword.

- API enpoint: https://api.themoviedb.org/3/search/movie
- Pass the query inside your params with API Key and return the results.

4. In your search service, you can use a BehaviorSubject of type string that will have the value of the searched term and make a function `setSearchTerm` which just takes in a string and set the value of that Subject using `.next`.
5. In your app component listen to the value changes for your search input and pass that to the search service using `setSearchService` function.
6. Now use the searchService in your movie component to conditionally render either searched movies or popular movies.
