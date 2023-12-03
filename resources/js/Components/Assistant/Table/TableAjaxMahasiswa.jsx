import { Card, Typography } from "@material-tailwind/react";

export default function TableAjaxMahasiswa(props) {
    const { TABLE_ROWS } = props;
    const TABLE_HEAD = ["Nama", "NRP", "Jurusan"];

    return (
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr key={(TABLE_ROWS.nama)? TABLE_ROWS.nama : 0} className="hover:bg-gray-100">
                        <td className="p-4 border-b border-blue-gray-50">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {(TABLE_ROWS.nama)? TABLE_ROWS.nama : "-"}
                            </Typography>
                        </td>

                        <td className="p-4 border-b border-blue-gray-50">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {(TABLE_ROWS.nrp)? TABLE_ROWS.nrp : "-"}
                            </Typography>
                        </td>

                        <td className="p-4 border-b border-blue-gray-50">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {(TABLE_ROWS.jurusan)? TABLE_ROWS.jurusan : "-"}
                            </Typography>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
    );
}
