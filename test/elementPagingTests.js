const elementPaging = require('../src/services/elementPaging');
const elements = [];
const defaultPageSize = 10;
const assert = require('chai').assert;
for(let i = 0; i < 40; i++) {
    elements.push({
        id: '' + i,
        text: 'Text ' + i
    });
}

describe('Element paging', function () {
    it('should return first page correctly when no last element id is passed', function () {
        // Arrange & Act
        const pagedElements = elementPaging.getCollectionPage(elements, '', defaultPageSize);
        // Assert
        assert.deepEqual(pagedElements, elements.slice(0, defaultPageSize));
    });

    it('should return correct page correctly when last element id is passed', function () {
        // Arrange & Act
        const pagedElements = elementPaging.getCollectionPage(elements, '9', defaultPageSize);
        // Assert
        assert.deepEqual(pagedElements, 
            elements.slice(10, 20));
    });

    it('should return correct page from last elements correctly when id is passed', function () {
        // Arrange & Act
        const pagedElements = elementPaging.getCollectionPage(elements, '35', defaultPageSize);
        // Assert
        assert.deepEqual(pagedElements, elements.slice(36, 40));
    });
});