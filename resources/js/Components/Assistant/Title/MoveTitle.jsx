import { Typography, Breadcrumbs } from "@material-tailwind/react";

export default function MoveTitle(props) {
    // Type = Mahasiswa & Asisten
    const {type, nama, nrp, practicum_id, mata_kuliah, kelas_paralel, hari, jam_start, jam_end} = props;
    
    return (
        <div>
            <Breadcrumbs fullWidth className="mb-5">
                    <a href={route('Praktikum.Manage Praktikum')} className="opacity-60">
                        Kelas Asisten
                    </a>
                    <a href={route('practicum.detail', practicum_id)} className="opacity-60">
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
            <p className="mb-2">Kelas Awal : {mata_kuliah} Kelas {kelas_paralel}</p>
            <p className="mb-4">Jadwal : {hari}, {jam_start} - {jam_end}</p>

        </div>

    );

}