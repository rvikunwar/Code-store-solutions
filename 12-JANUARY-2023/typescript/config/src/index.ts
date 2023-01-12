console.log("typescript")


class User1{
    email: string
    name: string
    readonly city: string = ""

    private _courseCount =  1;

    constructor(email: string, name: string){
        this.email = email;
        this.name = name;
    }

    private deleteToken(){
        console.log("Token deleted")
    }

    get getAppleEmail(): string{
        return `apple email - ${this.email}`
    }

    get courseCount(): number{
        return this._courseCount
    }

    set courseCount(courseNum){
        if(courseNum <= 1){
            throw new Error("Course count should be more than 1")
        }

        this._courseCount = courseNum;
    }
}


const rk = new User1("r@rk.com", "rk");
