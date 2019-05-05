class Message {
    constructor(id, userId, text, username, imageUrl, dateCreated) {
        this.id = id;
        this.userId = userId;
        this.text = text;
        this.username = username;
        this.imageUrl = imageUrl;
        this.dateCreated = dateCreated;
    }
};

module.exports = Message;