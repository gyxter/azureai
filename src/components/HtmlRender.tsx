/* import parse from 'html-react-parser' */
/* import { ChatCompletionMessage } from 'openai/resources';
import { ReactNode } from 'react'; */

interface HtmlRenderProps {
  processedOutput: any,
  dataLoaded: boolean
}
function HtmlRender({processedOutput, dataLoaded} : HtmlRenderProps) {
  const hasLoaded = dataLoaded ? 'toggle-view' : '';
  return (
    <div id="htmlRender" className={'mt-3 '+hasLoaded} dangerouslySetInnerHTML={{ __html: processedOutput }}>
      {/* {parse(processedOutput)} */}
    </div>
  );
}

export default HtmlRender;
