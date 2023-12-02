import { Card, Typography, Tooltip } from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import ConfirmationIconButton from "../Button/ConfirmationIconButton";

export default function TableWithEditDeleteButton(props) {
    const {TABLE_HEAD, TABLE_ROWS, practicum_id, slot_used, total_slot} = props;

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
                <tbody >
                {TABLE_ROWS.map(({ id, nama, jurusan, nrp }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        
                    return (
                    <tr key={nama} className="hover:bg-gray-100">
                        <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {nama}
                            </Typography>
                        </td>

                        <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {nrp}
                            </Typography>
                        </td>

                        {jurusan && (
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {jurusan}
                                </Typography>
                            </td>
                        )}

                        <td className={classes}>
                            <div className="flex gap-3">
                                <ConfirmationIconButton variant="text" practicum_id={practicum_id} assistant_id={id}  slot_used={slot_used} total_slot={total_slot}>
                                    <Tooltip content="Add" placement="top">
                                        <PlusCircleIcon width={20} cursor={'pointer'} stroke="green"/>
                                    </Tooltip>
                                </ConfirmationIconButton>
                            </div>
                        </td>

                    </tr>
                    );
                })}
                </tbody>
            </table>
        </Card>
      );
}