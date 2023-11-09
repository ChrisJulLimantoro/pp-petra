import { Typography } from "@material-tailwind/react";

export default function LabelTableAdd (props) {
    // type diisi Mahasiswa / dosen aja
    const {type, total_available} = props;

    return (
        <div className="mb-4 mt-10">
            <Typography variant="h5" color="blue-gray">
                Available {type}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                {type} yang available : {total_available} orang
            </Typography>
        </div>
    );
}