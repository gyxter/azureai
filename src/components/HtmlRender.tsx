import parse from 'html-react-parser'

interface HtmlRenderProps {
  processedOutput: string
}
function HtmlRender({processedOutput} : HtmlRenderProps) {
  return (
    <div id="htmlRender" className="toggleView mt-3">
      {parse(processedOutput)}
    </div>
  );
}

export default HtmlRender;
