import React from "react";

interface CodeRenderProps {
  processedOutput: string
}
function CodeRender({processedOutput} : CodeRenderProps) {
  return (
    <div id="codeRender" className="toggleView">
      <pre><code>{processedOutput}</code></pre>
    </div>
  );
}

export default CodeRender;
