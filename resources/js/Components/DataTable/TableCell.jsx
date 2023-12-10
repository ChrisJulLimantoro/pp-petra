export default function TableCell ({ children, isLast, className = '', ...props}) {
return (
        <td {...props} className={isLast ? "p-3 px-4" + className : "p-3 px-4 border-b border-blue-gray-50 " + className} >
            {children}
        </td>
    );
}