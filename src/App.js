import React, { useEffect, useState } from "react";
import Editor from "./components/Editor";

const App = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

    const downloadTxtFile = (id) => {
      console.log("called with id => ", id)
      const correctFile = id == 1 ? html : id == 2 ? css : js
      console.log("correct file ", correctFile)

      const url = window.URL.createObjectURL(new Blob([correctFile]));
      console.log("url download ", url)
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.txt');
      document.body.appendChild(link);
      link.click();
    }
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
        </html>`);
          }, 250);
      // console.log("html elements ", html)
      return () => {
        clearTimeout(timeout);
      };
     
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane" >
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameborder="0"
          width="100%"
          height="100%"
        />
      </div>
      <div className="button-below">
         <button key={1} onClick={() => {downloadTxtFile(1)}}>Download HTML</button>  
         <button key={2} onClick={() => {downloadTxtFile(2)}}>Download CSS</button>  
         <button key={3} onClick={() => {downloadTxtFile(3)}}>Download JS</button>  
      </div>
    </>
  );
};

export default App;
