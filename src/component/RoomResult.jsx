import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthChecker from '../utils/service/AuthChecker';
import { getImage } from '../utils/api/roomApi';

const RoomResult = ({ roomSearchResults }) => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    const isAdmin = AuthChecker.isAdmin();

    useEffect(() => {
        if (roomSearchResults && roomSearchResults.length > 0) {
            const fetchImage = async () => {
                const result = await Promise.all(
                    roomSearchResults.map(async (room) => {
                        try {
                            const response = await getImage(room.id);
                            const imageUrl = URL.createObjectURL(response.data);

                            return { ...room, imageUrl };
                        } catch (error) {
                            console.error(
                                "Error fetching image for room ID:",
                                room.id,
                                error
                            );

                            return { ...room, imageUrl: "https://dongahome.vn/wp-content/uploads/2020/05/Icon-kh%C3%A1ch-s%E1%BA%A1n-min.png" };
                        }
                    })
                );

                setRooms(result);
            };

            fetchImage();
        }
    }, [roomSearchResults]);

    return (
        <section className="room-results">
            {rooms && rooms.length > 0 && (
                <div className="room-list">
                    {rooms.map((room, index) => (
                        <div key={room.id} className="room-list-item">
                            <img
                                className='room-list-item-image'
                                src={room.imageUrl}
                                alt={room.roomType}
                            />

                            <div className="room-details">
                                <h3>{room.roomType}</h3>
                                <p>Price: ${room.roomPrice} / night</p>
                                <p>Description: {room.roomDescription}</p>
                            </div>

                            <div className='book-now-div'>
                                {isAdmin ? (
                                    <button
                                        className="edit-room-button"
                                        onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                                    >
                                        Edit Room
                                    </button>
                                ) : (
                                    <button
                                        className="book-now-button"
                                        onClick={() => navigate(`/room-details-book/${room.id}`)} // Navigate to book room with room ID
                                    >
                                        View/Book Now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default RoomResult;
