import '@fortawesome/fontawesome-pro/js/all.min'
import '../styles/main.scss'
import StarModal from './starmodal'

if (process.env.NODE_ENV !== 'production') {
  require('../index.pug')
}

const modal = new StarModal()
modal.init()

const modalTrigger = document.querySelectorAll('.modal-trigger')
modalTrigger.forEach(trigger => {
  trigger.addEventListener('click', function () {
    modal.show(document.getElementById(this.getAttribute('data-starmodal')))
  })
})
