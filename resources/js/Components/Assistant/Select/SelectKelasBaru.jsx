import { Select, Option, Typography } from "@material-tailwind/react";

export default function SelectKelasBaru(props) {
    const { title, datas, current_practicum_id } = props;

    return (
        <div className="w-72">
            <Typography variant="h5" color="blue-gray" className="mt-10 mb-3">
                Masukkan Kelas Baru
            </Typography>
            <Select label={title} color="blue">
                {datas.map((data) => (
                    <Option value={`${data.id}`} key={data.id} disabled={data.id == current_practicum_id}>
                        {data.code} ({data.jadwal})
                    </Option>
                ))}
            </Select>
        </div>
    );
}
