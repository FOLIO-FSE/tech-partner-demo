# Request promises

Just a wrapper for [request](https://github.com/request/request) with proper promises. Because `request-promise` defaults doesn't make sense. Just use it:

```js
const request = require('request-promises');

request('https://google.com/')
  .then(res => { ... })
  .catch(err => { ... });
```

Or with the new Async:

```js
const request = require('request-promises');

(async () => {
  try {
    const res = await request('https://google.com/');
    ...
  } catch (err) {
    ...
  }
})();
```
