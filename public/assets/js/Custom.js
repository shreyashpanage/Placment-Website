new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
        labels: ["2018", "2019", "2020", "2021", "2022"],
        datasets: [
            {
                label: "Highest Package (lakh)",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: [20, 18, 22, 17, 26]
            }
        ]
    },
    options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Highest package from 2018 to 2022'
        }
    }
});