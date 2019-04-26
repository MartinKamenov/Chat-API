class MessengerRepository {
    constructor(database, collectionName) {
        this.database = database;
        this.collectionName = collectionName;
    }
    getAllMessengers() {
        return this.database.showAll(this.collectionName);
    }

    addMessenger(messenger) {
        return this.database.insert(this.collectionName, messenger);
    }

    findMessengerById(id) {
        return this.database.find(this.collectionName, {id});
    }

    updateMessenger(id, messenger) {
        return this.database.update(this.collectionName, {id}, messenger);
    }
}

module.exports = MessengerRepository;