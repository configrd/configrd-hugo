$(document).ready(function() {
  // Setting position for mobileAnchorsNavigation
  function mobileAnchorsNavigation(isShow) {
    if ($(".mobileContentsBox").length) {
      var mobileContentsBoxPosition = $('.mobileContentsBox').position();
      var mobileAnchorsNavigation = $(".mobileAnchorsNavigation");
      var coordinate_X = mobileContentsBoxPosition.left - mobileAnchorsNavigation.width() + 16;
      var coordinate_Y = mobileContentsBoxPosition.top + 30;
      mobileAnchorsNavigation.css({left: coordinate_X, top: coordinate_Y});
      mobileAnchorsNavigation.css({left: coordinate_X, top: coordinate_Y});
      if(isShow) {
        mobileAnchorsNavigation.addClass("visible");
      }
    }
  }
  // Show mobileAnchorsNavigation
  $('.mobileContentsBox').on('click', function () {
    mobileAnchorsNavigation(true);
  });

  // Event handler for closing mobileAnchorsNavigation on outside click
  $(document).mouseup(function(e) {
    var mobileAnchorsNavigation = $(".mobileAnchorsNavigation");
    if (!mobileAnchorsNavigation.is(e.target) && mobileAnchorsNavigation.has(e.target).length === 0) {
      mobileAnchorsNavigation.removeClass("visible");
    }
  });

  // Open search panel after search input focus
  $('.searchInput, .mobileSearch').focus(function(){
    $('.searchBarOverlay').addClass('active');
    $('.searchBarWrapper').addClass('active');
    $('.searchBarInput').focus();
  });

  // Close search panel via the close button
  $('.searchCloseButton').on('click', function () {
      $('.searchBarWrapper').removeClass('active');
      $('.searchBarOverlay').removeClass('active');
  });

  // Close search panel on click on the overlay
  $('.searchBarOverlay').on('click', function (e) {
      var searchBarCoordinate_X = $('.searchBarWrapper').position().left;
      var clickCoordinate_X = e.pageX;
      if(clickCoordinate_X < searchBarCoordinate_X) {
        $('.searchBarOverlay').removeClass('active');
        $('.searchBarWrapper').removeClass('active');
      }
  });

  // event handlers for the mobile navigation section
  $('.mobileMenu').on('click', function () {
      $('.navigationWrapper').addClass('active');
      $('.overlayLayout').addClass('active');
  });

  $('.overlayLayout').on('click', function () {
      $('.navigationWrapper').removeClass('active');
      $('.searchBarWrapper').removeClass('active');
      $('.overlayLayout').removeClass('active');
  });

  $('.mobilePrevButton').on('click', function () {
      $('.navigationWrapper').removeClass('active');
      $('.overlayLayout').removeClass('active');
  });

  // tooltips initialization
  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  })

  // for dropdown button
  $('.navigationLinkIcon').click(function(event) {
    event.preventDefault();
  });

  // sets the height of navigation menu on different screen sizes
  function navigationHeightSetter() {
    var windowHeight = $(window).height();
    if($(window).width() + 17 < 1024) {
      $('.sidebar').css({"height":windowHeight});
    }
    if($(window).width() + 17 > 1023) {
      if($(window).scrollTop() < 80) {
        $(".sidebar").css("position","relative");
        $('.sidebar').css({"height":windowHeight - 80});
        $(".anchorsNavigation").removeClass("fixed");
        $('.anchorsNavigation').css({"max-height":windowHeight - 80});
      }
      else {
        $(".sidebar").css("position","fixed");
        $('.sidebar').css({"height":windowHeight});
        $(".anchorsNavigation").addClass("fixed");
        $('.anchorsNavigation').css({"max-height":windowHeight});
      }
    }
  }

  // Sets the initial height of navigation after page loading
  navigationHeightSetter();

  // Sets the height of navigation during page resizing
  $(window).on('resize', function() {
    navigationHeightSetter();
    mobileAnchorsNavigation(false);
  });

  // Sets the height of navigation and sets the position for the top header during page scrolling
  $(window).on('scroll', function() {
    navigationHeightSetter();
    if($('.mobileAnchorsNavigation').hasClass("visible")) {
      $('.mobileAnchorsNavigation').removeClass("visible")
    }
  });
});
