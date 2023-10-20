import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const RoleSearchContext = createContext();

export function useRoleSearchContext() {
    return useContext(RoleSearchContext);
}

export function RoleSearchProvider({ children, allRoles }) {
    const [roleSearchQuery, setRoleSearchQuery] = useState("");
    const filteredRoles = useMemo(() => {
        return allRoles.filter((role) => {
            return role.name
                .toLowerCase()
                .includes(roleSearchQuery.toLowerCase());
        });
    }, [roleSearchQuery]);

    const handleRoleSearch = useCallback((e) => {
        setRoleSearchQuery(e.target.value);
    }, []);

    return (
        <RoleSearchContext.Provider value={{ filteredRoles, handleRoleSearch }}>
            {children}
        </RoleSearchContext.Provider>
    );
}
