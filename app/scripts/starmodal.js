export default class StarModal {
  constructor () {
    this.overlay = document.createElement('div')
    this.modalBody = document.createElement('div')
    this.modalContent = document.createElement('div')
    this.closeButton = document.createElement('button')
    this.blank = document.createElement('div')
    this.blank.innerText = 'Empty modal'

    // context binding
    this.addClassNames = this.addClassNames.bind(this)
    this.clearClassNames = this.clearClassNames.bind(this)
    this.init = this.init.bind(this)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.stopPropagation = this.stopPropagation.bind(this)
    this.applyEventListeners = this.applyEventListeners.bind(this)
    this.removeEventListeners = this.removeEventListeners.bind(this)
    this.makeCloseButton = this.makeCloseButton.bind(this)
    this.handleEscape = this.handleEscape.bind(this)
    this.transitionIn = this.transitionIn.bind(this)
    this.transitionOut = this.transitionOut.bind(this)
  }

  init (config = {}) {
    this.config = config
    this.addClassNames()
    this.makeCloseButton()
    this.modalBody.appendChild(this.modalContent)
    this.overlay.appendChild(this.modalBody)
  }

  makeCloseButton () {
    const { closeButton = {} } = this.config
    const {
      parent = 'modal',
      text = '',
      innerHTML
    } = closeButton

    this.closeButton.innerHTML = innerHTML || text

    if (parent === 'overlay') {
      this.overlay.appendChild(this.closeButton)
    } else if (parent === 'modal') {
      this.modalBody.appendChild(this.closeButton)
    }
  }

  clearClassNames () {
    const overlayClassList = this.overlay.classList
    const modalBodyClassList = this.modalBody.classList
    const modalContentClassList = this.modalBody.classList
    while (overlayClassList.length > 0) overlayClassList.remove(overlayClassList[0])
    while (modalBodyClassList.length > 0) modalBodyClassList.remove(modalBodyClassList[0])
    while (modalContentClassList.length > 0) modalContentClassList.remove(modalContentClassList[0])
  }

  addClassNames () {
    const { classNames = {} } = this.config
    const {
      overlay = 'starmodal-overlay',
      modalBody = 'starmodal-body',
      modalContent = 'starmodal-content',
      closeButton = 'starmodal-close-button'
    } = classNames

    this.clearClassNames()

    this.overlay.classList.add(overlay)
    this.modalBody.classList.add(modalBody)
    this.modalContent.classList.add(modalContent)
    this.closeButton.classList.add(closeButton)
  }

  applyEventListeners () {
    window.addEventListener('keyup', this.handleEscape)
    this.overlay.addEventListener('click', this.hide)
    this.closeButton.addEventListener('click', this.hide)
    this.modalBody.addEventListener('click', this.stopPropagation)
  }

  removeEventListeners () {
    window.removeEventListener('keyup', this.handleEscape)
    this.overlay.removeEventListener('click', this.hide)
    this.closeButton.removeEventListener('click', this.hide)
    this.modalBody.removeEventListener('click', this.stopPropagation)
  }

  transitionIn () {
    const { transitionClassNames = {} } = this.config
    const {
      overlayIn = 'starmodal-overlay-in',
      overlayOut = 'starmodal-overlay-out',
      modalIn = 'starmodal-modal-in',
      modalOut = 'starmodal-modal-out'
    } = transitionClassNames

    this.overlay.classList.add(overlayOut)
    this.modalBody.classList.add(modalOut)
    setTimeout(() => {
      this.overlay.classList.remove(overlayOut)
      this.overlay.classList.add(overlayIn)
      this.modalBody.classList.remove(modalOut)
      this.modalBody.classList.add(modalIn)
    }, 10)
  }

  transitionOut () {
    const { transitionClassNames = {} } = this.config
    const {
      overlayIn = 'starmodal-overlay-in',
      overlayOut = 'starmodal-overlay-out',
      modalIn = 'starmodal-modal-in',
      modalOut = 'starmodal-modal-out'
    } = transitionClassNames

    this.overlay.classList.remove(overlayIn)
    this.overlay.classList.add(overlayOut)
    this.modalBody.classList.remove(modalIn)
    this.modalBody.classList.add(modalOut)
  }

  show (content) {
    if (content) this.content = content.cloneNode(true)
    document.body.style.overflow = 'hidden'
    this.modalContent.appendChild(this.content || this.blank)
    document.body.appendChild(this.overlay)
    this.transitionIn()
    this.applyEventListeners()
  }

  hide () {
    this.transitionOut()
    this.removeEventListeners()

    setTimeout(() => {
      while (this.modalContent.firstChild) this.modalContent.removeChild(this.modalContent.firstChild)
      this.content = undefined
      document.body.removeChild(this.overlay)
      document.body.style.overflow = 'auto'
    }, 200)
  }

  handleEscape (e) {
    const event = e || window.event
    let isEscape = false
    if ('key' in event) {
      isEscape = (event.key === 'Escape' || event.key === 'Esc')
    } else {
      isEscape = (event.keyCode === 27)
    }
    if (isEscape) this.hide()
  }

  stopPropagation (e) {
    e.stopPropagation()
  }
}
