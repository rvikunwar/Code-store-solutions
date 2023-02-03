;
var timeSeriesLabel = []; //day wise
var stockData = {
    "open": [],
    "high": [],
    "low": [],
    "close": [],
    "volume": []
};
//list of months
var monthArray = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"];
//for selecting charts
var CHARTS;
(function (CHARTS) {
    CHARTS[CHARTS["LINE"] = 0] = "LINE";
    CHARTS[CHARTS["PIE"] = 1] = "PIE";
    CHARTS[CHARTS["BAR"] = 2] = "BAR";
    CHARTS[CHARTS["BARV1"] = 3] = "BARV1";
})(CHARTS || (CHARTS = {}));
//render pie chart data
function pieChartDataset() {
    var data = {
        labels: monthArray,
        datasets: [
            {
                label: 'Stock volume',
                data: stockData['volume'].reverse(),
                backgroundColor: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b',
                    '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#aec7e8', '#ffbb78']
            }
        ]
    };
    return data;
}
//render bar chart data
function barChartDataset() {
    var data = {
        labels: monthArray,
        datasets: [
            {
                label: 'Stock volume',
                data: stockData['volume'].reverse(),
                backgroundColor: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b',
                    '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#aec7e8', '#ffbb78']
            }
        ]
    };
    return data;
}
//render line chart data
function lineChartDataset() {
    var data = {
        labels: timeSeriesLabel,
        datasets: [
            {
                label: 'Open',
                data: stockData['open'],
                borderColor: '#059D3F',
                backgroundColor: '#1f77b4'
            },
            {
                label: 'High',
                data: stockData['high'],
                borderColor: '#1243DD',
                backgroundColor: '#ff7f0e'
            },
            {
                label: 'Low',
                data: stockData['low'],
                borderColor: '#945BEC',
                backgroundColor: '#2ca02c'
            },
            {
                label: 'Close',
                data: stockData['close'],
                borderColor: '#E3EC5B',
                backgroundColor: '#17becf'
            },
        ]
    };
    return data;
}
//for rendering chart config
function chartConfiguration(data, type) {
    var config = {
        type: type,
        data: data,
        options: {
            width: '100%',
            responsive: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'IBM STOCKS - 2022',
                    position: 'bottom'
                }
            }
        }
    };
    return config;
}
var globalChart;
//for formaating date to 03/feb format
var dateFormatter = function (date) {
    date = new Date(date);
    var options = { day: 'numeric', month: 'short' };
    var dateString = date.toLocaleDateString("en-US", options);
    return dateString;
};
//for manipulating/handling data directly comming from API 
var stockDataHandler = function (data) {
    var currentYear = 2022;
    for (var timestamp in data) {
        var timestampYear = new Date(timestamp);
        timestampYear = timestampYear.getFullYear();
        if (currentYear === timestampYear) {
            var date = dateFormatter(timestamp);
            timeSeriesLabel.push(date);
            stockData['open'].push(data[timestamp]['1. open']);
            stockData['high'].push(data[timestamp]['2. high']);
            stockData['low'].push(data[timestamp]['3. low']);
            stockData['close'].push(data[timestamp]['4. close']);
            stockData['volume'].push(data[timestamp]['5. volume']);
        }
    }
};
function showFullChart(id) {
    var shadeScreen = document.getElementById('shadeScreen');
    if (shadeScreen !== null) {
        shadeScreen.style.display = "flex";
    }
    renderFullScreen(id);
}
function closeFullChart() {
    var shadeScreen = document.getElementById('shadeScreen');
    if (shadeScreen !== null) {
        shadeScreen.style.display = "none";
    }
    if (globalChart) {
        globalChart.destroy();
    }
}
function renderFullScreen(chartId) {
    window.scrollTo(0, 0);
    var fullScreenElement = document.getElementById('fullScreenChart');
    switch (chartId) {
        case CHARTS.LINE:
            var lineChartData = lineChartDataset();
            globalChart = new Chart(fullScreenElement, chartConfiguration(lineChartData, 'line'));
            break;
        case CHARTS.PIE:
            var pieChartData = pieChartDataset();
            globalChart = new Chart(fullScreenElement, chartConfiguration(pieChartData, 'pie'));
            break;
        case CHARTS.BAR:
            var barChartData = barChartDataset();
            globalChart = new Chart(fullScreenElement, chartConfiguration(barChartData, 'bar'));
            break;
        case CHARTS.BARV1:
            var barChartDatav1 = lineChartDataset();
            globalChart = new Chart(fullScreenElement, chartConfiguration(barChartDatav1, 'bar'));
            break;
    }
}
var mainChart = document.getElementById("mainChart");
var loader = document.getElementById("loader");
if (mainChart !== null) {
    mainChart.style.display = "none";
}
fetch("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo")
    .then(function (results) { return results.json(); })
    .then(function (data) {
    if (loader != null && mainChart != null) {
        loader.style.display = "none";
        mainChart.style.display = "block";
    }
    return stockDataHandler(data["Monthly Time Series"]);
})
    .then(function () {
    var lineChart = document.getElementById('lineChart');
    var pieChart = document.getElementById('pieChart');
    var barChart = document.getElementById('barChart');
    var barChartv1 = document.getElementById('barChartv1');
    var lineChartData = lineChartDataset();
    var pieChartData = pieChartDataset();
    var barChartData = barChartDataset();
    var barChartDatav1 = lineChartDataset();
    new Chart(lineChart, chartConfiguration(lineChartData, 'line'));
    new Chart(pieChart, chartConfiguration(pieChartData, 'pie'));
    new Chart(barChart, chartConfiguration(barChartData, 'bar'));
    new Chart(barChartv1, chartConfiguration(barChartDatav1, 'bar'));
});
