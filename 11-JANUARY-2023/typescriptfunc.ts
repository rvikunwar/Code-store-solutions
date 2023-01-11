function addTwo(num: number){
    return num+2;
}


function getUpper(val: string){
    return val.toUpperCase()
}


function signUpUser(name: string, email: string, isPaid: boolean){

}


let loginUser = (name:string, email: string, isPaid: boolean) => {
    if(isPaid === void 0) { isPaid = false }
}


const getHello = (s: string): string => {
    return ""
}


const heros = [ "thor", "spiderman", "ironman" ]

heros.map((hero): string => {
    return `hero is ${hero}`
})


function consoleError(errmsg: string): void{
    console.log(errmsg);
}
 

//for handling error
function handleError(errmsg: string): never{
    throw new Error(errmsg)
}


addTwo(5)
getUpper("2")
signUpUser("Amit", "amit@gmail.com", false)
loginUser("h", "h@h.com", false)

export {}