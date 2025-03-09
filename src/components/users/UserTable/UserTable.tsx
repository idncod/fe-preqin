import React from "react";
import styles from "./UserTable.module.scss";

interface User {
    uuid: string;
    name: string;
    surname: string;
    email: string;
}

interface TableProps {
    users: User[];
}

const UserTable: React.FC<TableProps> = ({ users }) => {
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;