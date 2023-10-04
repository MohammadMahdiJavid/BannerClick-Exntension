function entriesToRemove(elements, unrelatedElements) {
    unrelatedElements.forEach((element) => {
        const index = elements.indexOf(element);
        if (index !== -1) elements.splice(index, 1);
    });
}

function isInsideOptions(element) {
    while (!["div", "html"].includes(element.tagName.toLowerCase())) {
        if (
            ["table", "tr", "ul", "ol", "script"].includes(
                element.tagName.toLowerCase()
            )
        )
            return true;
        element = element.parentElement;
    }
    return false;
}

function isFixedElement(element) {
    const style = window.getComputedStyle(element);
    return style.position === "fixed";
}

function findFixedAncestor(element) {
    while (true) {
        if (element.tagName.toLowerCase() === "html") return null;
        else if (isFixedElement(element)) return element;
        element = element.parentElement;
    }
}
function isInsideViewport(element) {
    // check if the element is inside the viewport
    const rects = element.getClientRects();
    const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    for (const rect of rects) {
        const top = rect.top + scrollTop;
        const left = rect.left + scrollLeft;
        const bottom = rect.bottom + scrollTop;
        const right = rect.right + scrollLeft;

        if (
            bottom >= 0 &&
            top <= viewportHeight &&
            right >= 0 &&
            left <= viewportWidth
        ) {
            return true;
        }
    }

    return false;
}

function isInsideViewport2(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isPositiveZIndexInt(element) {
    const style = window.getComputedStyle(element);
    const zIndex = style.zIndex;
    return zIndex !== "" && parseInt(zIndex) > 5;
}

function findAncestorWithIntZIndex(element) {
    while (true) {
        if (element.tagName.toLowerCase() === "html") return null;
        else if (isPositiveZIndexInt(element)) return element;
        element = element.parentElement;
    }
}
const isInsideFooter = (element) => element.closest("footer") !== null;

const isLink = (element) =>
    element.closest("a") !== null || // Check if the element itself is a link
    element.closest("[onclick]") !== null; // Check if the element has an onclick attribute

function hasNegativeZIndex(element) {
    const style = window.getComputedStyle(element);
    const zIndex = style.zIndex;
    return zIndex !== "" && parseInt(zIndex) < 0;
}

export function deleteUnrelatedElements(elements, strict) {
    const unrelatedElements = [];
    elements.forEach((element, index) => {
        try {
            if (isInsideOptions(element) || !isInsideViewport(element))
                unrelatedElements.push(element);
            else if (strict && !findFixedAncestor(element))
                unrelatedElements.push(element);
            else if (
                findFixedAncestor(element) ||
                findAncestorWithIntZIndex(element)
            )
                return; // check this functionality with Debugger
            else if (isInsideFooter(element)) unrelatedElements.push(element);
            else if (isLink(element)) unrelatedElements.push(element);
        } catch (error) {
            unrelatedElements.push(element);
        }
    });
    entriesToRemove(elements, unrelatedElements);
}

export function deleteInvisibleElements(elements) {
    const invisibleElements = [];
    elements.forEach((element, index) => {
        try {
            if (element.tagName.toLowerCase() === "html") return;
            if (
                element.closest('[style*="visibility: hidden"]') ||
                element.closest('[style*="display: none"]') ||
                hasNegativeZIndex(element)
            )
                invisibleElements.push(element);
        } catch (error) {
            invisibleElements.push(element);
        }
    });
    entriesToRemove(elements, invisibleElements);
}
