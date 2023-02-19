<h1 align="center">attribute-analyzer</h1>

<h5 align="center">Parse complex attributes on the server with ease</h5>


<br>


```js
import { EmptyAttribute,getAttributes,getLocalName } from "attribute-analyzer"

const input = `<a style="background-color: {red}" :data={"sa" + hello} test="yes" selected on:click='{() => alert("{}")}'>hello</a>`;

//Getting the local name
const name = getLocalName(input); // => a

//Getting all of the attributes
const attributes = getAttributes(input); /* =>  
{
  style: '"background-color: {red}"',
  ':data': '{"sa" + hello}',
  test: '"yes"',
  selected: EmptyAttribute {},
  'on:click': `'{() => alert("{}")}'`
}*/

//Validating an attribute
const isEmpty = attributes.selected instanceof EmptyAttribute // => true
```

## Installation

`npm install attribute-analyzer`

## Features

👻 0 dependencies

😎 Fast

🐱‍👤 Ability to parse complex attributes

## License

MIT