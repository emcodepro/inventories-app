import React, {useState} from 'react';
import {ToastContainer, toast} from "react-toastify";
import {redirect} from 'react-router-dom';
import httpClient from "../services/httpClient";

interface FormData {
    name: string;
    location: string;
    price: number;
}

const dummyLocations = ['Location 1', 'Location 2', 'Location 3',];

const NewInventoryForm = () => {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        location: '',
        price: 0,
    });

    const [formErrors, setFormErrors] = useState<Record<keyof FormData, string>>({
        name: '',
        location: '',
        price: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value}));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setFormData(prevFormData => ({...prevFormData, price: isNaN(value) ? 0 : value}));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: Record<keyof FormData, string> = {
            name: '',
            location: '',
            price: '',
        };

        if (!formData.name) {
            errors.name = 'ნივთის სახელი სავალდებულოა';
        }
        if (!formData.location) {
            errors.location = 'ნივთის ადგილმდებარეობა სავალდებულოა';
        }
        if (!formData.price) {
            errors.price = 'ფასი სავალდებულოა';
        }

        setFormErrors(errors);

        if (!Object.values(errors).some(Boolean)) {
            await httpClient.post('/inventories', formData)
                .then(() => {
                    toast.success('ჩანაწერი წარმატებით შეინახა', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    setFormData({
                        name: '',
                        location: '',
                        price: 0,
                    });
                }).catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="container-fluid mt-4">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">ნივთის სახელი</label>
                    <input
                        type="text"
                        className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">ნივთის ადგილმდებარეობა</label>
                    <select
                        className={`form-select ${formErrors.location ? 'is-invalid' : ''}`}
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                    >
                        <option value="">აირჩიეთ...</option>
                        {dummyLocations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                    {formErrors.location && <div className="invalid-feedback">{formErrors.location}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">ფასი</label>
                    <div className="input-group">
                        <input
                            type="number"
                            className={`form-control ${formErrors.price ? 'is-invalid' : ''}`}
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handlePriceChange}
                        />
                    </div>
                    {formErrors.price && <div className="invalid-feedback">{formErrors.price}</div>}
                </div>
                <button type="submit" className="btn btn-primary">შენახვა</button>
            </form>
        </div>
    );
};

export default NewInventoryForm;
