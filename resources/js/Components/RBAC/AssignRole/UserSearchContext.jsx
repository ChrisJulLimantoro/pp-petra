import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

const UserSearchContext = createContext();

export function useUserSearchContext() {
    return useContext(UserSearchContext);
}

export function UserSearchProvider({ users, setSelectedUser, children }) {
    const [userSearchQuery, setUserSearchQuery] = useState("");
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            return (
                user.name
                    .toLowerCase()
                    .includes(userSearchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
            );
        });
    }, [userSearchQuery]);

    const handleUserSearch = useCallback((e) => {
        setSelectedUser(null);
        setUserSearchQuery(e.target.value);
    }, []);

    return (
        <UserSearchContext.Provider value={{ filteredUsers, handleUserSearch }}>
            {children}
        </UserSearchContext.Provider>
    );
}
