const elementPaging = {
    getCollectionPage(collection, firstElement, pageSize) {
        if(!pageSize) {
            pageSize = pagingConstants.defaultPageSize;
        }

        let firstIndex = collection.indexOf(firstElement);
        if(firstIndex === -1) {
            firstIndex = 0;
        }

        let lastIndex = firstIndex + pageSize;
        if(lastIndex > collection.length) {
            lastIndex = collection.length;
        }

        return collection.filter((c, i) => (i >= firstIndex) && (i < lastIndex));
    },

    getPagingOptions(collection, firstElement, pageSize) {
        if(!pageSize) {
            pageSize = pagingConstants.defaultPageSize;
        }

        const count = collection.length;
        const pagesCount = Math.ceil(count / pageSize);
        const firstIndex = collection.indexOf(firstElement);
        const lastElement = firstIndex !== -1 ? (firstElement + pageSize) : (pageSize);

        return {
            pageSize,
            pagesCount,
            count,
            lastElement
        };
    }
};

module.exports = elementPaging;