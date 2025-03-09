import React, { useState } from "react";



const UserForm: React.FC = () => {
    const [uuid, setUuid] = useState("");
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [jobTitle, setJobTitle] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>UUID:</label>
                    <input type="text" value={uuid} onChange={(e) => setUuid(e.target.value)} required
                           disabled />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div>
                    <label>Surname:</label>
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Company:</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required/>
                </div>
                <div>
                    <label>Job Title:</label>
                    <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required/>
                </div>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default UserForm;
