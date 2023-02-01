var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var movieInstance;
var Movie = /** @class */ (function () {
    function Movie(id, title, poster, releaseDate, description) {
        this.rentStatus = false;
        this.rentAmount = 0;
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.releaseDate = releaseDate;
        this.description = description;
    }
    return Movie;
}());
var MovieInventory = /** @class */ (function () {
    function MovieInventory(movieList) {
        this.inventory = [];
        this.inventory = movieList;
    }
    MovieInventory.getMovies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://api.themoviedb.org/4/list/1?api_key=".concat(this.API_KEY))
                            .then(function (result) { return result.json(); })
                            .then(function (data) {
                            if (data.results !== undefined) {
                                return data.results;
                            }
                        })
                            .then(function (movieArray) {
                            var movieInventory = [];
                            movieArray.forEach(function (movie) {
                                var movieObj_ = new Movie(movie.id, movie.original_title, movie.poster_path, movie.release_date, movie.overview);
                                movieInventory.push(movieObj_);
                            });
                            return movieInventory;
                        })["catch"](function (err) {
                            console.log(err);
                            return [];
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    //a private member for calculating the amount 
    MovieInventory.prototype.calculatedRentAmount = function (rentedTimeStamp, leaveTimeStamp) {
        if (rentedTimeStamp !== undefined) {
            rentedTimeStamp = new Date(rentedTimeStamp);
            var rentedTimeStampSeconds = rentedTimeStamp.getTime() / 1000;
            if (leaveTimeStamp !== undefined) {
                var date = new Date(leaveTimeStamp);
                var seconds = date.getTime() / 1000;
                return (seconds - rentedTimeStampSeconds) / 1000;
            }
            else {
                var date = new Date();
                var seconds = date.getTime() / 1000;
                return (seconds - rentedTimeStampSeconds) * 1000;
            }
        }
        else {
            return 0;
        }
    };
    //for adding movies to inventory
    MovieInventory.prototype.addMovieToInventory = function (movie) {
        this.inventory.push(movie);
    };
    //for renting movies
    MovieInventory.prototype.rentMovie = function (id) {
        var movieIndex = this.inventory.findIndex(function (movie) { return movie.id === id; });
        if (movieIndex != -1) {
            var movieStaus = this.inventory[movieIndex]['rentStatus'];
            if (movieStaus === false) {
                this.inventory[movieIndex]['rentStatus'] = true;
                this.inventory[movieIndex]['rentedTimeStamp'] = new Date();
            }
            else {
                console.log("Movie is already rented!!");
            }
        }
        else {
            console.log("Movie not found!!");
        }
    };
    //for checking rent
    MovieInventory.prototype.checkRentAmount = function (movie) {
        return this.calculatedRentAmount(movie.rentedTimeStamp, movie.leaveTimeStamp);
    };
    //for releasing movie after renting
    MovieInventory.prototype.leaveMovie = function (id) {
        var movieIndex = this.inventory.findIndex(function (movie) { return movie.id === id; });
        if (movieIndex != -1) {
            var movieStaus = this.inventory[movieIndex]['rentStatus'];
            if (movieStaus === true) {
                this.inventory[movieIndex]['rentStatus'] = false;
                this.inventory[movieIndex]['leaveTimeStamp'] = new Date();
            }
            else {
                console.log("Movie is not rented!!");
            }
        }
        else {
            console.log("Movie not found!!");
        }
    };
    MovieInventory.API_KEY = 'd719ad197b42dfe20c7a634825c56850';
    return MovieInventory;
}());
var getMovies = function () { return __awaiter(_this, void 0, void 0, function () {
    var movieData, selectedMovie;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MovieInventory.getMovies()];
            case 1:
                movieData = _a.sent();
                movieInstance = new MovieInventory(movieData);
                selectedMovie = movieInstance.inventory[0];
                console.log(selectedMovie, 'rent movie 1');
                movieInstance.rentMovie(selectedMovie.id);
                selectedMovie = movieInstance.inventory[0];
                console.log(selectedMovie, 'rent movie 2');
                setTimeout(function () {
                    selectedMovie = movieInstance.inventory[0];
                    var amount = movieInstance.checkRentAmount(selectedMovie);
                    console.log(amount.toFixed(2), 'Rs-/ amount');
                }, 1000);
                return [2 /*return*/];
        }
    });
}); };
getMovies();
