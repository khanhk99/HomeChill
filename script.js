const countShop = 6;
const rowStart = 14;
const rowEnd = 230;
const MONTH = 4;
const endMonth = 30;
const nameShopArr = [
    {
        name: 'Yume shopee',
        data: []
    },
    {
        name: 'Lyo shopee',
        data: []
    },
    {
        name: 'An an shopee',
        data: []
    },
    {
        name: 'An an lazada',
        data: []
    },
    {
        name: 'Yume lazada',
        data: []
    },
    {
        name: 'Lyo lazada',
        data: []
    },
];

const typeIndex = {
    view: {
        column: 'C',
        type: "view",
        title: "Số lượt xem",
        titleY: "Lượt xem"
    },
    traffic: {
        column: 'D',
        type: "traffic",
        title: "Lượt truy cập",
        titleY: "Lượt truy cập"
    },
    cart: {
        column: 'H',
        type: "cart",
        title: "Lượt thêm giỏ",
        titleY: "Lượt thêm"
    },
    cost: {
        column: 'J',
        type: "cost",
        title: "Chi phí",
        titleY: "Chi phí"
    },
    order: {
        column: 'N',
        type: "order",
        title: "Số đơn",
        titleY: "Số đơn"
    },
    sales: {
        column: 'S',
        type: "sales",
        title: "Doanh thu",
        titleY: "Doanh thu"
    },
}

const paramsView = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1DDsu1UGX5bN9PHKLYZBRCmjrsttInkGeWDCG8iW3MCM',

    // The A1 notation of the values to retrieve.
    range: "SÀN TMĐT!" + typeIndex.view.column + rowStart + ':' + typeIndex.view.column + rowEnd,

    "majorDimension": "COLUMNS"
};
const paramsTraffic = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1DDsu1UGX5bN9PHKLYZBRCmjrsttInkGeWDCG8iW3MCM',

    // The A1 notation of the values to retrieve.
    range: "SÀN TMĐT!" + typeIndex.traffic.column + rowStart + ':' + typeIndex.traffic.column + rowEnd,

    "majorDimension": "COLUMNS"
};
const paramsCart = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1DDsu1UGX5bN9PHKLYZBRCmjrsttInkGeWDCG8iW3MCM',

    // The A1 notation of the values to retrieve.
    range: "SÀN TMĐT!" + typeIndex.cart.column + rowStart + ':' + typeIndex.cart.column + rowEnd,

    "majorDimension": "COLUMNS"
};
const paramsCost = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1DDsu1UGX5bN9PHKLYZBRCmjrsttInkGeWDCG8iW3MCM',

    // The A1 notation of the values to retrieve.
    range: "SÀN TMĐT!" + typeIndex.cost.column + rowStart + ':' + typeIndex.cost.column + rowEnd,

    "majorDimension": "COLUMNS"
};
const paramsOrder = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1DDsu1UGX5bN9PHKLYZBRCmjrsttInkGeWDCG8iW3MCM',

    // The A1 notation of the values to retrieve.
    range: "SÀN TMĐT!" + typeIndex.order.column + rowStart + ':' + typeIndex.order.column + rowEnd,

    "majorDimension": "COLUMNS"
};
const paramsSales = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1DDsu1UGX5bN9PHKLYZBRCmjrsttInkGeWDCG8iW3MCM',

    // The A1 notation of the values to retrieve.
    range: "SÀN TMĐT!" + typeIndex.sales.column + rowStart + ':' + typeIndex.sales.column + rowEnd,

    "majorDimension": "COLUMNS"
};

// Get data via API
function initClient() {
    var API_KEY = 'AIzaSyA1orruIS_9Wh6fmYkVKcYM4eCjAQI5XcE';

    var CLIENT_ID = '116028291081-1cst4ra0eoqn0joevsvm17ik0obc9g0g.apps.googleusercontent.com';

    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        //   updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        executeView();
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function executeView() {
    execute(paramsView, typeIndex.view.type, typeIndex.view.title, typeIndex.view.titleY)
}
function executeTraffic() {
    execute(paramsTraffic, typeIndex.traffic.type, typeIndex.traffic.title, typeIndex.traffic.titleY)
}
function executeCart() {
    execute(paramsCart, typeIndex.cart.type, typeIndex.cart.title, typeIndex.cart.titleY)
}
function executeCost() {
    execute(paramsCost, typeIndex.cost.type, typeIndex.cost.title, typeIndex.cost.titleY)
}
function executeOrder() {
    execute(paramsOrder, typeIndex.order.type, typeIndex.order.title, typeIndex.order.titleY)
}
function executeSales() {
    execute(paramsSales, typeIndex.sales.type, typeIndex.sales.title, typeIndex.sales.titleY)
}


function execute(params, type, title, titleY) {
    var request = gapi.client.sheets.spreadsheets.values.get(params);
    request.then(function (response) {
        jQuery([document.documentElement, document.body]).animate({
            scrollTop: $("#" + type).offset().top
        }, 1000);
        let values = response.result.values[0];
        let dataAPI = nameShopArr;

        var i = 1;
        var day = 1;
        let timestampNow = Date.now();
        let timestamp = new Date(timestampNow);
        let dateNow = timestamp.getDate();
        while (i < values.length) {
            if (day > dateNow) {
                break;
            } else {
                for (let j = 0; j < countShop; j++) {
                    let itemValue = {
                        x: Date.UTC(2022, MONTH - 1, day),
                        y: parseInt(values[i + j - 1])
                    }
                    // console.log(dataAPI[0]);
                    dataAPI[j].data.push(itemValue);
                }
                day++;
                i += countShop + 1;
            }
        }

        drawChart(type, title, titleY, dataAPI);
    }, function (reason) {
        console.error('error: ' + reason.result.error.message);
    });
}
//   API

// Draw chart
function drawChart(id, title, titleY, datas) {
    console.log(datas)
    Highcharts.chart(id, {
        title: {
            text: title
        },

        subtitle: {
            text: ''
        },

        yAxis: {
            title: {
                text: titleY
            }
        },

        xAxis: {
            type: "date",
            title: {
                text: 'Ngày'
            },
            labels: {
                format: '{value: %d-%m}'
            }
        },

        tooltip: {
            headerFormat: '{point.x:%e %b %H:%M}',
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        responsive: {
            rules: [{
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },

        series: datas
        // series: [
        //     {
        //         name: 'Product 2',
        //         data: [
        //             { x: Date.UTC(2022, 00, 01), y: 93.2 },
        //             { x: Date.UTC(2022, 01, 04), y: 86.1 },
        //         ]
        //     }
        // ]
    });
}