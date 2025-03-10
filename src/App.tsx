import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./components/users/UserTable/UserTable";
import UserForm from "./components/users/UserForm/UserForm";
import "./globals.scss";
import {User} from "./types/User";

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get<User[]>("http://127.0.0.1:8001/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
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

    return (
        <div className="container">
            <div className="card">
                <UserTable users={users} onEditUser={handleEditUser}/>
            </div>
            <div className="card">
                <UserForm handleUserAddedOrUpdated={handleUserAddedOrUpdated} editingUser={editingUser} />
            </div>
        </div>
    );
};

export default App;