var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

$(document).ready(function() {

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	if ('flex' in document.documentElement.style) {
		// Хак для UCBrowser
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
		    // Flexbox-совместимый браузер.
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
	    // Браузер без поддержки Flexbox, в том числе IE 9/10.
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

	// First screen full height
	function setHeiHeight() {
	    $('.full__height').css({
	        minHeight: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
  $('[href*="#"]').click(function(event) {
    event.preventDefault();
  });

	$('a[disabled]').click(function(event) {
		event.preventDefault();
	});

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	// $('#main__menu a[href^="#"]').click( function(){ 
	// 	var scroll_el = $(this).attr('href'); 
	// 	if ($(scroll_el).length != 0) {
	// 	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	// 	}
	// 	return false;
	// });

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    // $(document).ready(function(){
    //     var HeaderTop = $('#header').offset().top;
        
    //     $(window).scroll(function(){
    //             if( $(window).scrollTop() > HeaderTop ) {
    //                     $('#header').addClass('stiky');
    //             } else {
    //                     $('#header').removeClass('stiky');
    //             }
    //     });
    // });
   	// setGridMatch($('[data-grid-match] .grid__item'));
   	// gridMatch();

   	$('select').select2({
        minimumResultsForSearch: 10,
        placeholder: 'Назначить',
    });

    $('select.add').select2({
        minimumResultsForSearch: 10,
        placeholder: 'Назначить',
    });

    $('select.add').on('select2:open', function (e) {
        var container = $('.select2-container').last().find('.select2-results__options');
        container.addClass('select2-container__add');
        $('.js-add-new').remove();
        container.before('<a href="#" class="js-add-new select2-results__add"><i class="icon__add"></i> Добавить нового</a>');
    });

   	$('.filter__top_toggle').on('click', function(event) {
   		event.preventDefault();
   		$(this).toggleClass('open');
   		$('.filter__content').slideToggle(300);
   	});

   	$('.filter__bottom_toggle').on('click', function(event) {
   		event.preventDefault();
   		$(this).toggleClass('open');
   		$('.filter__bottom_more').slideToggle(300);
   		if ($(this).hasClass('open')) {
   			$(this).html('Скрыть <span class="icon icon__drop"></span>')
   		} else {
   			$(this).html('Больше фильтров <span class="icon icon__drop"></span>')
   		}
   	});

    $('[data-setting-drop]').on('click', function(event) {
      event.preventDefault();
      var dropId = $(this).attr('href');
      $('.content__settings_drop').not(dropId).removeClass('open')
      $(dropId).toggleClass('open');
    });

    $('body').on('click', '[data-radio-swich]', function(event) {
      event.preventDefault();
      var elId = $(this).data('radioSwich');

      $('[data-radio-swich]').removeClass('active');
      $(this).addClass('active');

      $('.radio__swicher_target').removeClass('active');
      $(elId).addClass('active')

    });

});

$(window).resize(function(event) {
	checkOnResize()
});

function checkOnResize() {
   	// setGridMatch($('[data-grid-match] .grid__item'));
   	// gridMatch();
}

function gridMatch() {
   	$('[data-grid-match] .grid__item').matchHeight({
   		byRow: true,
   	});
}

// function setGridMatch(columns) {
// 	var tallestcolumn = 0;
// 	columns.removeAttr('style');
// 	columns.each( function() {
// 		currentHeight = $(this).height();
// 		if(currentHeight > tallestcolumn) {
// 			tallestcolumn = currentHeight;
// 		}
// 	});
// 	setTimeout(function() {
// 		columns.css('minHeight', tallestcolumn);
// 	}, 100);
// }

