import { Typography,Button  } from "@material-tailwind/react";
import {  UserPlusIcon } from "@heroicons/react/24/solid";
import ConfirmationButton from "../Button/ConfirmationButton";

export default function LabelAddMhsTable (props) {
    const {total, data, practicum_id} = props;

    return(
        <div className="mb-4 flex items-center justify-between gap-8">
            <div>
                <Typography variant="h5" color="blue-gray">
                    List Mahasiswa
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Total mahasiswa yang ingin di add : {total}
                </Typography>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <ConfirmationButton classname="flex items-center gap-3" size="sm" data={data} practicum_id={practicum_id}>
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Save Changes
                </ConfirmationButton>
                {/* <Button className="flex items-center gap-3" size="sm">
                </Button> */}
            </div>
        </div>
    );
}