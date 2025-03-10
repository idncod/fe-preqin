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
                        <td>{user.uuid}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td>
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