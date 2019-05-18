const elementPaging = require('../src/services/elementPaging');
const elements = [];
const defaultPageSize = 10;
const assert = require('chai').assert;
for(let i = 0; i < 40; i++) {
    elements.push({
        id: i,
        text: 'Text ' + i
    });
}

describe('Element paging', function () {
    it('should return first page correctly when no last element id is passed', function () {
        // Arrange & Act
        const pagedElements = elementPaging.getCollectionPage(elements, '', defaultPageSize);
        // Assert
        assert.deepEqual(elements.slice(0, defaultPageSize), pagedElements);
    });
});