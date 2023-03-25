import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import supabase from '../services/supabase';

function UpdateMembership() {
    const toast = useRef(null);
    const navigate = useNavigate();
    const [date, setDate] = useState(null);
    const [selectedMembership, setSelectedMembership] = useState(null);
    const memberships = [
        { name: 'standard' },
        { name: 'fixed' },
        { name: 'unlimited' },
        { name: 'student' },
        { name: 'pensioner' }
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

    const handleChangeMembership = async (event) => {
        event.preventDefault();

        const club_number = club_numberRef.current.value;

        const { data: existingMember } = await supabase
            .from('Clients')
            .select('*')
            .eq('club_number', club_number)
            .single();

        if (!existingMember) {
            showError('This club member does not exist');
            return;
        }

        const { data, error } = await supabase
            .from('Clients')
            .update({ membership: selectedMembership.name, membership_end_date: date })
            .eq('club_number', club_number)


        if (!error) {
            showSuccess('Membership updated successfully');
            navigate(-1);
        }

        if (error) {
            showError(error.message);
        }
    };

    const club_numberRef = useRef(null);

    return (
        <div className="newmember-container">
            <Toast ref={toast} />
            <h2>Update membership</h2>
            <form className="login-form" onSubmit={handleChangeMembership}>
                <div>
                    <span className="input_label">Club number</span>
                    <span className="p-inputtext-lg">
                        <InputText
                            className="p-inputtext-lg "
                            placeholder="club number"
                            keyfilter="int"
                            maxLength={4}
                            ref={club_numberRef} />
                    </span>
                </div>
                <div>
                    <span className="input_label">Membership</span>
                    <span className="p-inputtext-lg">
                    <Dropdown value={selectedMembership} onChange={(e) => setSelectedMembership(e.value)} options={memberships} optionLabel="name"
                              placeholder="select" className="w-full md:w-14rem" />
                </span>
                </div>
                <div>
                    <span className="input_label">End Date</span>
                    <span className="p-inputtext-lg">
                        <Calendar value={date} onChange={(e) => setDate(e.value)} dateFormat="dd-mm-yy" />
                    </span>
                </div>
                <Button type="submit" label="UPDATE MEMBERSHIP" className="btn-primary" />
                <span className="text-center">
                    <a onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                        Return to main dashboard
                    </a>
                    <i className="pi pi-replay" style={{ fontSize: '1rem', color: "#2699f7" }}></i>
                </span>
            </form>
        </div>
    );
}
export default UpdateMembership;