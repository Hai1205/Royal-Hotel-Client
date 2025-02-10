import React, { useState, useEffect } from 'react';
import Pagination from '../../component/Pagination';
import RoomResult from '../../component/RoomResult';
import RoomSearch from '../../component/RoomSearch';
import { getAllRooms, getRoomTypes } from '../../utils/api/roomApi';

const AllRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);

  const handleSearchResult = (results) => {
    setRooms(results);
    setFilteredRooms(results);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getAllRooms();
        setRooms(response.data.roomList);
        setFilteredRooms(response.data.roomList);
      } catch (error) {
        console.error('Error fetching rooms:', error.message);
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const response = await getRoomTypes();
        setRoomTypes(response.data);
      } catch (error) {
        console.error('Error fetching room types:', error.message);
      }
    };

    fetchRooms();
    fetchRoomTypes();
  }, []);

  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
    filterRooms(e.target.value);
  };

  const filterRooms = (type) => {
    if (type === '') {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) => room.roomType === type);
      setFilteredRooms(filtered);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = Array.isArray(filteredRooms) ? filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom) : []; // Kiểm tra filteredRooms có phải là mảng

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='all-rooms'>
      <h2>All Rooms</h2>

      <div className='all-room-filter-div'>
        <label>Filter by Room Type:</label>

        <select value={selectedRoomType} onChange={handleRoomTypeChange}>
          <option value="">All</option>

          {roomTypes.length > 0 ? (
            roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))
          ) : (
            <option disabled>No room types available</option>
          )}
        </select>
      </div>

      <RoomSearch handleSearchResult={handleSearchResult} />

      <RoomResult roomSearchResults={currentRooms} />

      <Pagination
        roomsPerPage={roomsPerPage}
        totalRooms={filteredRooms.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default AllRoomsPage;
