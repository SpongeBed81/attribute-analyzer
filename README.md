<h1 align="center">attribute-analyzer</h1>

<h5 align="center">Parse complex attributes on the server with ease</h5>


<br>


```js
import { EmptyAttribute,analyze,getLocalName } from "attribute-analyzer"

const input = `<button on:click={() => {value++}} test="yes" :data>testing</button>`;

//Getting the local name
const name = getLocalName(input); // => button

//Analyzing the element
const analyzedElement = analyze(input); /* => 
{
  element: {
    attributeOffsets: { 'on:click': [Object], test: [Object], ':data': [Object] },
    attributes: {
      ':data': EmptyAttribute {},
      'on:click': '{() => {value++}}',
      test: '"yes"'
    },
    rawElement: '<button on:click={() => {value++}} test="yes" :data>testing</button>',
    rawAttributes: 'on:click={() => {value++}} test="yes" :data',
    localName: 'button',
    innerHTML: { content: 'testing', startOffset: 52, endOffset: 59 },
    selfClosing: false
  },
  addAttribute: [Function: bound addAttribute],
  removeAttribute: [Function: bound removeAttribute]
}
*/

//Validating an attribute
const isEmpty = analyzedElement.element.attributes[":data"] instanceof EmptyAttribute // => true

//Adding an attribute to the element
attributes.addAttribute({"name": "on:mouseover", "value": `{() => alert("hey")}`})
console.log(attributes.element.rawElement) /* => 
<button on:click={() => {value++}} test="yes" :data on:mouseover={() => alert("hey")}>testing</button>
*/

//Removing an attribute from the element
attributes.removeAttribute("on:mouseover")
console.log(attributes.element.rawElement) /* => 
<button on:click={() => {value++}} test="yes" :data >testing</button>
*/
```

## Installation

`npm install attribute-analyzer`

## Features

👻 0 dependencies

😎 Fast

🐱‍👤 Ability to parse complex attributes

## License

MIT