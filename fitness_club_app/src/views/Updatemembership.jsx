import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import supabase from '../services/supabase';

function Updatemembership() {
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

    const handleChangeMembership = async (event) => {
        event.preventDefault();

        const club_number = club_numberRef.current.value;
        const membership = membershipRef.current.value;
        const membership_end_date = membership_end_dateRef.current.value;

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
            .update({ membership: membership, membership_end_date: membership_end_date })
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
    const membershipRef = useRef(null);
    const membership_end_dateRef = useRef(null);

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
                            placeholder="Club number"
                            keyfilter="int"
                            maxLength={4}
                            ref={club_numberRef} />
                    </span>
                </div>
                <div>
                    <span className="input_label">Membership</span>
                    <span className="p-inputtext-lg">
                    <InputText
                        className="p-inputtext-lg"
                        placeholder="Membership"
                        ref={membershipRef} />
                </span>
                </div>
                <div>
                    <span className="input_label">Membership End Date</span>
                    <span className="p-inputtext-lg">
                        <InputText
                            className="p-inputtext-lg"
                            placeholder="yyyy-mm-dd"
                            ref={membership_end_dateRef} />
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
export default Updatemembership;