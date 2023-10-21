import { Typography,Button  } from "@material-tailwind/react";
import {  UserPlusIcon } from "@heroicons/react/24/solid";

export default function LabelAddMhsTable (props) {
    const {total} = props;

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
                <Button className="flex items-center gap-3" size="sm">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Save Changes
                </Button>
            </div>
        </div>
    );
}