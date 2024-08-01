
const htmlRender = document.getElementById('htmlRender');
const handleTableExport = () => {
  if (!htmlRender) {
    return;
  }
  let result = [];
  let rows = htmlRender.querySelectorAll("table tr");
  for (let i = 0; i < rows.length; i++) {
    let row = []; //temporary array to save each row content;
    let cols = rows[i].querySelectorAll("td, th");
    for (let j = 0; j < cols.length; j++) {
      row.push('"' + (cols[j] as HTMLElement).innerText + '"');
    }
    result.push(row);
  }
  downloadCSVFile(result.join("\n"), "seo-metadata-samples.csv");
};
const downloadCSVFile = (csv:string, filename:string) => {
  let csv_file, link;
  const BOM = "\uFEFF";
  let csvData = BOM + csv; 
  csv_file = new Blob([csvData], { type: "text/csv; charset=UTF-8" });
  link = document.createElement("a");
  link.download = filename;
  link.href = window.URL.createObjectURL(csv_file);
  link.style.display = "none";
  link.click();
};


export default handleTableExport;