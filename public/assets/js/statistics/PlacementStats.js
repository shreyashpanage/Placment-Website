google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Task', 'Number of Placement'],
        ['COMPUTER TECHNOLOGY', 30],
        ['INFORMATION TECHNOLOGY', 15],
        ['COMPUTER SCIENCE AND ENGNEERING', 20],
        ['ELECTRONICS AND TELECOMMUNICATION', 10],
        ['MECHANICAL', 10],
        ['CIVIL', 5],
        ['ELECTRICAL', 10],
      ]);

      var options = {
        title: 'BRANCH-WISE PLACEMENT STATS',
        pieHole: 0.5,
        pieSliceTextStyle: {
          color: 'black',
        },
        legend: 'none'
      };

    var chart = new google.visualization.PieChart(document.getElementById('PlacementStats'));

    chart.draw(data, options);
}