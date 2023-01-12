interface User {
    readonly dbId: number;
    email: string;
    userId: number;
    phoneNumber?: number;
    // startTrail: () => string;
    startTrail(): string,
    getCoupon(couponName: string, value: number): number 
}


interface User {
    githubToken: string
}


interface Admin extends User {
    role: "admin" | "ta" | "learner"
}


const user: Admin = { 
    role: "admin",
    dbId: 1, 
    email: "example@gmail.com", 
    userId: 1,
    startTrail: () => "Trail started",
    getCoupon: (name: "new", off: 10) => 10, 
    githubToken: "github"   
}


user.email = "r@rk.com"