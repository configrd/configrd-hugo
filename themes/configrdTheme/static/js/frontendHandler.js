$(document).ready(function() {
  
  var current = location.pathname;
  $('.level-2 > a').each(function(){
    var $this = $(this);
    // if the current path is like this link, make it active
    if($this.attr('href').indexOf(current) !== -1 && $this.attr('href').indexOf(current) > 1){
      //alert($this.attr('href').indexOf(current));
      $this.addClass('active');
      $('.level-2 #setupSubitems').addClass('show');
    }
  })
  
  var windowOrigin = window.location.href.split("#")[0];
  var SvgIcon = '<svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><g><path class="st0" d="M15,7h3c2.8,0,5,2.2,5,5s-2.2,5-5,5h-3 M9,17H6c-2.8,0-5-2.2-5-5s2.2-5,5-5h3"></path><line class="st0" x1="8" y1="12" x2="16" y2="12"></line></g></svg>';
  $('.page-wrapper').find('h2[id]').each(function () {
    $(this).append(' <a href="'+ windowOrigin + '/#' + $(this).attr('id') +'" class="anchor"><span class="svg-wrapper">' + SvgIcon + '</span></a>');
  });

  $('.page-wrapper').find('h3[id]').each(function () {
    $(this).append(' <a href="'+ windowOrigin + '/#' + $(this).attr('id') +'" class="anchor"><span class="svg-wrapper">' + SvgIcon + '</span></a>');
  });

  $('.page-wrapper').find('h4[id]').each(function () {
    $(this).append(' <a href="'+ windowOrigin + '/#' + $(this).attr('id') +'" class="anchor"><span class="svg-wrapper">' + SvgIcon + '</span></a>');
  });

  $('.page-wrapper').find('h5[id]').each(function () {
    $(this).append(' <a href="'+ windowOrigin + '/#' + $(this).attr('id') +'" class="anchor"><span class="svg-wrapper">' + SvgIcon + '</span></a>');
  });

  $('.page-wrapper').find('h6[id]').each(function () {
    $(this).append(' <a href="'+ windowOrigin + '/#' + $(this).attr('id') +'" class="anchor"><span class="svg-wrapper">' + SvgIcon + '</span></a>');
  });

  $(window).scroll(function() {
    $(":header").each(function() {
      if ($(window).scrollTop() >= $(this).offset().top) {
        var id = $(this).attr('id');
        $('.anchorsNavigationList a').removeClass('active');
        $('.anchorsNavigationList a[href="#' + id + '"]').addClass('active');
      }
    });
  });

  // tabs
  $('.tab-content').find('.tab-pane').each(function(idx, item) {
    var navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
        title = $(this).attr('title');
    navTabs.append('<li><a href="#">'+title+'</a></li>');
  });

  $('.code-tabs ul.nav-tabs').each(function() {
    $(this).find("li:first").addClass('active');
  })

  $('.code-tabs .tab-content').each(function() {
    $(this).find("div:first").addClass('active');
  });

  $('.nav-tabs a').click(function(e){
    e.preventDefault();
    var tab = $(this).parent(),
        tabIndex = tab.index(),
        tabPanel = $(this).closest('.code-tabs'),
        tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
    tabPanel.find('.active').removeClass('active');
    tab.addClass('active');
    tabPane.addClass('active');
  });

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
      $(".sidebar").removeClass("fixed");
      $(".sidebar").removeClass("topHeaderOffset");
    }
    if($(window).width() + 17 > 1023) {
      $(".sidebar").addClass("fixed");
      if($(window).scrollTop() < 80) {
        $(".sidebar").addClass("topHeaderOffset");
        $('.sidebar').css({"height":windowHeight - 80});
        $(".anchorsNavigation").removeClass("fixed");
        $('.anchorsNavigation').css({"max-height":windowHeight - 80});
      }
      else {
        $(".sidebar").removeClass("topHeaderOffset");
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

  // Copy button tooltip text changing
  $('.copyButton').on('click', function (event) {
      var target = $(this);
      target.tooltip('hide').attr('data-original-title', 'Copied!').tooltip('show');

      var clearTooltip = function(){
        target.tooltip('hide').attr('data-original-title', 'Copy');
      };
      setTimeout(clearTooltip, 700);
  });
  // Copy button initialization
  var clipboard = new ClipboardJS('.copyButton');
  clipboard.on('success', function(e) {
    e.clearSelection();
  });
  
  // Responsive Table
  $("table").wrap("<div class='table-responsive'></div>")

});
