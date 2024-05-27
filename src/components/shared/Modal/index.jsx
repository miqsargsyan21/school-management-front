import { Box, Button, Modal } from "@mui/material";

const style = {
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid gray",
  position: "absolute",
  borderRadius: "8px",
  boxShadow: 24,
  left: "50%",
  width: 400,
  top: "50%",
  p: 4,
};

const Index = (props) => {
  const { open, handleClose, onSubmit, btnText, children } = props;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" onSubmit={onSubmit} noValidate sx={style}>
        {children}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {btnText}
        </Button>
      </Box>
    </Modal>
  );
};

export default Index;
