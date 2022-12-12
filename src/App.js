import React, { useEffect, useState } from "react";
import Editor from "./components/Editor";
import { CloudDownload } from "@material-ui/icons";
import { Modal, Box, Typography, Button, ThemeProvider, createMuiTheme } from '@material-ui/core'

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
          <button style={{position:'fixed', bottom:'10px', right:'20px'}} onClick={handleOpen}><CloudDownload /></button> {/**onClick={buttonClick} */}
          {
            <ThemeProvider theme={theme}>
              <Modal
                  open={open}
                  onClose={handleClose}
                  className="modal-title"
                  style={{inset: 'none'}}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  // hideBackdrop
              >
              <Box>
                  <Typography><Button className="button-class" onClick={() => {downloadTxtFile(1)}}>Download HTML</Button></Typography>
                  <Typography><Button className="button-class" onClick={() => {downloadTxtFile(2)}}>Download CSS</Button></Typography>
                  <Typography><Button className="button-class" onClick={() => {downloadTxtFile(3)}}>Download JS</Button></Typography>
              </Box>
              </Modal>
            </ThemeProvider>
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
