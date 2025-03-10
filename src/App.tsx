import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./components/users/UserTable/UserTable";
import UserForm from "./components/users/UserForm/UserForm";
import "./globals.scss";
import { User } from "./types/User";

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [lastEvaluatedKey, setLastEvaluatedKey] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (nextPageKey: any = null) => {
        setLoading(true);
        try {
            const response = await axios.get<{ users: User[], last_evaluated_key: any }>("http://127.0.0.1:8003/users", {
                params: { last_evaluated_key: nextPageKey }
            });

            setUsers((prevUsers) => [...prevUsers, ...response.data.users]);
            setLastEvaluatedKey(response.data.last_evaluated_key);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUserAddedOrUpdated = (updatedUser: User) => {
        setUsers((prevUsers) => {
            const existingUserIndex = prevUsers.findIndex((u) => u.uuid === updatedUser.uuid);
            if (existingUserIndex !== -1) {
                const updatedUsers = [...prevUsers];
                updatedUsers[existingUserIndex] = updatedUser;
                return updatedUsers;
            } else {
                return [...prevUsers, updatedUser];
            }
        });
        setEditingUser(null);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
    };

    const handleLoadMore = () => {
        if (lastEvaluatedKey) {
            fetchUsers(lastEvaluatedKey);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <UserTable users={users} onEditUser={handleEditUser} />
            </div>
            <div className="card">
                <UserForm handleUserAddedOrUpdated={handleUserAddedOrUpdated} editingUser={editingUser} />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                lastEvaluatedKey && (
                    <button onClick={handleLoadMore}>Load More</button>
                )
            )}
        </div>
    );
};

export default App;
