import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import supabase from '../services/supabase';

function AddNewMember() {
    const toast = useRef(null);
    const navigate = useNavigate();


    const showSuccess = (msg) => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: msg,
            life: 3000,
        });
    };
    const showError = (msg) => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: msg,
            life: 3000,
        });
    };

    const handleNewMember = async (event) => {
        event.preventDefault();

        const club_number = club_numberRef.current.value;
        const name = nameRef.current.value;
        const surname = surnameRef.current.value;
        const phone = phoneRef.current.value;
        const date_bd = date_bdRef.current.value;
        const height = heightRef.current.value;

        let { data, error } = await supabase.auth.signInWithPassword({
            club_number: club_number,
            name: name,
            surname: surname,
            phone: phone,
            date_bd: date_bd,
            height: height,
            user_type: "client",
        });

        if (data.user) {
            //localStorage.setItem('userData', JSON.stringify(data.user));
            showSuccess('You have add new member');
            navigate("/");
        }

        if (error) {
            showError(error.message);
        }
    };

    const club_numberRef = useRef(null);
    const nameRef = useRef(null);
    const surnameRef  = useRef(null);
    const phoneRef  = useRef(null);
    const date_bdRef  = useRef(null);
    const heightRef  = useRef(null);

    return (
        <div className="newmember-container">
            <Toast ref={toast} />
            <h2>Add new club member info</h2>
            <form className="login-form" onSubmit={handleNewMember}>
                <div>
                    <span className="input_label">Club number</span>
                    <span className="p-inputtext-lg">
                    <InputText
                        className="p-inputtext-lg "
                        placeholder="Club number"
                        ref={club_numberRef} />
                </span>
                </div>
                <div>
                    <span className="input_label">First name</span>
                    <span className="p-inputtext-lg">
                    <InputText
                        className="p-inputtext-lg"
                        placeholder="First name"
                        ref={nameRef} />
                </span>
                </div>
                <div>
                    <span className="input_label">Last name</span>
                    <span className="p-inputtext-lg">
                    <InputText
                        className="p-inputtext-lg"
                        placeholder="Last name"
                        ref={surnameRef} />
                </span>
                </div>
                <div>
                    <span className="input_label">Mobile phone</span>
                    <span className="p-inputtext-lg">
                    <InputText
                        className="p-inputtext-lg"
                        placeholder="Mobile phone"
                        ref={phoneRef} />
                </span>
                </div>
                <div>
                    <span className="input_label">Date of birth</span>
                    <span className="p-inputtext-lg">
                    <InputText
                        className="p-inputtext-lg"
                        placeholder="Date of birth"
                        ref={date_bdRef} />
                </span>
                </div>
                <div>
                    <span className="input_label">Height</span>
                    <span className="p-inputtext-lg">
                    <InputText
                        className="p-inputtext-lg"
                        placeholder="Height"
                        ref={heightRef} />
                </span>
                </div>
                <Button
                    className="btn-primary"
                    label="ADD NEW MEMBER"
                    type="submit" />
                <span className="text-center"><a href="/">Return to main dashboard</a></span>
            </form>
        </div>
    )
}

export default AddNewMember;