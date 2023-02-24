import {EmptyAttribute, analyze, getLocalName } from "./index.js";
const input = `<button on:click={() => {value++}} test="yes" :data>testing</button>`;
let attributes = analyze(input)
attributes.addAttribute({"name": "on:mouseover", "value": `{() => alert("hey")}`})
console.log(attributes.element.rawElement)
attributes.removeAttribute("on:mouseover")
console.log(attributes.element.rawElement)