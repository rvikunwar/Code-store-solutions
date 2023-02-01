class Subscription {
    name: string;
    monthlyFee: number;
  
    constructor(name: string, monthlyFee: number) {
      this.name = name;
      this.monthlyFee = monthlyFee;
    }
  
    displaySubscriptionDetails(): void {
        console.log(`Subscription: ${this.name}`);
        console.log(`Monthly Fee: $${this.monthlyFee}`);
    }
}


class NetflixSubscription extends Subscription {
    numOfScreens: number;
  
    constructor(name: string, monthlyFee: number, numOfScreens: number) {
        super(name, monthlyFee);
        this.numOfScreens = numOfScreens;
    }
  
    displayDetails(): void {
        super.displaySubscriptionDetails();
        console.log(`Number of Screens: ${this.numOfScreens}`);
    }
}
  
const basic = new NetflixSubscription('Basic', 299, 1);
basic.displaySubscriptionDetails()
