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

        // Sprawdź, czy klub o podanym numerze już istnieje
        const { data: existingMember } = await supabase
            .from('Clients')
            .select('*')
            .eq('club_number', club_number)
            .single();

        // Jeśli klub już istnieje, wyświetl błąd
        if (existingMember) {
            showError('This club member already exists');
            return;
        }


        const { data, error } = await supabase
            .from('Clients')
            .insert([
                { club_number: club_number, name: name, surname: surname, email: null, phone: phone, password: null, date_bd: date_bd, height: height, user_type: "client" }
            ]);

        if (data) {
            showSuccess('You have added a new member');
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
                    <span className="input_label">Height (cm)</span>
                    <span className="p-inputtext-lg">
                    <InputText
                        className="p-inputtext-lg"
                        placeholder="Height (cm)"
                        ref={heightRef} />
                </span>
                </div>
                <Button type="submit" label="Add member" className="btn-primary" />
                <span className="text-center"><a href="/trainer">Return to main dashboard</a></span>
            </form>
        </div>
    );
}

export default AddNewMember;
