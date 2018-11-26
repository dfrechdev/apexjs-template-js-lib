import apex from 'apex';

// example function using the apex library
export function getItemLabel(elementId) {
    return apex.item(elementId).node.textContent;
}
