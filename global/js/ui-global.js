// Skip Nav
$(document).on('click', '#skip a', function (e) {
	var tg = $(this).attr('href');
	$(tg).attr('tabindex', '0').focus();
	e.preventDefault();
});

// 화면 확대 축소
// var scale = 1;
// $(document).on('click', '.screen-control button', function () {
// 	var mode = $(this).attr('class');
// 	if (mode == 'btn-zoom-in') {
// 		scale += 0.1;
// 	} else if (mode == 'btn-zoom-out') {
// 		scale -= 0.1;
// 	}
// 	$('body').attr('style', 'transform : scale(' + scale + ')');
// 	$('.zoom-scale').text(parseInt(scale * 100, 10) + '%');
// });

// 이미지 확대보기 모바일 대응
$('.image-content').each(function () {
	setimgContent($(this));
});

function setimgContent(obj) {
	$(obj)
		.prepend('<div class="image-zoom-header"><span class="title">이미지 확대보기</span><button type="button" class="btn btn-close-image"><i class="ico ico-layer-close-white">닫기</i></button></div>')
		.wrapInner('<div class="image-zoom"></div>')
		.append('<button type="button" class="btn btn-zoom">확대보기</button>');
}

$(document).on('click', '.image-content .btn-zoom', function () {
	$(this).closest('.image-content').addClass('full-size');
	$('body').addClass('modal-open');
}).on('click', '.btn-close-image', function () {
	$(this).closest('.image-content').removeClass('full-size');
	$('body').removeClass('modal-open');
});


// 스크롤바 커스텀 디자인
scrollbar();

function scrollbar() {
	var handleMediaChange = function (mediaQueryList) {
		if (mediaQueryList.matches) {
			$('.custom-scroll').mCustomScrollbar('destroy');
		} else {
			$('.custom-scroll').mCustomScrollbar();
		}
	}
	var mediaQueryMatch = window.matchMedia("(max-width: 767px)");
	mediaQueryMatch.addListener(handleMediaChange);
	handleMediaChange(mediaQueryMatch);
}

// 모바일모드 더블터치 핀치 줌 방지
var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function (event) {
	var now = (new Date()).getTime();
	if (now - lastTouchEnd <= 300) {
		event.preventDefault();
	}
	lastTouchEnd = now;
}, false);

// 테이블 스크롤 표시
function tableScroll() {
	var table = $('.scroll-container');

	table.each(function () {
		var $this = $(this),
			ingClass = 'scroll-ing',
			endClass = 'scroll-end';
		$this.on('scroll', function (e) {
			var wrap = $(this).closest('.table-scroll'),
				currLeft = this.scrollLeft,
				scrWidth = this.scrollWidth,
				cliWidth = this.clientWidth;

			if (currLeft === 0) {
				wrap.removeClass(ingClass).removeClass(endClass);
			} else if (currLeft !== 0 && currLeft + cliWidth < scrWidth) {
				wrap.addClass(ingClass).removeClass(endClass);
			} else {
				wrap.addClass(endClass);
			}
		});
	});
}
tableScroll();

// 탭메뉴
var currentIndex, col, colToScroll,
	term = 0,
	timer = null;

$(window).on('load resize', function () {
	clearTimeout(timer);
	timer = setTimeout(modeDetect, term);
	term = 300;
});

function modeDetect() {
	var widthScreen = $(window).width();
	var beforeMode = mode;

	if (widthScreen > 1024) {
		mode = 'pc';
		col = 6;
		colToScroll = 3;
	} else if (widthScreen >= 768) {
		mode = 'tablet';
		col = 3;
		colToScroll = 2;
	} else {
		mode = 'mobile';
		col = 2;
		colToScroll = 2;
	}

	if (beforeMode !== mode) {
		$('.tab-list').each(function () {
			unsetFlicking($(this).closest('.tab-menu'));
			setFlicking($(this).closest('.tab-menu'));
			moveFlicking($(this).closest('.tab-menu'), $(this).find('li.on').index());
		});
	}
}

tabListSetting();

function tabListSetting() {
	$('.tab-list').each(function () {
		setFlicking($(this).closest('.tab-menu'));
		moveFlicking($(obj), $(this).find('li.on').index());
	});
	$('.tab-list .on a').each(function () {
		var tg = $(this).attr('href');
		if (tg !== '#' && tg.charAt(0) === '#') {
			$(tg + '.tab-content').show();
		}
	});
}

function setFlicking(obj) {
	if (!$(obj).hasClass('tab-menu-matrix') && $(obj).find('li').length > col) {
		$(obj).addClass('tab-menu-flicking');
		$(obj)
			.append('<div class="control"><button type="button" class="btn-tab-prev">Prev</button><button type="button" class="btn-tab-next">Next</button></div>')
			.wrapInner('<div class="tab-scroll-container"></div>');
	}
}

function unsetFlicking(obj) {
	$(obj).removeClass('tab-menu-flicking');
	$(obj).find('.control').remove();
}

function moveFlicking(obj, currentIndex) {
	var $tabList = $(obj).find('.tab-list');
	var $btnWrapper = $(obj).find('.control');
	var length = $tabList.children('li').length - 1;
	var colWidth = Math.ceil($tabList.children('li').eq(0).outerWidth());
	var posX = 0;

	// 버튼 비활성화
	$btnWrapper.removeClass('start').removeClass('end');
	if (currentIndex == 0) {
		$btnWrapper.addClass('start');
	} else if (currentIndex == length) {
		$btnWrapper.addClass('end');
	}

	var widthScreen = $(window).width();

	if (widthScreen > 1024) {
		col = 6;
		colToScroll = 3;
	} else if (widthScreen >= 768) {
		col = 3;
		colToScroll = 2;
	} else {
		col = 2;
		colToScroll = 2;
	}

	// 스크롤 위치 계산
	if (currentIndex >= col - colToScroll && currentIndex <= length) {
		if (currentIndex <= length - colToScroll) {
			var pos = currentIndex - col + colToScroll;
		} else {
			var pos = length - col + 1;
		}
		posX = colWidth * -1 * pos;
	}
	$tabList.css({
		'transform': 'translateX(' + posX + 'px)',
	});
}

$('.tab-list a').on('click', function (e) {
	var tg = $(this).attr('href');
	$(this).parent('li').addClass('on').siblings('li').removeClass('on');

	if (tg === '#' || tg === '') {
		e.preventDefault();
	} else if (tg.charAt(0) === '#') {
		if ($(tg).hasClass('tab-content')) {
			$(tg).show().siblings('.tab-content').hide();
			e.preventDefault();
		}
	}

	if ($(this).closest('.tab-menu').hasClass('tab-menu-flicking')) {
		var currentIndex = $(this).parent('li').index();
		moveFlicking($(this).closest('.tab-menu'), currentIndex);
	}
});

$(document).on('click', '.btn-tab-prev, .btn-tab-next', function () {
	var $obj = $(this).closest('.tab-menu');
	var $tabList = $obj.find('.tab-list');
	var length = $tabList.children('li').length - 1;
	var prevIndex = $obj.find('li.on').index();

	if ($(this).hasClass('btn-tab-prev')) {
		if (prevIndex == 0) {
			currentIndex = length;
		} else {
			currentIndex = prevIndex - 1;
		}
	} else if ($(this).hasClass('btn-tab-next')) {
		if (prevIndex == length) {
			currentIndex = 0;
		} else {
			currentIndex = prevIndex + 1;
		}
	}

	$tabList.children('li').eq(currentIndex).children().click();
});

// 아코디언 목록
$(document).on('click', '.accordion-title a', function (e) {
	e.preventDefault();
	$(this).parent('.accordion-title').next('.accordion-content').slideToggle().siblings('.accordion-content').slideUp();
	$(this).parent('.accordion-title').toggleClass('on').siblings('.accordion-title').removeClass('on')
});

// 맨 위로
// (function toTop() {
// 	var $header = $('#header');

// 	$(window).scroll(function () {
// 		if ($(this).scrollTop() > 320) {
// 			$('#btn-totop').addClass('show');
// 			$header.addClass('bg-fadein')
// 		} else {
// 			$('#btn-totop').removeClass('show');
// 			$header.removeClass('bg-fadein');
// 		}
// 	});

// 	$(document).on('click', '#btn-totop', function (e) {
// 		e.preventDefault();
// 		$('body, html').animate({
// 			scrollTop: 0
// 		}, 300);
// 		return false;
// 	});
// })();

// 파일첨부 디자인
$(function () {
	var fileTarget = $('.form-file');
	fileTarget.on('change', function () {
		if (window.FileReader) {
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		$(this).next('.form-control').val(filename);
	});
});
$(document).on('click', '.input-group-file .form-control, .input-group-file .btn-file', function () {
	$(this).closest('.input-group-file').children('.form-file').click();
});

// 모달 레이어
$(function () {
	$('.modal-popup.show').each(function () {
		openModal($(this), null);
	});
});

var modalOpener = null;
$(document).on('click', 'a.js-layer-open', function (e) {
	var tg = $(this).attr('href');
	openModal(tg, $(this));
	e.preventDefault();
}).on('click', '.js-layer-close, .modal-popup .btn-close-popup', function () {
	var target = $(this).closest('.modal-popup').attr('id');
	closeModal('#' + target, modalOpener);
}).on('keydown', '.modal-popup .btn-close-popup', function (e) {
	if (e.keyCode == 9 && !e.shiftKey) { // tab
		e.preventDefault();
		$(this).siblings('.popup-header').attr('tabindex', '0').focus();
	}
}).on('keydown', '.modal-popup .popup-header', function (e) {
	if (e.keyCode == 9 && e.shiftKey) { // shift + tab
		e.preventDefault();
		$(this).siblings('.btn-close-popup').focus();
	}
});

function openModal(_target, _opener) {
	modalOpener = _opener;
	$(_target).addClass('show').removeClass('hide');
	setTimeout(function () {
		$('.popup-header', _target).attr('tabindex', '0').focus();
	}, 300);
	bodyScroll(true, $('body').width());
}

function closeModal(_target, _opener) {
	bodyScroll(false);
	var tg = null;

	if (_opener) {
		tg = $(_target);
		modalOpener = $(_opener);
	} else {
		tg = $('.modal-popup.show');
		modalOpener = null;
	}

	$(tg).addClass('hide').removeClass('show');
	if (modalOpener !== null) {
		modalOpener.focus();
		modalOpener = null;
	}
}

function bodyScroll(_status, _orgWidth) {
	var $fixedObj = $('body');
	if (_status) {
		$('body').addClass('modal-open');
		if ($('html').get(0).scrollWidth > $('html').width() === false) {
			$fixedObj.css('margin-right', $('body').width() - _orgWidth);
		}
	} else {
		$fixedObj.css('margin-right', '');
		$('body').removeClass('modal-open');
	}
}

// 윈도우 팝업 오픈
var popOpenBtn = null;

function openWindow(_obj, popName, w, h, _opener) {
	var popW = 850;
	var popH = 600;
	var myUrl = _obj;

	if (typeof _obj !== 'string') {
		if ($(_obj).prop('tagName') === 'A') {
			popOpenBtn = $(_obj);
			myUrl = $(_obj).attr('href');
		} else if (_opener) {
			popOpenBtn = $(_opener);
		}
	}

	if (w) popW = w;
	if (h) popH = h;
	var left = window.screenX + (window.outerWidth - popW) / 2;
	var top = window.screenY + (window.outerHeight - popH) / 2;
	window.open(myUrl, popName, 'width=' + popW + ', height=' + popH + ', left=' + left + ', top=' + top + ', scrollbars=yes');
}

function closeWindow() {
	if (window.opener != null) {
		window.opener.openerFocus();
	}
	window.close();
}

function openerFocus() {
	if (popOpenBtn != null) {
		$(popOpenBtn).focus();
		popOpenBtn = null;
	}
}