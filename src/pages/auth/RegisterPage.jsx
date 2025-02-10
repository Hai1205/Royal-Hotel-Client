import React, { useState } from 'react';
import { registerUser } from '../../utils/api/authApi';
import { toast } from 'react-toastify';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber } = formData;
        if (!name || !email || !password || !phoneNumber) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fill all the fields.')

            return;
        }

        try {
            const response = await registerUser(formData);
            if (response.status !== 200) {
                toast.error(response);

                return;
            }

            setFormData({
                name: '',
                email: '',
                password: '',
                phoneNumber: ''
            });

            toast.success('User registered successfully')
        }
        catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>

                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label>Email:</label>

                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label>Phone Number:</label>

                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label>Password:</label>

                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>

                <button type="submit">Register</button>
            </form>
            <p className="register-link">
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
}

export default RegisterPage;
