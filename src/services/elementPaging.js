const elementPaging = {
    getCollectionPage(collection, firstElementId, pageSize) {
        if(!pageSize) {
            pageSize = pagingConstants.defaultPageSize;
        }

        const firstElement = collection.find((c) => c.id === firstElementId);
        let firstIndex = collection.indexOf(firstElement);
        firstIndex = firstIndex !== -1 ? firstIndex + 1 : 0;

        let lastIndex = firstIndex + pageSize;
        if(lastIndex >= collection.length) {
            lastIndex = collection.length;
        }

        return collection.filter((c, i) => (i >= firstIndex) && (i < lastIndex));
    },

    getPagingOptions(collection, firstElementId, pageSize) {
        if(!pageSize) {
            pageSize = pagingConstants.defaultPageSize;
        }

        const count = collection.length;

        const firstElement = collection.find((c) => c.id === firstElementId);
        let firstIndex = collection.indexOf(firstElement);
        firstIndex = firstIndex !== -1 ? firstIndex + 1 : 0;

        const lastMessageIndex = firstIndex + pageSize < count ? (firstIndex + pageSize) - 1 : count - 1;
        
        const isLastMessagePage = (lastMessageIndex === count - 1);
        let lastMessageId = '';
        if(lastMessageIndex > 0) {
            lastMessageId = collection[lastMessageIndex].id;
        }
        
        return {
            pageSize,
            count,
            lastMessageId,
            isLastMessagePage
        }
    }
};

module.exports = elementPaging;