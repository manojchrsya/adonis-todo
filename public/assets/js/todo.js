'use strict;'

var loadData = function (url, method, data, done) {
  $.ajax({
    url: url,
    type: method,
    data: data,
    dataType: 'json',
    success: function (response, textStatus, jqXHR) {
      done(response)
    },
    error: function (response) {
      var errors = []
      if (response && response.responseJSON && response.responseJSON.errors) {
        response.responseJSON.errors.forEach((error) => {
          errors.push(`<span>${error.message}</span>`)
        })
        $('.error-messages').removeClass('d-none').html(errors.join('<br>'))
      } else if (response && response.message) {
        $('.error-messages').removeClass('d-none').html(response.message)
      }
    },
  })
}
// activate tooltip after page load
window.onload = function () {
  $('[data-toggle="tooltip"]').tooltip()
}
$(document).ready(function () {
  $('.create-todo').on('click', function (evt) {
    evt.preventDefault()
    var task = $('.new-task').val()
    // eslint-disable-next-line @typescript-eslint/naming-convention
    var is_completed = 0
    loadData('/', 'POST', { task, is_completed }, function () {
      $('.new-task').val('')
      window.location.reload()
    })
  })

  $('.delete-todo').on('click', function (evt) {
    evt.preventDefault()
    var todoId = $(this).parent().attr('data-id')
    loadData(`/todo/${todoId}`, 'DELETE', {}, function () {
      window.location.reload()
    })
  })
  $('.mark-complete').on('click', function (evt) {
    evt.preventDefault()
    var todoId = $(this).parent().attr('data-id')
    // eslint-disable-next-line @typescript-eslint/naming-convention
    var is_completed = $(this).attr('data-value')
    loadData(`/todo/${todoId}`, 'PUT', { is_completed }, function () {
      window.location.reload()
    })
  })
  $('.update-todo').on('click', function (evt) {
    evt.preventDefault()
    var todoId = $(this).parent().attr('data-id')
    var task = $(this).parent().parent().parent().find('.edit-todo-input').val()
    loadData(`/todo/${todoId}`, 'PUT', { task }, function () {
      window.location.reload()
    })
  })

  $('.todo-filter').on('change', function () {
    var filter = $(this).val()
    var url = filter !== '-1' ? `/?is_completed=${filter}` : '/'
    window.location.href = url
  })
})
