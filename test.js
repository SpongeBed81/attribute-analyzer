import {EmptyAttribute, getAttributes, getLocalName } from "./index.js";
const input = `<a style="background-color: {red}" :data={"sa" + hello} test="yes" selected on:click='{() => alert("{}")}'></a>`;
const attributes = getAttributes(input);
console.log(attributes)