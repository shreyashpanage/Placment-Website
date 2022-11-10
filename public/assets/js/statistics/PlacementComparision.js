google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Average Package', 'Highest Package'],
        ['2017', 5, 10],
        ['2018', 5.5, 12],
        ['2019', 5, 15],
        ['2020', 5.5, 17],
        ['2021', 6, 16],
        ['2022', 7.3, 21]
    ]);

    var options = {
        title: 'Student Package Performance',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('PlacementComparision'));

    chart.draw(data, options);
}