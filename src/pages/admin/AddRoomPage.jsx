import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRoom, getRoomTypes } from '../../utils/api/roomApi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const AddRoomPage = () => {
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: '',
        roomType: '',
        roomPrice: '',
        roomDescription: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [roomTypes, setRoomTypes] = useState([]);
    const [newRoomType, setNewRoomType] = useState(false);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const response = await getRoomTypes();
                setRoomTypes(response.data);
            } catch (error) {
                console.error('Error fetching room types:', error.message);
            }
        };
        fetchRoomTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRoomTypeChange = (e) => {
        if (e.target.value === 'new') {
            setNewRoomType(true);
            setRoomDetails(prevState => ({ ...prevState, roomType: '' }));
        } else {
            setNewRoomType(false);
            setRoomDetails(prevState => ({ ...prevState, roomType: e.target.value }));
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };

    const handleAddRoom = async () => {
        if (!roomDetails.roomType || !roomDetails.roomPrice || !roomDetails.roomDescription) {
            toast.error('All room details must be provided.');

            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to add this room?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const formData = new FormData();
                    formData.append('roomType', roomDetails.roomType);
                    formData.append('roomPrice', roomDetails.roomPrice);
                    formData.append('roomDescription', roomDetails.roomDescription);

                    if (file) {
                        formData.append('photo', file);
                    }

                    const response = await addRoom(formData);
                    if (response.status !== 200) {
                        toast.error('Error When adding room')

                        return;
                    }

                    toast.success('Room Added successfully')
                    navigate('/admin/manage-rooms');
                } catch (error) {
                    console.log(error);
                    toast.error(error.message)
                }
            }
        });
    };

    return (
        <div className="edit-room-container">
            <h2>Add New Room</h2>

            <div className="edit-room-form">
                <div className="form-group">
                    {preview && (
                        <img src={preview} alt="Room Preview" className="room-photo-preview" />
                    )}
                    <input
                        type="file"
                        name="roomPhoto"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="form-group">
                    <label>Room Type</label>

                    <select value={roomDetails.roomType} onChange={handleRoomTypeChange}>
                        <option value="">Select a room type</option>

                        {roomTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}

                        <option value="new">Other (please specify)</option>
                    </select>

                    {newRoomType && (
                        <input
                            type="text"
                            name="roomType"
                            placeholder="Enter new room type"
                            value={roomDetails.roomType}
                            onChange={handleChange}
                        />
                    )}
                </div>

                <div className="form-group">
                    <label>Room Price</label>

                    <input
                        type="text"
                        name="roomPrice"
                        value={roomDetails.roomPrice}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Room Description</label>

                    <textarea
                        name="roomDescription"
                        value={roomDetails.roomDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button className="update-button" onClick={handleAddRoom}>Add Room</button>
            </div>
        </div>
    );
};

export default AddRoomPage;
