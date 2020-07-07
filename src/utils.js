let idCount = 0

/**
 * Creates an unique id.
 *
 * @return {String}
 */
export function createId () {
  idCount += 1
  return `mje-node${idCount}`
}

/**
 * Iterate through an element and its children.
 *
 * @param {HTMLElement} root
 * @param {Object|Function} actions
 */
export function walk (root, actions) {
  const iterator = (element) => {
    if (actions.before) {
      actions.before(element)
    }

    Array.from(element.children).forEach((child) => {
      iterator(child, actions)
    })

    if (actions.after) {
      actions.after(element)
    }

    if (typeof actions === 'function') {
      actions(element)
    }
  }

  iterator(root)
}

/**
 * Checks if element is an <math> element.
 *
 * @param {HTMLElement} element
 */
export function isMath (element) {
  return (
    element.tagName === 'MATH'
  )
}

/**
 * Checks if element is an <mrow> element.
 *
 * @param {HTMLElement} element
 */
export function isRow (element) {
  return element.tagName === 'MROW'
}

/**
 * Checks if element is a container element.
 * (That is, an element that can hold other elements)
 *
 * @param {HTMLElement} element
 */
export function isContainer (element) {
  return (
    isMath(element) ||
    isRow(element)
  )
}
