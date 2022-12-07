import React, { useEffect, useState } from "react";
import Editor from "./components/Editor";
import { CloudDownload } from "@material-ui/icons";
// import Button from "./components/Button";
import { Modal,Box, Typography,Button } from '@material-ui/core'

const App = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  // const [popUp, setPopUp] = useState(false);
  const [open, setOpen] = useState(false)

  const style = {
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    width: '20vw',
    height: '15vh',
    justifyContent:'center',
    position: 'fixed',
    inset: '0px 10px 0px 10px'
  }

  // const buttonClick = () => {
  //   setPopUp(t => !t)
  //   console.log("oen ", open)
  //   setOpen(true)
  //   console.log("oen ", open)
  // }

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
            // popUp ? 
            <Modal
                open={open}
                onClose={handleClose}
                className="modal-title"
                style={{inset: 'none'}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography><Button onClick={() => {downloadTxtFile(1)}}>Download HTML</Button></Typography>
                <Typography><Button onClick={() => {downloadTxtFile(2)}}>Download CSS</Button></Typography>
                <Typography><Button onClick={() => {downloadTxtFile(3)}}>Download JS</Button></Typography>
            </Box>
            </Modal> //: null
              // <Button open={open} onClose={handleClose}/> : null
            // <div  className="hidden-div" id="show-butt"> {/**style={{display: 'flex', flexDirection: 'column'}} */}
            //   <div className="pop-up">
            //   <button key={1} onClick={() => {downloadTxtFile(1)}}>Download HTML</button>  
            //   <button key={2} onClick={() => {downloadTxtFile(2)}}>Download CSS</button>  
            //   <button key={3} onClick={() => {downloadTxtFile(3)}}>Download JS</button> 
            // </div>
            // </div> : null
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
        
        
        {/* <div className="button-below"> */}
         
      {/* </div> */}
      </div>
      
    </>
  );
};

export default App;
