function CodeRender(props) {
  return (
    <div id="codeRender" className="toggleView">
      <pre>{props.processedOutput}</pre>
    </div>
  );
}

export default CodeRender;
