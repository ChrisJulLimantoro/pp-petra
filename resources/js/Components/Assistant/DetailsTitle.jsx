import { Typography } from "@material-tailwind/react";

export default function DetailsTitle(props) {
    const {matkul, pararel, hari, jam_start, jam_end} = props;

    return (
        <div className='judul'>
            <Typography variant="h2" color="blue-gray">
                Detail Praktikum
            </Typography>
            <Typography variant="h4" color="gray" className="mb-2">
                Praktikum {matkul} ({pararel})
            </Typography>
            <p className='mb-4'> Jadwal : {hari}, {jam_start} - {jam_end}</p>         
        </div>
    );
}

