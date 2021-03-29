const rooms = [];

const addRoom = (name, sid, workoutID, workoutType) => {
    if (!(getRoomBySID(sid) == undefined && getRoomByName(name) == undefined)) {
        return [400, 'Room already exists']
    }
    console.log(workoutType)
    if (!(['yt', 'vid'].includes(workoutType))) {
        return [400, 'Workout type invalid' ]
    }
    roomObj = {name, sid, workoutID, workoutType}
    rooms.push(roomObj)
    return [200, 'Success']
}

const getRoomBySID = (sid) => rooms.find((room) => room.sid === sid);

const getRoomByName = (name) => rooms.find((room) => room.name === name);

function getActiveRooms(io) {
    let activeRooms = [];
    Object.keys(io.sockets.adapter.rooms).forEach(room => {
        let isRoom = true;
        Object.keys(io.sockets.adapter.sids).forEach(id => {
            isRoom = (id === room) ? false : isRoom;
        });
        if (isRoom) activeRooms.push(room);
    });
    return activeRooms;
}

module.exports = { getActiveRooms, addRoom, getRoomBySID, getRoomByName};