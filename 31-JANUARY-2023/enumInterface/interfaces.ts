interface userDetails {
    name: string;
    age: number;
    cardNumber: Number;
    cvv: Number;
    expiryDate: string;
}


function printDetails(data: userDetails): void{
    console.log(`Name: ${data.name} 
        Age: ${data.age} 
        Card number: ${data.cardNumber} 
        CVV: ${data.cvv} Expiry date: ${data.expiryDate}`)
}


var users: userDetails[];

users = [{ 
    name: 'Amit', 
    age: 10, 
    cardNumber: 1987427221461, 
    cvv: 321, 
    expiryDate: '14/22'
}]

users.forEach((item) => {
    printDetails(item)
})