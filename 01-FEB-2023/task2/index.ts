//This include a example for abstraction, encapsulation and polymorphism
//This example includes a movie renting system with features like calculating rent of movie
//which is a private memeber of class showing encapsulation/abstraction
//also any type of movie can be added to movie inventory which shows polymorphism


let movieInstance: MovieInventory;

class Movie{
    id: Number;
    title: string;
    poster: string;
    releaseDate: Date;
    description: string;
    rentedTimeStamp?: Date;
    leaveTimeStamp?: Date;
    rentStatus: boolean = false;
    rentAmount?: Number = 0;

    constructor(id:Number, title:string, poster: string, releaseDate: Date, description: string){
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.releaseDate = releaseDate;
        this.description = description;
    }
}


class MovieInventory{
    private static API_KEY = 'd719ad197b42dfe20c7a634825c56850'
    inventory: Movie[] = [];

    constructor(movieList: Movie[]){
        this.inventory = movieList;
    }

    static async getMovies(): Promise<Movie[]>{

        const res = await fetch(`https://api.themoviedb.org/4/list/1?api_key=${this.API_KEY}`)
            .then((result) => result.json())
            .then((data)=> {
                if(data.results !== undefined){
                    return data.results;
                }
            })
            .then((movieArray) => {
                let movieInventory: Movie[] = []
                movieArray.forEach((movie) => {
                    let movieObj_ = new Movie(
                        movie.id, 
                        movie.original_title, 
                        movie.poster_path, 
                        movie.release_date, 
                        movie.overview
                    )
                    movieInventory.push(movieObj_);
                })
                return movieInventory;
            }).catch((err)=>{
                console.log(err);
                return []
            })

        return res;
    }

    //a private member for calculating the amount - abstraction
    private calculatedRentAmount(rentedTimeStamp: Date|undefined, 
        leaveTimeStamp: Date|undefined): Number{

        if(rentedTimeStamp !== undefined){
            rentedTimeStamp = new Date(rentedTimeStamp);
            let rentedTimeStampSeconds = rentedTimeStamp.getTime() /1000;

            if(leaveTimeStamp !== undefined){
                const date = new Date(leaveTimeStamp);    
                const seconds = date.getTime() / 1000;
                return (seconds - rentedTimeStampSeconds)/1000;
            } else {
                const date = new Date();    
                const seconds = date.getTime() / 1000;
                return (seconds - rentedTimeStampSeconds)*1000;
            }
        } else {
            return 0
        }

    }

    //for adding movies to inventory - Encapsulation
    addMovieToInventory(movie: Movie): void{
        this.inventory.push(movie);
    }

    //for renting movies
    rentMovie(id: Number): void{
        let movieIndex = this.inventory.findIndex(movie => movie.id === id);

        if(movieIndex != -1){
            let movieStaus: boolean = this.inventory[movieIndex]['rentStatus'] 
            if(movieStaus === false){
                this.inventory[movieIndex]['rentStatus'] = true; 
                this.inventory[movieIndex]['rentedTimeStamp'] = new Date();
            } else {
                console.log("Movie is already rented!!")
            }

        } else {
            console.log("Movie not found!!")
        }
    }

    //for checking rent
    checkRentAmount(movie: Movie): Number{
        return this.calculatedRentAmount(movie.rentedTimeStamp, movie.leaveTimeStamp);
    }

    //for releasing movie after renting
    leaveMovie(id: Number): void{
        let movieIndex = this.inventory.findIndex(movie => movie.id === id);
        if(movieIndex != -1){
            let movieStaus: boolean = this.inventory[movieIndex]['rentStatus'] 
            if(movieStaus === true){
                this.inventory[movieIndex]['rentStatus'] = false; 
                this.inventory[movieIndex]['leaveTimeStamp'] = new Date();
            } else {
                console.log("Movie is not rented!!")
            }
        } else {
            console.log("Movie not found!!")
        }
    }
}

//Calls API and initialises the movieInstance of MovieInventory
const getMovies = async () => {
    let movieData = await MovieInventory.getMovies();
    movieInstance = new MovieInventory(movieData);

    let selectedMovie = movieInstance.inventory[0]
    console.log(selectedMovie, 'rent movie 1')
    movieInstance.rentMovie(selectedMovie.id)

    selectedMovie = movieInstance.inventory[0]
    console.log(selectedMovie, 'rent movie 2')

    setTimeout(()=>{
        selectedMovie = movieInstance.inventory[0]
        let amount = movieInstance.checkRentAmount(selectedMovie)
        console.log(amount.toFixed(2), 'Rs-/ amount')
    }, 1000)
}

getMovies();

console.log()