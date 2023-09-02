export default function TableCell ({ children, isLast, className = '', ...props}) {
    return (
        <td {...props} className={isLast ? "p-4 " + className : "p-4 border-b border-blue-gray-50 " + className} >
            {children}
        </td>
    );
}