/* 
	본 JS는 퍼블리싱 편의를 위해 
	중복되는 공통 레이아웃 영역을 로드할 목적으로 작성된 문서입니다.
	서버 언어로 레이아웃을 구성하게되면 오류를 유발하는 코드이오니
	Back-End 개발시 이 파일을 반드시 삭제해 주세요 :)
*/
$(function () {
	$('#header').load('../_guide/_inc-header.html', function () {
		if ($.isFunction(window.lnbSetting)) lnbSetting();
		// if ($.isFunction(window.allmenuScroll)) allmenuScroll();
		// if ($.isFunction(window.allmenuSetting)) allmenuSetting();
	});
	$('#breadcrumb').load('../_guide/_inc-breadcrumb.html', function () {
		// if ($.isFunction(window.breadcrumb)) breadcrumb();
	});
	// $('#content .popup-guide').load('../../../_global/html/include/_popup-guide.html');
	$('#footer').load('../_guide/_inc-footer.html', function () {
		if ($.isFunction(window.scrollbar)) scrollbar();
	});
});