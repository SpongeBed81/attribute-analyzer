export class EmptyAttribute {}

export function getAttributes(element) {
const localName = getLocalName(element);
element = element.replace("<"+localName, '');
if(element.endsWith(`</${localName}>`)) element = element.slice(0, -(`</${localName}>`.length));
if(element.endsWith(`/>`)) element = element.slice(0, -(`/>`.length));
if(element.endsWith(`>`)) element = element.slice(0, -(`>`.length));
const attributes = parseAttributes(element);
return correctify(attributes);
}

function correctify(attributes) {
  let newobj = {};
  Object.keys(attributes).forEach(key => {
    if(key == "") {
      newobj[attributes[key]] = new EmptyAttribute();
    } else {
      newobj[key] = attributes[key];
    }
  })
  return newobj;
}

function parseAttributes(input) {
  const output = {};
  let insideCurlyBraces = false;
  let insideQuotes = false;
  let attributeName = '';
  let attributeValue = '';
  let currentValue = '';
  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    if (char === '{' && !insideQuotes) {
      insideCurlyBraces = true;
      currentValue += char;
    } else if (char === '}' && !insideQuotes) {
      insideCurlyBraces = false;
      currentValue += char;
    } else if (char === '"' && !insideCurlyBraces) {
      insideQuotes = !insideQuotes;
      currentValue += char;
    } else if (char === '=' && !insideCurlyBraces && !insideQuotes) {
      attributeName = currentValue.trim();
      currentValue = '';
    } else if (char === ' ' && !insideCurlyBraces && !insideQuotes) {
      if (currentValue.trim().length > 0) {
        attributeValue = currentValue.trim();
        output[attributeName] = attributeValue;
        currentValue = '';
        attributeName = '';
      }
    } else {
      currentValue += char;
    }
  }
  if (currentValue.trim().length > 0) {
    output[attributeName] = currentValue.trim();
  }
  return output;
}


export function getLocalName(input) {
 const openingTagEndIndex = input.indexOf('>');
 const tagStringWithoutClosingSlash = input.slice(0, openingTagEndIndex).trimEnd();
 
 const tagName = tagStringWithoutClosingSlash.split(' ')[0].replace("<", '');
 
 return tagName;
}