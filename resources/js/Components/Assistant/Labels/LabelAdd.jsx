import { Typography } from "@material-tailwind/react";

export default function LabelAdd (props) {
    // type diisi Mahasiswa / dosen aja
    const {type, slot_used, total_slot} = props;

    return (
        <div className="mb-4 mt-10">
            <Typography variant="h5" color="blue-gray">
                List {type}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Slot {type} : {slot_used}/{total_slot}
            </Typography>
        </div>
    );
}