# zrob

> Simple and modern HTTP requests

## Usage

```
const zrob = require('zrob');

zrob('https://httpbin.org/ip')
  .then(response => {
    console.log(response.body);
  })
  .catch(error => {
    console.log(error.response.body);
  });
```


```
zrob.post('https://httpbin.org/forms/post', { form: { size: 'small' } })
```
