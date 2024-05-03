
interface HtmlRenderProps {
  processedOutput: string
}
function HtmlRender({processedOutput} : HtmlRenderProps) {
  return (
    <div id="htmlRender" className="toggleView text-center mt-3">
      <img src={processedOutput} alt="HTML Rendering"/>
    </div>
  );
}

export default HtmlRender;
