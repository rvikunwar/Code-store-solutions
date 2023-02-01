var arrayData = ["1", "a", "2", "b", "3", "c", "4", "d", "5", "e"];
var arrayData1 = arrayData.map(function (item) {
    var item_ = parseInt(item);
    if (isNaN(item_)) {
        return item.toUpperCase();
    }
    else {
        return item_;
    }
});
console.log(arrayData1);
