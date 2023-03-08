import {Outlet, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { classNames } from 'primereact/utils';

import supabase from '../services/supabase';

function Trainer() {
    const toast = useRef(null);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const showSuccess = (e,msg) => {
        e.preventDefault();
        toast.current.show({
            severity:'success',
            summary: 'Success',
            detail: msg,
            life: 3000,
        });
    };
    const showError = (e,msg) => {
        toast.current.show({
            severity:'error',
            summary: 'Error',
            detail: msg,
            life: 3000,
        });
    };

    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const formik = useFormik({
        initialValues: {
            value: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.value) {
                errors.value = 'Name - Surname is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            data && show(data);
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };


    const handleNewMember = () => {
        navigate('/addnew')
    }

    const handleClubInfo = () => {
        navigate('/openhours')
    }

    const handleAddTestResult = () => {
        navigate('/addtest')
    }

    const handleLogout = async () => {
        let { error } = await supabase.auth.signOut();

        if (error) {
            showError(error.message);
            return;
        }

        localStorage.removeItem('userData');
        navigate('/login')
    }

    const [isUserLogged, setUserLogged] = useState(null);

    useEffect(() => {
        setUserLogged(!!localStorage.getItem('user.data'))
    },[])

    return (
            <div className="main-container">
                <Toast ref={toast} />
                <h1>
                    Fitness Club Dashboard
                </h1>

                    <form onSubmit={formik.handleSubmit}
                          className="flex flex-column align-items-center gap-2">
                        <span className="p-float-label">
                            <Toast ref={toast} />
                            <InputText
                                id="value"
                                name="value"
                                keyfilter="int"
                                value={formik.values.value}
                                onChange={(e) => {
                                    formik.setFieldValue('value', e.target.value);
                                }}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('value') })}
                            />
                            <label htmlFor="input_value">Club Number</label>
                        </span>
                        {getFormErrorMessage('city')}
                        <Button onClick={handleAddTestResult}
                                className="btn-primary btn-edit"
                                type="submit"
                                label="EDIT CLUB MEMBER INFO" />
                    </form>

                <div className="p-input-icon-right">
                    <Button onClick={handleNewMember}
                            className="btn-primary"
                            severity="info"
                            outlined
                            label="Add new club member" />
                    <i className="pi pi-user" style={{ fontSize: '1.5rem', color: "#2699f7" }}></i>
                </div>
                <div className="p-input-icon-right">
                    <Button onClick={handleClubInfo}
                            className="btn-primary"
                            severity="info"
                            outlined
                            label="Add info for the coming holidays" />
                    <i className="pi pi-calendar-plus" style={{ fontSize: '1.5rem', color: "#2699f7" }}></i>
                </div>
                <div>
                    <Button onClick={handleLogout}
                            className="btn-primary"
                            label="LOG OUT"
                            type="submit"  />
                </div>

            </div>
            )
}

export default Trainer;