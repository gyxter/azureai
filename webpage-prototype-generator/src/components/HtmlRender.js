function HtmlRender(props) {
  return (
    <div id="htmlRender" className="toggleView">
      <iframe
        title="html render"
        srcDoc={props.processedOutput}
        className=""
      ></iframe>
    </div>
  );
}

export default HtmlRender;
