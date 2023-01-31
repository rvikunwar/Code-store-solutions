class PaymentInfo{
    private cardNumber: Number;
    private cvv: Number;
    private expiryDate: String;

    getPaymentDetails(form: HTMLFormElement): void{
        
        let formData = new FormData(form);
        formData.forEach((value, name) => {

            if(value && name === "cardNumber" && !(value instanceof File)){
                let value_ = parseInt(value);
                this.cardNumber = value_;
            }

            if(value && name === "cvvNumber" && !(value instanceof File)){
                let value_ = parseInt(value);
                this.cvv = value_;
            } 

            if(value && name === "expiryDate" && !(value instanceof File)){
                this.expiryDate = value;
            }
        })
    }

    showPaymentDetails(){
        alert(`Successfully submitted\nCard number - ${this.cardNumber}\nCVV - ${this.cvv}\nExpiry date - ${this.expiryDate}`)
    }
}

var onSubmitHandler = () => {
    let form = document.getElementById("form");
    if(form instanceof HTMLFormElement && form != null){
        let payment = new PaymentInfo();
        payment.getPaymentDetails(form);
        payment.showPaymentDetails();
    }

    let cardNumber = document.getElementById("card")
    if(cardNumber instanceof HTMLInputElement){
        cardNumber.value = ""
    }

    let cvvNumber = document.getElementById("cvv")
    if(cvvNumber instanceof HTMLInputElement){
        cvvNumber.value = ""
    }    
    
    let expiryDate = document.getElementById("expiry")
    if(expiryDate instanceof HTMLInputElement){
        expiryDate.value = ""
    }
}