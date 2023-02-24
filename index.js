export class EmptyAttribute {}

export function analyze(element) {
  element = element.trim();
  const attributes = parseAttributes(element);
  return attributes
}

function correctify(attributes) {
  let newobj = {};
  Object.keys(attributes).forEach(key => {
    if (key == "") {
      newobj[attributes[key]] = new EmptyAttribute();
    } else {
      newobj[key] = attributes[key];
    }
  })
  return newobj;
}

function parseAttributes(input) {
  const getName = getLocalName(input);
  const startString = `<${getName}`;
  let selfClosing = false;
  if(input.startsWith(startString) && input.endsWith(`/>`)) {
    selfClosing = true;
  }
  let completedString = '';
  const attributes = {};
  const output = {
    element: {
      attributeOffsets: {},
      attributes: {},
      rawElement: '',
      rawAttributes: '',
      localName: '',
      innerHTML: { 
        content: '',
        startOffset: 0,
        endOffset: 0
      },
      selfClosing: selfClosing
    },
    addAttribute: (userAttribute) => {},
    removeAttribute: (willBeRemovedAttribute) => {}
  };
  let insideCurlyBraces = false;
  let insideQuotes = false;
  let attributeName = '';
  let attributeValue = '';
  let currentValue = '';
  let inAttributeArea = false;
  let attributeAreaEndIndex = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    if(inAttributeArea == true) {
      if((selfClosing == true ? (char == '/' || char == '>') : char == '>') && !insideQuotes && !insideCurlyBraces) {
        attributeAreaEndIndex = i + 1;
        break;
      }
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
          attributes[attributeName] = attributeValue;
          currentValue = '';
          attributeName = '';
        }
      } else {
        currentValue += char;
      }
      if (currentValue.trim().length > 0) {
        attributes[attributeName] = currentValue.trim();
        if(attributeName.length > 0) {
          output.element.attributeOffsets[attributeName] = {
            nameOffset: {
              start: i - attributeName.length - currentValue.length,
              end: i - currentValue.length
            },
            valueOffset: {
              start: i - currentValue.length + 1,
              end: i + 1
            },
            blockOffset: {
              start: i - attributeName.length - currentValue.length,
              end: i + 1
            }
          }
        }
        if(attributeName.length == 0) {
          output.element.attributeOffsets[currentValue.trim()] = {
            nameOffset: {
              start: i - currentValue.length,
              end: i + 1
            },
            valueOffset: null,
            blockOffset: {
              start: i - currentValue.length,
              end: i + 1
            }
          }
        }
      }
    } else {
      completedString += char;
      if (completedString === startString) {
        inAttributeArea = true;
      }
    }
    }
  if(selfClosing == false) {
    output.element.innerHTML = {
      content: input.substring(attributeAreaEndIndex, input.length - getName.length - 3),
      startOffset: attributeAreaEndIndex,
      endOffset: input.length - getName.length - 3
    }
  }
  output.element.attributes = correctify(attributes);
  Object.keys(output.element.attributeOffsets).forEach(key => {
    if(!output.element.attributes[key]) {
      delete output.element.attributeOffsets[key];
    }
  })
  output.element.rawElement = input
  output.element.rawAttributes = input.substring(startString.length, attributeAreaEndIndex - 1).trim();
  output.element.localName = getName;
  output.addAttribute = addAttribute.bind(null, output);
  output.removeAttribute = removeAttribute.bind(null, output);
  return output;
}


function addAttribute(parsedObj, userAttribute) {
  const { element } = parsedObj;
  let newString;
  if(!userAttribute.name) {
    throw new Error("Attribute name is required");
  }
  if(!userAttribute.value) {
   newString = element.rawAttributes + ' ' + userAttribute.name;
  } else {
    newString = element.rawAttributes + ' ' + userAttribute.name + '=' + userAttribute.value
  }
  if(element.innerHTML && element.innerHTML.content.length > 0) {
    newString = '<' + element.localName + ' ' + newString + '>' + element.innerHTML.content + '</' + element.localName + '>';
  } else {
    newString = '<' + element.localName + ' ' + newString + '/>'
  }
  parsedObj.element = analyze(newString).element;
}

function removeAttribute(parsedObj, willBeRemovedAttribute) {
  const { element } = parsedObj;
  const { start, end } = element.attributeOffsets[willBeRemovedAttribute].blockOffset;
  let newString = element.rawElement.substring(0, start) + element.rawElement.substring(end);
  parsedObj.element = analyze(newString).element;
}

export function getLocalName(input) {
  const openingTagEndIndex = input.indexOf('>');
  const tagStringWithoutClosingSlash = input.slice(0, openingTagEndIndex).trimEnd();

  const tagName = tagStringWithoutClosingSlash.split(' ')[0].replace("<", '');

  return tagName;
}