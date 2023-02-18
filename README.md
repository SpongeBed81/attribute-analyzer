<h1 align="center">attribute-analyzer</h1>

<h5 align="center">Parse complex attributes on the server with ease</h5>


<br>


```js
import { EmptyAttribute,getAttributes,getLocalName } from "attribute-analyzer"

const input = `<button on:click={hello} on:test={() => (function(){color = 'blue' })()} selected marked class="styling" used></button>`;

//Getting the local name
const name = getLocalName(input); // => button

//Getting all of the attributes
const attributes = getAttributes(input); /* =>  
{
  'on:click': 'hello',
  'on:test': "() => (function(){color = 'blue' })()",
  selected: EmptyAttribute {},
  marked: EmptyAttribute {},
  class: 'styling',
  used: EmptyAttribute {}
}*/

//Validating an attribute
const isEmpty = attributes.used instanceof EmptyAttribute // => true
```

## Installation

`npm install attribute-analyzer`

## Features

👻 0 dependencies

😎 Fast

🐱‍👤 Ability to parse complex attributes

## License

MIT