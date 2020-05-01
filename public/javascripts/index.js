let menuState = false
let menu = document.getElementsByClassName('toggleMenu')[0]
let close = document.getElementsByClassName('close-icon')[0]
let dropdown = document.getElementsByClassName('dropdown-content')[0]

menu.addEventListener('click', function () {
  menuState = !menuState
  dropdown.classList.add('open')
})
close.addEventListener('click', function () {
  menuState = !menuState
  dropdown.classList.remove('open')
})
