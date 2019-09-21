'use strict';

let movieModel = require('../../models/movie/movie');

class MovieService {
  constructor() {

  }
  getMovies() {
    return movieModel.getMovies();
  }
  getMovieDetails(movieID) {
    return new Promise((resolve, reject) => {
      let finalData;
      movieModel.getMovieDetails(movieID)
        .then((movieDetails) => {
          if (movieDetails) {
            finalData = movieDetails
            return movieModel.getMovieGenres(movieDetails.movie_id);
          } else {
            resolve({});
          }
        })
        .then((movieGenres) => {
          finalData.genres = movieGenres;
          resolve(finalData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  listGenres() {
    return movieModel.listGenres();
  }
  discoverMovies(requestData) {
    return new Promise((resolve, reject) => {
      movieModel.discoverMovies(requestData.genre_id)
        .then((movieList) => {
          resolve(movieList);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  listKeywords() {
    return movieModel.listKeywords();
  }
  searchByKeyword(keywordID) {
    return new Promise((resolve, reject) => {
      movieModel.searchByKeyword(keywordID)
        .then((movieList) => {
          resolve(movieList);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getMovieStatus() {
    return movieModel.getMovieStatus();
  }
}

let movieServiceObj = new MovieService();

module.exports = movieServiceObj;
