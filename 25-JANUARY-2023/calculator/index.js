class InterestCalculator {
    constructor(principal, rate, time) {
        this.principal = principal;
        this.rate = rate;
        this.time = time;
    }
  
    static validate(principal, rate, time) {
        if (principal <= 0) {
            throw new Error("Principal amount should be greater than 0.");
        }
        if (rate <= 0) {
            throw new Error("Interest rate should be greater than 0.");
        }
        if (time <= 0) {
            throw new Error("Time should be greater than 0.");
        }
    }
  
    calculateSI() {
        InterestCalculator.validate(this.principal, this.rate, this.time);
        return (this.principal * this.rate * this.time) / 100;
    }
  
    calculateCI() {
        InterestCalculator.validate(this.principal, this.rate, this.time);
        return this.principal * (Math.pow(1 + this.rate / 100, this.time));
    }
}
  
try {
    const calculator = new InterestCalculator(10000, 7, 3);
    console.log(calculator.calculateSI())
    console.log(calculator.calculateCI())
} catch (e) {
    console.error(e);
}
  