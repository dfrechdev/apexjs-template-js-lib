import test from 'ava';
import { projectInfo, setupTests } from '../src/main';

test('validate project info of library', t => {
    t.truthy(projectInfo);
    t.is(projectInfo.name, 'NPM_PACKAGE_PROJECT_NAME');
    t.is(projectInfo.version, 'NPM_PACKAGE_PROJECT_VERSION');
});

test('test es6 promises', t => {
    return setupTests.promiseTest().then(result => {
        t.pass(result);
    });
});

test('test es6 Array.includes()', t => {
    t.true(setupTests.arrayIncludesTest(['a', 'b', 'c', 'd'], 'b'));
    t.false(setupTests.arrayIncludesTest(['a', 'b', 'c', 'd'], 'w'));
});

test('test ecma2017 async/await', async t => {
    const value = await setupTests.asyncAwaitTest();
    t.is(value, 100);
});
