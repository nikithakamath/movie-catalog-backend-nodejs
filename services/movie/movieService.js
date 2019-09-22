'use strict';

let movieModel = require('../../models/movie/movie');

class MovieService {
  constructor() {

  }
  getMovies() {
    return movieModel.getMovies();
  }
  getMovieRelatedData(movieID) {
    let promises = [];
    promises.push(movieModel.getMovieGenres(movieID));
    promises.push(movieModel.getMovieKeywords(movieID));
    return Promise.all(promises);
  }
  getMovieDetails(movieID) {
    return new Promise((resolve, reject) => {
      let finalData;
      movieModel.getMovieDetails(movieID)
        .then((movieDetails) => {
          if (movieDetails) {
            finalData = movieDetails;
            return this.getMovieRelatedData(movieID);
          } else {
            resolve({});
          }
        })
        .then((result) => {
          finalData.genres = result[0];
          finalData.keywords = result[1];
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
  async discoverMovies(requestData) {
    try {
      let result;
      if (requestData.hasOwnProperty('genre_id')) {
        result = await movieModel.discoverByGenre(requestData.genre_id);
      } else if(requestData.hasOwnProperty('keyword_id')) {
        result = await movieModel.discoverByKeyword(requestData.keyword_id);
      } else {
        result = await movieModel.getMovies();
      }
      return Promise.resolve(result);
    } catch(error) {
      return Promise.reject(error);
    }
  }
  listKeywords() {
    return movieModel.listKeywords();
  }
  getMovieStatus() {
    return movieModel.getMovieStatus();
  }
}

let movieServiceObj = new MovieService();

module.exports = movieServiceObj;
