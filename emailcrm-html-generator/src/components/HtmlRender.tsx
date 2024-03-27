
interface HtmlRenderProps {
  processedOutput: string
}
function HtmlRender({processedOutput} : HtmlRenderProps) {
  return (
    <div id="htmlRender" className="toggleView">
      <iframe
        title="static html"
        datatype="text/html"
        srcDoc={processedOutput}
      ></iframe>
    </div>
  );
}

export default HtmlRender;
