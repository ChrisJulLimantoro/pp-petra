import { ListWithAvatar } from "./ListWithAvatar";
import { SearchInput } from "./SearchInput";
import { useUserSearchContext } from "./UserSearchContext";

export function UsersSection({ selectedUser, setSelectedUser }) {
    const { filteredUsers, handleUserSearch } = useUserSearchContext();

    return (
        <>
            <div className="text-center font-semibold text-2xl mb-3">User</div>
            <div className="mb-3">
                <SearchInput className="mx-auto" onChange={handleUserSearch} />
            </div>
            <div>
                <ListWithAvatar
                    users={filteredUsers}
                    className="mx-auto h-[30.7rem] overflow-y-auto"
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            </div>
        </>
    );
}
