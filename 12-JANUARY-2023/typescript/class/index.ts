class User1{
    email: string
    name: string
    city: string = ""
    constructor(email: string, name: string){
        this.email = email;
        this.name = name;
    }
}


var rk = new User1("r@rk.com", "rk");


export {}