const users = [];

const checkUser = ({ name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    // Check if username exists in this room already
    const duplicateUser = users.find((user) => user.room === room && user.name === name);
    if (duplicateUser) return { error: 'DUPLICATE_USER' };
    return {};
}

const addUser = ({ id, name, room, sid }) => {
    isLeader = (getLeadersInRoom(room).length > 0) ? false : true;
    const user = { id, name, room, sid, isLeader };
    users.push(user);
    return { user };
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index != -1) {
        const removedUser = users.splice(index, 1)[0]
        if (getLeadersInRoom(removedUser.room).length == 0 && getUsersInRoom(removedUser.room).length > 0) {
            users[0].isLeader = true;
        }
        return removedUser;
    }
};

const getUserById = (id) => users.find((user) => user.id === id);

const getUserByName = (name) => users.find((user) => user.name === name);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getOtherUserInRoom = (room, newUser) => users.filter((user) => user.room === room && user.id !== newUser.id)[0];

const getLeadersInRoom = (room) => users.filter((user) => user.room === room && user.isLeader === true);

module.exports = { 
    checkUser, 
    addUser, 
    removeUser, 
    getUserById, 
    getUsersInRoom, 
    getOtherUserInRoom, 
    getUserByName,
    getLeadersInRoom
};