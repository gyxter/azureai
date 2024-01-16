//https://github.com/react-syntax-highlighter/react-syntax-highlighter
import SyntaxHighlighter from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeRender(props) {
  return (
    <div id="codeRender" className="toggleView">
      <SyntaxHighlighter language="htmlw" style={coldarkDark}>{props.processedOutput}</SyntaxHighlighter>
    </div>
  );
}

export default CodeRender;
