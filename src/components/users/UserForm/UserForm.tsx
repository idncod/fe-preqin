import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserForm.module.scss"
import {User} from "../../../types/User"

interface FormProps {
    handleUserAddedOrUpdated: (user: User) => void;
    editingUser: User | null;
}


const UserForm: React.FC<FormProps> = ({ handleUserAddedOrUpdated, editingUser }) => {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [jobTitle, setJobTitle] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name);
            setSurname(editingUser.surname);
            setEmail(editingUser.email);
            setCompany(editingUser.company || "");
            setJobTitle(editingUser.jobTitle || "");
        } else {
            setName("");
            setSurname("");
            setEmail("");
            setCompany("");
            setJobTitle("");
        }
    }, [editingUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userData = { name, surname, email, company, jobTitle };

        setIsLoading(true);

        try {
            if (editingUser) {
                await axios.put(`http://127.0.0.1:8002/users/${editingUser.uuid}`, userData);
            } else {
                await axios.post("http://127.0.0.1:8002/users", userData);
            }

            handleUserAddedOrUpdated({ ...userData, uuid: editingUser?.uuid || "" });
        } catch (error) {
            console.error("Error saving user:", error);
        }finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
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
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={!!editingUser}
                        title={editingUser ? "Sorry, can't edit the email. Please create a new user instead." : ""}
                        className={`${styles.emailInput} ${editingUser ? styles.disabled : ""}`}
                    />
                </div>
                <div className={styles.field}>
                    <label>Company:</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required/>
                </div>
                <div className={styles.field}>
                    <label>Job Title:</label>
                    <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required/>
                </div>
                <button type="submit">{editingUser ? "Update" : "Add"} User</button>
                {isLoading && <div className={styles.loadingSpinner}>Loading...</div>}
            </form>
        </div>
    );
};

export default UserForm;
