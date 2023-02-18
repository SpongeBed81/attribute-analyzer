export class EmptyAttribute {}

export function getAttributes(element) {
const localName = getLocalName(element);
element = element.replace("<"+localName, '');
if(element.endsWith(`</${localName}>`)) element = element.slice(0, -(`</${localName}>`.length));
if(element.endsWith(`/>`)) element = element.slice(0, -(`/>`.length));
if(element.endsWith(`>`)) element = element.slice(0, -(`>`.length));
const attributes = parseAttributes(element);
return toObject(attributes);
}

function toObject(attributes) {
 const output = {};
 attributes.forEach(attribute => {
   if(!attribute.includes("=")) {
     output[attribute] = new EmptyAttribute();
     return;
   } else {
     const getEqualIndex = attribute.indexOf("=");
     const key = attribute.slice(0, getEqualIndex);
     let value = attribute.slice(getEqualIndex+1);
     if(value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
     if(value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
     if(value.startsWith("{") && value.endsWith("}")) value = value.slice(1, -1);
     output[key] = value;
   }
 });
 return output;
}


function parseAttributes(input) {
 const output = [];
 let start = 0;
 let insideCurlyBraces = false;
 for (let i = 0; i < input.length; i++) {
   const char = input.charAt(i);
   if (char === '{') {
     insideCurlyBraces = true;
   } else if (char === '}') {
     insideCurlyBraces = false;
   } else if (char === ' ' && !insideCurlyBraces && i > 0 && input.charAt(i - 1) !== ' ') {
     const attribute = input.substring(start, i).trim();
     output.push(attribute);
     start = i + 1;
   }
 }
 const lastAttribute = input.substring(start).trim();
 if (lastAttribute.length > 0) {
   output.push(lastAttribute);
 }
 return output;
}

export function getLocalName(input) {
 const openingTagEndIndex = input.indexOf('>');
 const tagStringWithoutClosingSlash = input.slice(0, openingTagEndIndex).trimEnd();
 
 const tagName = tagStringWithoutClosingSlash.split(' ')[0].replace("<", '');
 
 return tagName;
}