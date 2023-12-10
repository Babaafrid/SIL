// script.js
function retrieveData() {
    var id = document.getElementById("idInput").value;

    // Assuming the CSV file is named "data.csv" and is in the same directory as this HTML file
    var csvFilePath = "data.csv";

    // Make an XMLHttpRequest to retrieve the CSV file
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var csvData = xhr.responseText;
            var records = parseCSV(csvData);
            displayTable(records, id);
        }
    };
    xhr.open("GET", csvFilePath, true);
    xhr.send();
}

function parseCSV(csvData) {
    var lines = csvData.split("\n");
    var records = [];

    for (var i = 0; i < lines.length; i++) {
        var fields = lines[i].split(",");
        var record = {
            id: fields[0],
            Event: fields[1],
            Date: fields[2],
        };
        records.push(record);
    }

    return records;
}

function displayTable(records, id) {
    var tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = "";

    var table = document.createElement("table");
    var headerRow = table.insertRow(0);

    // Create table headers
    for (var key in records[0]) {
        var headerCell = headerRow.insertCell(-1);
        headerCell.innerHTML = key;
    }

    // Filter records based on the entered ID
    var filteredRecords = records.filter(function (record) {
        return record.id === id;
    });

    // Create table rows with filtered records
    for (var i = 0; i < filteredRecords.length; i++) {
        var row = table.insertRow(-1);
        for (var key in filteredRecords[i]) {
            var cell = row.insertCell(-1);
            cell.innerHTML = filteredRecords[i][key];
        }
    }

    tableContainer.appendChild(table);
}
