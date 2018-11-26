export default (function setupTests() {
    function promiseTest() {
        return Promise.resolve('ok');
    }
    function arrayIncludesTest(testArray, testValue) {
        return testArray.includes(testValue);
    }
    async function asyncAwaitTest() {
        return new Promise(resolve => {
            setTimeout(() => resolve(200), 1000);
        });
    }
    return {
        promiseTest,
        arrayIncludesTest,
        asyncAwaitTest,
    };
})();
