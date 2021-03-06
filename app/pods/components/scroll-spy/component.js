import Ember from 'ember'

function highlightElement (selector) {
  selector.parent().children().each(function () {
    $(this).css('font-weight', 'lighter')
    $(this).css('border-left', '2px solid white')
  })
  selector.css('font-weight', 'bold')
  selector.css('border-left', '2px solid #009EEF')
}

function positionScrollSpy (id) {
  if ($(window).width() > 800) {
    $(id).css('display', 'inline')
    if ($(window).scrollTop() >= $('.frost-info-bar').height() + $('.tab-nav').height()) {
      $('.scroll-spy').css('position', 'fixed')
      $(id).css('top', '0px')
      $(id).css('left', $(id).parent().width() + 220)
    } else {
      $('.scroll-spy').css('position', 'absolute')
      $(id).css('top', $('.frost-info-bar').height() + $('.tab-nav').height())
      $(id).css('left', $(id).parent().width())
    }
  } else {
    $(id).css('display', 'none')
  }
}

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['scroll-spy'],
  addQueryParam: function (name, value) {
    var myUrl = window.location.href
    var re = new RegExp('([?&]' + name + '=)[^&]+', '')

    function add (sep) {
      myUrl += sep + name + '=' + encodeURIComponent(value)
    }

    function change () {
      myUrl = myUrl.replace(re, '$1' + encodeURIComponent(value))
    }
    if (window.location.href.indexOf('#') === -1) {
      myUrl += '#/'
      add('?')
    } else if (myUrl.indexOf('?') === -1) {
      add('?')
    } else {
      if (re.test(myUrl)) {
        change()
      } else {
        add('&')
      }
    }
    return myUrl
  },
  click: function (event) {
    window.clickScroll = true
    $('html, body').animate({
      scrollTop: $(event.target.id).offset().top - (0.125 * $(window).height())
    }, 200)
    highlightElement($(event.target))
    Ember.run.later(function () {
      window.clickScroll = false
    }, 300)
    window.location.href = this.addQueryParam('section', event.target.id.replace('#', ''))
  },
  scrollspy: function () {
    var id = this.elementId
    window.clickScroll = false
    Ember.run.schedule('afterRender', this, function () {
      positionScrollSpy('#' + id)
    })
    $(window).on('resize hashchange', function () {
      positionScrollSpy('#' + id)
    })
    $(window).scroll(function (event) {
      positionScrollSpy('#' + id)
      if (window.clickScroll) {
        return
      }
      if ($(window).scrollTop() + $(window).height() === $(document).height()) { // scrolling hit page bottom
        highlightElement($('#' + id).children().last())
      } else if ($(window).scrollTop() === 0) {
        highlightElement($('#' + id).children().first())
      }
    })
  }.on('didInsertElement')
})
