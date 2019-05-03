class Message {
    constructor(id, text, username, dateCreated) {
        this.id = id;
        this.text = text;
        this.username = username;
        this.dateCreated = dateCreated;
    }
};

module.exports = Message;