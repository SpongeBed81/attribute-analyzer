import {EmptyAttribute, getAttributes, getLocalName } from "./index.js";
const input = `<button on:click={hello} on:test={() => (function(){color = 'blue' })()} selected marked class="svelte-0" used></button>`;
const attributes = getAttributes(input);
console.log(getLocalName(input))
const s = attributes["on:click"] instanceof EmptyAttribute
console.log(s)