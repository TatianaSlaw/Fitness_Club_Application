import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import {InputMask} from 'primereact/inputmask';

import supabase from '../services/supabase';

function AddNewMember() {
    const toast = useRef(null);
    const navigate = useNavigate();
    const [phone, setPhone] = useState(null);
    const [dateBD, setDateBD] = useState(null);
    const [date, setDate] = useState(null);
    const [selectedMembership, setSelectedMembership] = useState(null);
    const memberships = [
        {name: 'standard'},
        {name: 'fixed'},
        {name: 'unlimited'},
        {name: 'student'},
        {name: 'pensioner'}
    ];

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
        const height = heightRef.current.value;

        const {data: existingMember} = await supabase
            .from('Clients')
            .select('*')
            .eq('club_number', club_number)
            .single();

        if (existingMember) {
            showError('This club member already exists');
            return;
        }

        const {data, error} = await supabase
            .from('Clients')
            .insert([
                {
                    club_number: club_number,
                    name: name,
                    surname: surname,
                    email: null,
                    phone: phone,
                    password: null,
                    date_bd: dateBD,
                    height: height,
                    user_type: "client",
                    membership: selectedMembership.name,
                    membership_end_date: date
                }
            ]);

        if (!error) {
            showSuccess('You have added a new member');
            navigate(-1);
        }

        if (error) {
            showError(error.message);
        }
    };

    const club_numberRef = useRef(null);
    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const heightRef = useRef(null);


    return (
        <div className="newmember-container">
            <Toast ref={toast}/>
            <h2>New club member info</h2>
            <form className="login-form" onSubmit={handleNewMember}>
                <div>
                    <span className="input_label">Club number</span>
                    <span className="p-inputtext-lg">
                        <InputText
                            className="p-inputtext-lg "
                            placeholder="Club number"
                            keyfilter="int"
                            maxLength={4}
                            ref={club_numberRef}/>
                    </span>
                </div>
                <div>
                    <span className="input_label">First name</span>
                    <span className="p-inputtext-lg">
                        <InputText
                            className="p-inputtext-lg"
                            keyfilter="alpha"
                            placeholder="First name"
                            ref={nameRef}/>
                    </span>
                </div>
                <div>
                    <span className="input_label">Last name</span>
                    <span className="p-inputtext-lg">
                        <InputText
                            className="p-inputtext-lg"
                            keyfilter="alpha"
                            placeholder="Last name"
                            ref={surnameRef}/>
                    </span>
                </div>
                <div>
                    <span className="input_label">Mobile phone</span>
                    <span className="p-inputtext-lg">
                         <InputMask value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    mask="999 999 999"
                                    placeholder="999 999 999"/>
                    </span>
                </div>
                <div>
                    <span className="input_label">Date of birth</span>
                    <span className="p-inputtext-lg">
                        <Calendar value={dateBD} onChange={(e) => setDateBD(e.value)}
                                  view="date"
                                  dateFormat="dd-mm-yy"
                                  placeholder="dd-mm-yyyy"
                                  yearRange="1900:2020"/>


                    </span>
                </div>
                <div>
                    <span className="input_label">Height (cm)</span>
                    <span className="p-inputtext-lg">
                    <InputText
                        className="p-inputtext-lg"
                        keyfilter="int"
                        maxLength={3}
                        placeholder="Height (cm)"
                        ref={heightRef}/>
                </span>
                </div>
                <div>
                    <span className="input_label">Membership</span>
                    <span className="p-inputtext-lg">
                    <Dropdown value={selectedMembership} onChange={(e) => setSelectedMembership(e.value)}
                              options={memberships} optionLabel="name"
                              placeholder="select" className="w-full"/>
                </span>
                </div>
                <div>
                    <span className="input_label">End Date</span>
                    <span className="p-inputtext-lg">
                        <Calendar value={date} onChange={(e) => setDate(e.value)}
                                  dateFormat="dd-mm-yy" placeholder="dd-mm-yyyy"/>
                    </span>
                </div>
                <Button type="submit" label="ADD NEW MEMBER" className="btn-primary"/>
                <span className="text-center">
                    <a onClick={() => navigate(-1)} style={{cursor: 'pointer'}}>
                        Return to main dashboard
                    </a>
                    <i className="pi pi-replay" style={{fontSize: '1rem', color: "#2699f7"}}></i>
                </span>
            </form>
        </div>
    );
}

export default AddNewMember;