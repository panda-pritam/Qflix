import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import dayjs from "dayjs";
import "./feedBack.css";

export default function Upload() {
  let generList = ["Education", "Sports", "Comedy", "Lifestyle"];
  let ageList = ["Anyone", "7+", "12+", "16+", "18+"];
  const [open, setOpen] = useState(false);
  const [date, setDate] = React.useState(dayjs());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload Video
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            console.log("On submit");
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            console.log(date);
            console.log({
              ...formJson,
              date: `${date["$d"]}`,
            });
            handleClose();
          },
        }}
      >
        <DialogTitle className="header">UPLOAD</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="videoLink"
            name="videoLink"
            label="New Video Link"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="image"
            name="image"
            label="Thumbnail Image Link"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="title"
            name="title"
            label="Title For Video"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="genre"
            name="genre"
            select
            defaultValue="All"
            label="Select Gener"
            fullWidth
            variant="outlined"
          >
            {generList.map((option, idx) => (
              <MenuItem key={idx} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            margin="dense"
            id="age"
            name="age"
            select
            label="Select Age Group"
            fullWidth
            variant="outlined"
          >
            {ageList.map((ele, idx) => (
              <MenuItem key={idx} value={ele}>
                {ele}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            name="date"
            id="date"
            required
          >
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Selete Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
