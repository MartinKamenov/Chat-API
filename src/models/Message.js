class Message {
    constructor(id, userId, text, username, dateCreated) {
        this.id = id;
        this.userId = userId;
        this.text = text;
        this.username = username;
        this.dateCreated = dateCreated;
    }
};

module.exports = Message;