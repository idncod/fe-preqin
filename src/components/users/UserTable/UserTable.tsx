import React from "react";
import styles from "./UserTable.module.scss";
import {User} from "../../../types/User"

interface TableProps {
    users: User[];
    onEditUser: (user: User) => void;
}

const UserTable: React.FC<TableProps> = ({ users, onEditUser }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>UUID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.uuid}>
                        <td data-label="UUID">{user.uuid}</td>
                        <td data-label="Name">{user.name}</td>
                        <td data-label="Surname">{user.surname}</td>
                        <td data-label="Email">{user.email}</td>
                        <td data-label="Actions">
                            <button onClick={() => onEditUser(user)}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;