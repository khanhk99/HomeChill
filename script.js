// Get data via API
function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({
            scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.readonly"
        })
        .then(function () { console.log("Sign-in successful"); },
            function (err) { console.error("Error signing in", err); });
}
function loadClient() {
    gapi.client.setApiKey("AIzaSyA1orruIS_9Wh6fmYkVKcYM4eCjAQI5XcE");
    return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
        .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    return gapi.client.sheets.spreadsheets.get({})
        .then(function (response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
        },
            function (err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function () {
    gapi.auth2.init({ client_id: "YOUR_CLIENT_ID" });
});

// Get data via API

Highcharts.chart('view', {

    title: {
        text: 'Lượt xem'
    },

    subtitle: {
        text: ''
    },

    yAxis: {
        title: {
            text: 'Số lượt xem'
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2010 to 2017'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'Installation',
        data: [1, 2, 3, 4, 5, 6, 7, 8]
    }, {
        name: 'Manufacturing',
        data: [5, 24, 27, 29, 32, 30, 38, 40]
    }, {
        name: 'Sales & Distribution',
        data: [11, 17, 16, 19, 20, 24, 32, 39]
    }, {
        name: 'Project Development',
        data: [0, 0, 79, 12, 15, 22, 34, 34]
    }, {
        name: 'Other',
        data: [12, 59, 81, 11, 89, 11, 18, 18]
    }],

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
    }
});