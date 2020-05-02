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

$('#shortenform').submit(function (event) {
  event.preventDefault()
  var shortenForm = $(this).serializeArray()
  var formObj = {}
  $.each(shortenForm, function (i, v) {
    formObj[v.name] = v.value
  })

  $.ajax({
    method: 'POST',
    url: '/api/shorturl',
    data: { originalUrl: formObj.originalUrl },
    success: function (data) {
      if (data.status) {
        $('.short-display ').css('position', 'relative')
        $('.short-display ').addClass('haslinks')
        $('.short-url-link').prop('href', data.shortUrl)
        $('.short-url-link').text(data.shortUrl)
      } else {
        alert('Please try again')
      }
    },
    error: function (data) {
      alert('Please enter a valid url')
    },
  })
})
