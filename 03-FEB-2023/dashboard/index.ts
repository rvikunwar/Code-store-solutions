interface StockDataType{
    open: Array<number>,
    high: Array<number>,
    low: Array<number>,
    close: Array<number>,
    volume: Array<number>
};


interface NestedAPIStockDataObject {
    [key: string]: {
        "open": Array<number>,
        "high": Array<number>,
        "low": Array<number>,
        "close": Array<number>,
        "volume": Array<number>
    }
}


let timeSeriesLabel : Array<string> = []; //day wise
let stockData: StockDataType = {
    "open": [],
    "high": [],
    "low": [],
    "close": [],
    "volume": []
};

//list of months
let monthArray: Array<string> = [  "January",  "February",  "March",  "April",  
    "May",  "June",  "July",  "August",  "September",  
    "October",  "November",  "December"]


//for selecting charts
enum CHARTS {
    LINE,
    PIE,
    BAR,
    BARV1
}

//render pie chart data
function pieChartDataset(){
    const data = {
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
function barChartDataset(){
    const data = {
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
function lineChartDataset(){
    const data = {
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
function chartConfiguration(data, type: string){

    let config = {
        type,
        data: data,
        options: {
            width: '100%',
            responsive: false,
            plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'IBM STOCKS - 2022',
                        position: 'bottom',
                    }
            }
        },
    };

    return config;
}
let globalChart;


//for formaating date to 03/feb format
const dateFormatter = (date: string| Date) =>{
    date = new Date(date);
    let options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    let dateString = date.toLocaleDateString("en-US", options);
    return dateString 
}


//for manipulating/handling data directly comming from API 
const stockDataHandler = (data: NestedAPIStockDataObject) => {
    let currentYear:Number = 2022;

    for(let timestamp in data){  
        let timestampYear:Date|Number = new Date(timestamp)
        timestampYear = timestampYear.getFullYear();
        if(currentYear === timestampYear){
            let date = dateFormatter(timestamp)
            timeSeriesLabel.push(date)
            stockData['open'].push(data[timestamp]['1. open']);
            stockData['high'].push(data[timestamp]['2. high']);
            stockData['low'].push(data[timestamp]['3. low']);
            stockData['close'].push(data[timestamp]['4. close']);
            stockData['volume'].push(data[timestamp]['5. volume']);
        }
    }
}


function showFullChart(id: number){
    let shadeScreen = document.getElementById('shadeScreen');
    if(shadeScreen !== null){
        shadeScreen.style.display = "flex"
    }
    renderFullScreen(id)
}


function closeFullChart(){
    let shadeScreen = document.getElementById('shadeScreen');
    if(shadeScreen !== null){
        shadeScreen.style.display = "none"
    }
    
    if (globalChart) {
        globalChart.destroy();
    }
}


function renderFullScreen(chartId: number){
    window.scrollTo(0, 0);
    let fullScreenElement = document.getElementById('fullScreenChart');

    switch(chartId){
        case CHARTS.LINE:
            let lineChartData = lineChartDataset(); 
            globalChart = new Chart(fullScreenElement, chartConfiguration(lineChartData ,'line')); 
            break;

        case CHARTS.PIE:
            let pieChartData = pieChartDataset(); 
            globalChart = new Chart(fullScreenElement, chartConfiguration(pieChartData ,'pie'));
            break; 
            
        case CHARTS.BAR:
            let barChartData = barChartDataset(); 
            globalChart = new Chart(fullScreenElement, chartConfiguration(barChartData ,'bar'));
            break; 

        case CHARTS.BARV1:
            let barChartDatav1 = lineChartDataset(); 
            globalChart = new Chart(fullScreenElement, chartConfiguration(barChartDatav1 ,'bar'));
            break; 
    }

}

let mainChart = document.getElementById("mainChart");
let loader = document.getElementById("loader");
if(mainChart !== null){
    mainChart.style.display = "none";
}

fetch("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo")
.then((results) => results.json())
.then((data) => {
    if(loader != null && mainChart != null){
        loader.style.display = "none";
        mainChart.style.display = "block";
    }
    return stockDataHandler(data["Monthly Time Series"]);
})
.then(()=>{
    let lineChart = document.getElementById('lineChart');
    let pieChart = document.getElementById('pieChart');
    let barChart = document.getElementById('barChart');
    let barChartv1 = document.getElementById('barChartv1');

    let lineChartData = lineChartDataset();
    let pieChartData = pieChartDataset();
    let barChartData = barChartDataset();
    let barChartDatav1 = lineChartDataset();


    new Chart(lineChart, chartConfiguration(lineChartData ,'line'));
    new Chart(pieChart, chartConfiguration(pieChartData, 'pie'));
    new Chart(barChart, chartConfiguration(barChartData, 'bar'));
    new Chart(barChartv1, chartConfiguration(barChartDatav1, 'bar'));

});