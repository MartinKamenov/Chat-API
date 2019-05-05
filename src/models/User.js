class User {
    constructor(id, email, username, password, imageUrl) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.imageUrl = imageUrl;
    }
}

module.exports = User;