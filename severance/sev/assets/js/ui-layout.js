// 레이아웃 제어 스크립트

// 다국어 드롭다운
$(document).on('mouseenter', '.top-menu .language-dropdown', function () {
	$('.language-dropdown').addClass('hover');
}).on('mouseleave', '.top-menu .language-dropdown', function () {
	$('.top-menu .language-dropdown').removeClass('hover');
}).on('focus', '.top-menu .language-dropdown .btn', function () {
	$('.top-menu .language-dropdown').addClass('hover');
}).on('keydown', '.top-menu .language-dropdown .btn', function (e) {
	if (e.keyCode == 9 && e.shiftKey) {
		$('.top-menu .language-dropdown').removeClass('hover');
	}
}).on('keydown', '.language-list>li:last-child>a', function (e) {
	if (e.keyCode == 9 && !e.shiftKey) {
		$('.top-menu .language-dropdown').removeClass('hover');
	}
});

$(document).on('click', '.btn-open-language, .btn-close-language', function () {
	$('#language-list').toggle();
})


// 통합검색
$(document).on('click', '.btn-global-search, .btn-search-close', function (e) {
	e.preventDefault();
	$('#global-search').slideToggle('fast');
	lnbClose();
}).on('click', '.btn-search-close', function (e) {
	$('.btn-global-search').focus();
});
$(document).one('click', '.btn-global-search', function (e) {
	$('.keyword-list').slick({
		infinite: false,
		variableWidth: true,
		slidesToShow: 4,
		slidesToScroll: 2,
		arrows: true,
		dots: false
	});
});

// 전체메뉴 및 LNB 세팅
lnbSetting();

function lnbSetting() {
	$('.lnb-list ul ul, .pc-allmenu .allmenu-list ul ul ul, .mobile-allmenu .allmenu-list ul').each(function () {
		$(this).parent('li').addClass('collapse');
	});
	$('.lnb-list li.on>ul, .allmenu-list li.on>ul').each(function () {
		$(this).show();
	});
}
$(document).on('click', '.lnb-list .collapse > a, .allmenu-list .collapse > a', function (e) {
	e.preventDefault();
	$(this).next('ul').slideToggle('fast').parent('li').toggleClass('on');
});

// GNB
gnbControl();

function gnbControl() {
	var gnbTimer,
		_openTerm = 500,
		eventCount = 0;
	$('#gnb').find('a').first().addClass('fisrt');
	$('#gnb').find('a').last().addClass('last');
	$(document).on('click', '#gnb .gnb-list>li>a', function () {
		if ($(this).parent('li').hasClass('active')) {
			lnbClose($(this).next('.lnb-area'));
		} else {
			lnbOpen($(this).parent('li'));
		}
	}).on('click', '.btn-lnb-close', function () {
		lnbClose($(this).closest('.lnb-area'));
	});
};

function lnbOpen(lnb) {
	$(lnb).addClass('active').siblings().removeClass('active');
	$('body').addClass('lnb-open');
	$('#global-search').slideUp('fast');
}

function lnbClose(lnb) {
	$('#gnb .gnb-list>li').removeClass('active');
	$('body').removeClass('lnb-open');
	if (lnb != undefined) {
		$(lnb).prev('a').focus();
	}
}

// 전체메뉴
$(document).on('click', '.btn-allmenu-open', function (e) {
	allmenuOpen();
}).on('click', '.btn-allmenu-close', function (e) {
	allmenuClose();
}).on('keydown', '.btn-allmenu-close', function (e) {
	if ($(this).hasClass('.hide')) {
		if (e.keyCode == 9 && e.shiftKey) {
			$('.language-dropdown').removeClass('hover');
		}
	}
});

function allmenuOpen() {
	$('body').addClass('allmenu-open');
	$('#allmenu').scrollTop(0);
	$('.allmenu-body').scrollTop(0);
	$('.mobile-allmenu li.on').removeClass('on');
	$('.mobile-allmenu ul').removeAttr('style');
}

function allmenuClose() {
	$('body').removeClass('allmenu-open');
	$('.btn-allmenu-open').focus();
}

// Breadcrumb
$(document).on('click', '.breadcrumb-list>li>a', function (e) {
	if ($(this).next('ul').length) {
		e.preventDefault();
		$(this).parent('li').toggleClass('on').siblings('li').removeClass('on');
	}
}).on('keydown', '.breadcrumb-list ul>li:last-child>a', function (e) {
	if (e.keyCode == 9 && !e.shiftKey) {
		$('.breadcrumb-list>li').removeClass('on');
	}
});

// 화면 확대 축소
var scale = 1;
$(document).on('click', '.util-menu .btn', function () {
	if ($(this).hasClass('btn-zoom-in')) {
		scale += 0.1;
		$('body').attr('style', 'transform : scale(' + scale + ')');
	} else if ($(this).hasClass('btn-zoom-out')) {
		scale -= 0.1;
		$('body').attr('style', 'transform : scale(' + scale + ')');
	} else if ($(this).hasClass('btn-print')) {
		print();
	}
});

// 푸터 
// 패밀리사이트
$(document).on('click', '.familysite-list > li > a:not([target=_blank])', function (e) {
	e.preventDefault();
	$(this).parent().toggleClass('active').siblings().removeClass('active');
	$('.shortcut-link .btn-toggle').removeClass('on');
});

// 바로가기
$(document).on('click', '.shortcut-link .btn-toggle', function (e) {
	e.preventDefault();
	$(this).toggleClass('on').siblings('.btn-toggle').removeClass('on');
	$('.familysite-list > li').removeClass('active');
}).on('click', '.btn-shortcut-close', function (e) {
	$(this).closest('.shortcut-content').prev('.btn-toggle').removeClass('on').focus();
});