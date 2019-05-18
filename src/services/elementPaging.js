const elementPaging = {
    getCollectionPage(collection, firstElementId, pageSize) {
        if(!pageSize) {
            pageSize = pagingConstants.defaultPageSize;
        }

        const firstElement = collection.find((c) => c.id === firstElementId);
        let firstIndex = collection.indexOf(firstElement);
        firstIndex = firstIndex !== -1 ? firstIndex : 0;

        let lastIndex = firstIndex + pageSize;
        if(lastIndex > collection.length - 1) {
            lastIndex = collection.length - 1;
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
        firstIndex = firstIndex !== -1 ? firstIndex : 0;

        const lastMessageIndex = firstIndex + pageSize < count ? (firstIndex + pageSize) : count - 1;
        
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