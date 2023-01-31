function printDetails(data) {
    console.log("Name: ".concat(data.name, " \n        Age: ").concat(data.age, " \n        Card number: ").concat(data.cardNumber, " \n        CVV: ").concat(data.cvv, " Expiry date: ").concat(data.expiryDate));
}
var users;
users = [{
        name: 'Amit',
        age: 10,
        cardNumber: 1987427221461,
        cvv: 321,
        expiryDate: '14/22'
    }];
users.forEach(function (item) {
    printDetails(item);
});
