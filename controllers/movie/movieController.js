'use strict';

const express = require('express');
const router = express.Router();

let movieService = require('../../services/movie/movieService');

class MovieController {
  constructor() {

  }
  getMovies(request, response) {
    movieService.getMovies()
      .then((movieList) => {
        response.status(200).json({
          success: true,
          data: movieList
        });
      })
      .catch((error) => {
        response.status(500).json({
          success: false,
          data: error
        });
      });
  }
  getMovieDetails(request, response) {
    movieService.getMovieDetails(request.query.movie_id)
      .then((movieDetails) => {
        response.status(200).json({
          success: true,
          data: movieDetails
        });
      })
      .catch((error) => {
        response.status(500).json({
          success: false,
          data: error
        });
      });
  }
  listGenres(request, response) {
    movieService.listGenres()
      .then((genreList) => {
        response.status(200).json({
          success: true,
          data: genreList
        });
      })
      .catch((error) => {
        response.status(500).json({
          success: false,
          data: error
        });
      });
  }
  discoverMovies(request, response) {
    movieService.discoverMovies(request.query)
      .then((movieList) => {
        response.status(200).json({
          success: true,
          data: movieList
        });
      })
      .catch((error) => {
        response.status(500).json({
          success: false,
          data: error
        });
      });
  }
  listKeywords(request, response) {
    movieService.listKeywords()
      .then((keywordList) => {
        response.status(200).json({
          success: true,
          data: keywordList
        });
      })
      .catch((error) => {
        response.status(500).json({
          success: false,
          data: error
        });
      });
  }
  getMovieStatus(request, response) {
    movieService.getMovieStatus()
      .then((movieStatus) => {
        response.status(200).json({
          success: true,
          data: movieStatus
        });
      })
      .catch((error) => {
        response.status(500).json({
          success: false,
          data: error
        });
      });
  }
}

let movieObj = new MovieController();

router.get('/', movieObj.getMovies);
router.get('/details', movieObj.getMovieDetails);
router.get('/genre', movieObj.listGenres);
router.get('/discover', movieObj.discoverMovies);
router.get('/keyword', movieObj.listKeywords);
router.get('/status', movieObj.getMovieStatus);

module.exports.movieObj = movieObj;
module.exports.router = router;
