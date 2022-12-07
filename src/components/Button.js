import React, { useState } from 'react'
import { Modal,Box, Typography } from '@material-ui/core'


export default function Button(props) {
    // const [open, setOpen] = useState(false)
    // const handleClose = () => setOpen(false)
    console.log("Build called")
  return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            // aria-labelledby="modal-modal-title"
            // aria-describedby="modal-modal-description"
        >
        <Box style={{backgroundColor: "red"}}>
            <Typography id="modal-modal-title" component="h2">
                Download HTML
            </Typography>
            <Typography id="modal-modal-title" component="h2">
                Download CSS
            </Typography>
            <Typography id="modal-modal-title" component="h2">
                Download JS
            </Typography>
        </Box>
        </Modal>
  )
}
