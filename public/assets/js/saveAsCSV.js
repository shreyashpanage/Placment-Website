function saveAsCSV(id, file) {
  var filename = file + "-students-data.csv";
  var csv_data = [];

  var rows = document.getElementById(id).getElementsByTagName("tr");

  for (var i = 0; i < rows.length; i++) {
    var cols = rows[i].querySelectorAll("td,th");

    var csvrow = [];
    for (var j = 0; j < cols.length; j++) {
      var element;
      element = cols[j].innerText.trim().replace(/<a[^>]*>|<\/a>/g, "");
      element = element.replace(/<img[^>]*>/gi, "");
      element = element.replace(/<input[^>]*>|<\/input>/gi, "");
      element = element.replace(/<button[^>]*>|<\/button>/gi, "");
      element = element.replace(/<i[^>]*>|<\/i>/gi, "");
      element = element.replace(/<\/?span[^>]*>/g, "");

      // Wrap each element in double quotes
      element = '"' + element + '"';
      csvrow.push(element);
    }

    csv_data.push(csvrow.join(","));
  }

  csv_data = csv_data.join("\n");

  CSVFile = new Blob([csv_data], { type: "text/csv" });

  var temp_link = document.createElement("a");

  temp_link.download = filename;
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  temp_link.click();
  document.body.removeChild(temp_link);
}
