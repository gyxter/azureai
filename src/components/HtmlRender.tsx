/* import parse from 'html-react-parser' */
/* import { ChatCompletionMessage } from 'openai/resources';
import { ReactNode } from 'react'; */
/* import handleTableExport from "./CSVDownload"; */

interface HtmlRenderProps {
  processedOutput: any;
  dataLoaded: boolean;
}
const handleTableExport = () => {
  const htmlRender = document.getElementById("htmlRender");
  if (htmlRender) {
    let result = [];
    let rows = htmlRender.querySelectorAll("table tr");
    for (let i = 0; i < rows.length; i++) {
      let row = []; //temporary array to save each row content;
      let cols = rows[i].querySelectorAll("td, th");
      for (let j = 0; j < cols.length; j++) {
        //clean innertext
        let data = (cols[j] as HTMLElement).innerText
          .replace(/(\r\n|\n|\r)/gm, "")
          .replace(/(\s\s)/gm, " ");
        //escape innertext quotes
        data = data.replace(/"/g, '""');
        row.push('"' + data + '"');
      }
      result.push(row);
    }
    downloadCSVFile(result.join("\n"), "seo-metadata-samples.csv");
  }
};
const downloadCSVFile = (csv: string, filename: string) => {
  let csv_file, link;
  const BOM = "\uFEFF"; //define so to render some unicode chars properly in the sheet
  let csvData = BOM + csv;
  csv_file = new Blob([csvData], { type: "text/csv; charset=UTF-8" });
  link = document.createElement("a");
  link.download = filename;
  link.href = window.URL.createObjectURL(csv_file);
  link.style.display = "none";
  link.click();
};
function HtmlRender({ processedOutput, dataLoaded }: HtmlRenderProps) {
  const hasLoaded = dataLoaded ? "toggle-view" : "d-none";
  const cleanResponse =
    processedOutput !== undefined
      ? processedOutput.replace(/```html|```/g, "")
      : processedOutput;

  return (
    <div id="resultCont" className={"mt-3 " + hasLoaded}>
      {dataLoaded ? (
        <button
          onClick={handleTableExport}
          className="mb-3 download-btn"
        >
          <span className="button__text">Download as CSV</span>
          <span className="button__icon">
            <svg
              className="svg"
              data-name="Layer 2"
              id="bdd05811-e15d-428c-bb53-8661459f9307"
              viewBox="0 0 35 35"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
              <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
              <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
            </svg>
          </span>
        </button>
      ) : (
        ""
      )}
      <div
        id="htmlRender"
        dangerouslySetInnerHTML={{ __html: cleanResponse }}
      ></div>
    </div>
  );
}

export default HtmlRender;
