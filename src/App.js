import React, { useEffect, useState } from "react";
import Editor from "./components/Editor";
import { CloudDownload } from "@material-ui/icons";
import { Modal, Box, Typography, Button, ThemeProvider, createMuiTheme } from '@material-ui/core'
import { yellow } from "@material-ui/core/colors";

const App = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [open, setOpen] = useState(false)

  const theme = createMuiTheme({
    components: {
      // Name of the component
      MuiModal: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            backgroundColor: 'red',
            fontSize: '10rem',
          },
        },
      },
    },
  });
  
  const cloudButton = {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '10px',
    right: '20px',
    border: '1px solid #3d3d3d',
    height: '35px',
    width: '35px',
    borderRadius: '5px'
  }

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  // This is for creating a Blob Object
  // It will create a file for downloading 
  // whichever the user want to compile 
  const downloadTxtFile = (id) => {
    console.log("called with id => ", id)  //You can know which type file will be downloaded
    const correctFile = id == 1 ? html : id == 2 ? css : js 
    console.log("correct file ", correctFile)

    const url = window.URL.createObjectURL(new Blob([correctFile]));
    console.log("url download ", url)
    const link = document.createElement('a');
    link.href = url;

    // We can make it as a different types of files (like html, css etc., )
    link.setAttribute('download', 'file.txt');  //Till there is pdf and doc aren't working....
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
      <div>
          <Button  style={cloudButton} onClick={handleOpen}><CloudDownload /></Button> {/**onClick={buttonClick} style={{position:'fixed', bottom:'10px', right:'20px', border: '1px solid #3d3d3d', borderRadius: '50%'}}*/}
          {
              <Modal
                  open={open}
                  onClose={handleClose}
                  className="modal-title"
                  style={{backgroundColor: "white"}}
                  // aria-labelledby="modal-modal-title"
                  // aria-describedby="modal-modal-description"
                  // hideBackdrop
              >
              <Box className="button-container">
                  <div className="button" onClick={() => {downloadTxtFile(1)}}>Download HTML</div> 
                  <div className="button" onClick={() => {downloadTxtFile(2)}}>Download CSS</div>
                  <div className="button" onClick={() => {downloadTxtFile(3)}}>Download JS</div>
              </Box>
            </Modal>
          } 
        </div>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameborder="0"
          width="100%"
          height="100%"
        />
      </div>
      
    </>
  );
};

export default App;
