import React, { useState } from "react";
import UserTable from "./components/users/UserTable/UserTable";
import UserForm from "./components/users/UserForm/UserForm";

interface User {
    uuid: string;
    name: string;
    surname: string;
    email: string;
}

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([
        { uuid: "123e4567-e89b-12d3-a456-426614174000", name: "John", surname: "Doe", email: "john.doe@example.com" },
        { uuid: "123e4567-e89b-12d3-a456-426614174001", name: "Jane", surname: "Doe", email: "jane.doe@example.com" },
    ]);

    return (
        <div className="container">
            <div className="card">
                <UserTable users={users} />
            </div>
            <div className="card">
                <UserForm />
            </div>
        </div>
    );
};

export default App;
