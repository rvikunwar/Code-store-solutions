var PaymentInfo = /** @class */ (function () {
    function PaymentInfo() {
    }
    PaymentInfo.prototype.getPaymentDetails = function (form) {
        var _this = this;
        var formData = new FormData(form);
        formData.forEach(function (value, name) {
            if (value && name === "cardNumber" && !(value instanceof File)) {
                var value_ = parseInt(value);
                _this.cardNumber = value_;
            }
            if (value && name === "cvvNumber" && !(value instanceof File)) {
                var value_ = parseInt(value);
                _this.cvv = value_;
            }
            if (value && name === "expiryDate" && !(value instanceof File)) {
                _this.expiryDate = value;
            }
        });
    };
    PaymentInfo.prototype.showPaymentDetails = function () {
        alert("Successfully submitted\nCard number - ".concat(this.cardNumber, "\nCVV - ").concat(this.cvv, "\nExpiry date - ").concat(this.expiryDate));
    };
    return PaymentInfo;
}());
var onSubmitHandler = function () {
    var form = document.getElementById("form");
    if (form instanceof HTMLFormElement && form != null) {
        var payment = new PaymentInfo();
        payment.getPaymentDetails(form);
        payment.showPaymentDetails();
    }
    var cardNumber = document.getElementById("card");
    if (cardNumber instanceof HTMLInputElement) {
        cardNumber.value = "";
    }
    var cvvNumber = document.getElementById("cvv");
    if (cvvNumber instanceof HTMLInputElement) {
        cvvNumber.value = "";
    }
    var expiryDate = document.getElementById("expiry");
    if (expiryDate instanceof HTMLInputElement) {
        expiryDate.value = "";
    }
};
