export default class IFrame {
  /**
   * @param {HTMLElement} target
   */
  constructor (target) {
    /** @type {HTMLIFrameElement} */
    this.element = document.createElement('iframe')
    this.element.className = 'mathjax-editor-input'
    /** @type {Object} */
    this.storedStyles = {}
    /** @type {Object} */
    this.storedElements = {}

    if (typeof target === 'string') {
      target = document.querySelector(target)
    }
    target.appendChild(this.element)

    /** @type {Document} */
    this.document = this.element.contentDocument
    /** @type {Window} */
    this.window = this.element.contentWindow
    /** @type {HTMLElement} */
    this.body = this.document.body
    /** @type {HTMLHeadElement} */
    this.head = this.document.head

    this.window.addEventListener('focus', () => this.handleFocus())
    this.window.addEventListener('blur', () => this.handleBlur())
  }

  /**
   * @return {HTMLElement}
   */
  createPlaceholderElement () {
    return document.createElement('void')
  }

  /**
   * @param {String} key
   * @param {HTMLElement} element
   * @return {Void}
   */
  addStyle (key, element) {
    this.storedStyles[key] = element
    this.head.appendChild(element)
  }

  /**
   * @param {String} key
   * @param {HTMLElement} element
   * @return {Void}
   */
  addElement (key, element) {
    this.storedElements[key] = (
      element ||
      this.createPlaceholderElement()
    )
    this.body.appendChild(
      this.storedElements[key]
    )
  }

  /**
   * @param {String} key
   * @param {HTMLElement} newElement
   * @return {Void}
   */
  updateElement (key, newElement) {
    if (!this.storedElements[key]) {
      return
    }
    this.body.replaceChild(
      newElement,
      this.storedElements[key]
    )
    this.storedElements[key] = newElement
  }

  /**
   * @param {String} key
   * @param {HTMLElement} newElement
   * @return {Void}
   */
  updateStyle (key, newElement) {
    if (!this.storedStyles[key]) {
      return
    }
    this.head.replaceChild(
      newElement,
      this.storedStyles[key]
    )
    this.storedStyles[key] = newElement
  }

  /**
   * @return {Void}
   */
  handleFocus () {
    this.element.classList.add('isActive')
  }

  /**
   * @return {Void}
   */
  handleBlur () {
    this.element.classList.remove('isActive')
  }
}