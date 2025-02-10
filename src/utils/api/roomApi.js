import axios from "../service/axiosCustomize.js";

export const addRoom = async (formData) => {
  return await axios.post("/rooms/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllAvailableRooms = async () => {
  return await axios.get("/rooms/all-available-rooms");
};

// export const getAvailableRoomsByDateAndType = async (
//   checkInDate,
//   checkOutDate,
//   roomType
// ) => {
//   return await axios.get(`/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}
//     &checkOutDate=${checkOutDate}&roomType=${roomType}`);
// };
export const getAvailableRoomsByDateAndType = async (
  checkInDate,
  checkOutDate,
  roomType
) => {
  const params = new URLSearchParams({
    checkInDate,
    checkOutDate,
    roomType,
  }).toString();
  return await axios.get(`/rooms/available-rooms-by-date-and-type?${params}`);
};

export const getRoomTypes = async () => {
  return await axios.get("/rooms/types");
};

export const getAllRooms = async () => {
  return await axios.get("/rooms/all");
};

export const getRoomById = async (roomId) => {
  return await axios.get(`/rooms/room-by-id/${roomId}`);
};

export const deleteRoom = async (roomId) => {
  return await axios.delete(`/rooms/delete/${roomId}`);
};

export const updateRoom = async (roomId, formData) => {
  return await axios.put(`/rooms/update/${roomId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getImage = async (roomId) => {
  return await axios.get(`/rooms/image/${roomId}`, { responseType: "blob" });
};
