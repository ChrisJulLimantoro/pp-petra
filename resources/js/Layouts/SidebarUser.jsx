import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  PowerIcon,
  ComputerDesktopIcon,
  BookOpenIcon,
  EyeIcon,
  Square2StackIcon
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import prodiImg from "../../../public/assets/prodi.jpeg";
 
export default function MultiLevelSidebar() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-full w-full max-w-[18rem] p-4 shadow-2xl shadow-slate-950">
      <div className="mb-3 p-4 h-20">
        <img src={prodiImg} alt="" className="w-20 h-15 mx-14" />
        {/* <Typography variant="h5" color="blue-gray">
          SAOCP
        </Typography> */}
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
                DASHBOARD
        </ListItem>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ComputerDesktopIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Praktikum
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className="mx-5">
                <ListItemPrefix>
                  <Square2StackIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Daftar Praktikum
              </ListItem>
              <ListItem className="mx-5">
                <ListItemPrefix>
                  <EyeIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Lihat Kelas Praktikum
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem>
          <ListItemPrefix>
            <BookOpenIcon className="h-5 w-5" />
          </ListItemPrefix>
          Laporan
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}