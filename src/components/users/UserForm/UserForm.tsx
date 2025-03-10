import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserForm.module.scss"
import {User} from "../../../types/User"

interface FormProps {
    handleUserAddedOrUpdated: (user: User) => void;
    editingUser: User | null;
}


const UserForm: React.FC<FormProps> = ({ handleUserAddedOrUpdated, editingUser }) => {

    const [uuid, setUuid] = useState("");
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [jobTitle, setJobTitle] = useState<string>("");

    useEffect(() => {
        if (editingUser) {
            setUuid(editingUser.uuid);
            setName(editingUser.name);
            setSurname(editingUser.surname);
            setEmail(editingUser.email);
        } else {
            setUuid("");
            setName("");
            setSurname("");
            setEmail("");
        }
    }, [editingUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userData = { uuid, name, surname, email, company, jobTitle };

        try {
            if (editingUser) {
                await axios.put(`http://127.0.0.1:8001/users/${uuid}`, userData);
            } else {
                await axios.post("http://127.0.0.1:8001/users", userData);
            }

            handleUserAddedOrUpdated(userData);
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };


    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label>UUID:</label>
                    <input type="text" value={uuid} onChange={(e) => setUuid(e.target.value)} required
                           disabled={!!editingUser} />
                </div>
                <div className={styles.field}>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className={styles.field}>
                    <label>Surname:</label>
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required/>
                </div>
                <div className={styles.field}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className={styles.field}>
                    <label>Company:</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required/>
                </div>
                <div className={styles.field}>
                    <label>Job Title:</label>
                    <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required/>
                </div>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default UserForm;
