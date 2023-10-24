import { Typography, Breadcrumbs,Select } from "@material-tailwind/react";

export default function MoveTitle(props) {
    // Type = Mahasiswa & Asisten
    const {type, nama, nrp, id} = props;

    return (
        <div>
            <Breadcrumbs fullWidth className="mb-5">
                    <a href="#" className="opacity-60">
                        Asisten
                    </a>
                    <a href={route('practicum.index')} className="opacity-60">
                        Kelas Asisten
                    </a>
                    <a href={route('practicum.detail', id)} className="opacity-60">
                        Detail Praktikum
                    </a>
                    <a href="#">Move {type}</a>
            </Breadcrumbs>

            <Typography variant="h2" color="blue-gray">
                Move {type}
            </Typography>
            <Typography variant="h4" color="gray" className="mb-2">
                {nama} - {nrp}
            </Typography>
            <p className="mb-2">Kelas Awal : BDL Kelas C</p>
            <p className="mb-4">Jadwal : Selasa 07.30 - 09.30</p>

        </div>

    );

}