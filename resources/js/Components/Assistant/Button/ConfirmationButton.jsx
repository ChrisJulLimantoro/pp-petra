import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export default function ConfirmationButton(props) {
  const {children, variant="gradient", type="text"} = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen} variant={variant}>
        {children}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="ms-3">Are you sure?</DialogHeader>
        <DialogBody className="ms-3">
          You cannot revert this action
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
