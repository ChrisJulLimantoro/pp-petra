import { CardHeader, Typography } from "@material-tailwind/react";

export default function TableHeader ({ children, title, description = '', className = '' }) {
    return (
        <CardHeader floated={false} shadow={false} className={"rounded-none" + className}>
            <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                    <Typography variant="h5" color="blue-gray">
                    {title}
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                    {description}
                    </Typography>
                </div>
                {children}
            </div>
            
        </CardHeader>
    );
}