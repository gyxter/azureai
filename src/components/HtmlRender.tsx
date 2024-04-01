import parse from 'html-react-parser'

interface HtmlRenderProps {
  processedOutput: string,
  dataLoaded: boolean
}
function HtmlRender({processedOutput, dataLoaded} : HtmlRenderProps) {
  const hasLoaded = dataLoaded ? 'toggle-view' : '';
  return (
    <div id="htmlRender" className={'mt-3 '+hasLoaded}>
      {parse(processedOutput)}
    </div>
  );
}

export default HtmlRender;
