/*
Used if you need to export a list of ucids for each section from the People tab.
Open developer tools while on the People tab.
Copy all of the below and paste it into the console tab.
The last line (if copied) will auto run everything, otherwise manually run the last line.
This will generate a csv file of ucids and sections that should auto download for you.

Note: some selectors are brittle and can break/get wrong data if Canvas rearranges things.

*/
function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}
function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
let combined = [];
let headers = {
    ucid: "UCID",
    section: "Section"
}
document.querySelectorAll(".StudentEnrollment").forEach(row => {
    let ucid = row.querySelector("td:nth-child(4)").innerText.trim();
    console.log("row", ucid);
    let section = row.querySelector("td:nth-child(5)").innerText.trim();
    combined.push({
        ucid: ucid,
        section: section
    });
});
//This runs everything
exportCSVFile(headers, combined, "students"); // call the exportCSVFile() function to process the JSON and trigger the download
