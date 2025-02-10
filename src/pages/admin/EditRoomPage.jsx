import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteRoom, getImage, getRoomById, updateRoom } from '../../utils/api/roomApi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const EditRoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: '',
        roomType: '',
        roomPrice: '',
        roomDescription: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await getRoomById(roomId);
                setRoomDetails({
                    roomPhotoUrl: response.data.room.roomPhotoUrl,
                    roomType: response.data.room.roomType,
                    roomPrice: response.data.room.roomPrice,
                    roomDescription: response.data.room.roomDescription,
                });
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        };

        const fetchImage = async () => {
            try {
                const response = await getImage(roomId);
                const imageUrl = URL.createObjectURL(response.data);

                setRoomDetails({
                    ...roomDetails,
                    roomPhotoUrl: imageUrl,
                });
            } catch (error) {
                console.error(
                    error.message
                );

                setRoomDetails({
                    ...roomDetails,
                    roomPhotoUrl: "https://dongahome.vn/wp-content/uploads/2020/05/Icon-kh%C3%A1ch-s%E1%BA%A1n-min.png"
                });
            }
        };

        fetchImage();

        fetchRoomDetails();
    }, [roomId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
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

    const handleUpdate = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to update this room?",
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

                    const response = await updateRoom(roomId, formData);
                    if (response.status === 200) {
                        toast.success('Room updated successfully.');
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message)
                }
            }
        });
    };

    const handleDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete this room?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteRoom(roomId);

                    if (response.status === 200) {
                        toast.success('Room Deleted successfully.');
                        navigate('/admin/manage-rooms');
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message)
                }
            }
        });
    };

    return (
        <div className="edit-room-container">
            <h2>Edit Room</h2>

            <div className="edit-room-form">
                <div className="form-group">
                    {preview ? (
                        <img src={preview} alt="Room Preview" className="room-photo-preview" />
                    ) : (
                        roomDetails.roomPhotoUrl && (
                            <img src={roomDetails.roomPhotoUrl} alt="Room" className="room-photo" />
                        )
                    )}

                    <input
                        type="file"
                        name="roomPhoto"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="form-group">
                    <label>Room Type</label>

                    <input
                        type="text"
                        name="roomType"
                        value={roomDetails.roomType}
                        onChange={handleChange}
                    />
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

                <button className="update-button" onClick={handleUpdate}>Update Room</button>

                <button className="delete-button" onClick={handleDelete}>Delete Room</button>
            </div>
        </div>
    );
};

export default EditRoomPage;
