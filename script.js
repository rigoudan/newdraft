
jQuery(function () {
    var _didInit = false;
	var _pid = null;
	function cache_data() {
		var txt = document.getElementById('wiki__text').value;
		// upload via AJAX
		jQuery.ajax({
			url: DOKU_BASE + 'lib/exe/ajax.php',
			type: 'POST',
			async: true,
			data: {
                call: 'plugin_newdraft',
                data: txt,
                id: JSINFO.id
            },
			success: function (data) {},
			error: function (xhr, status, error) {}
		});
	}
    function init() {
		if(_pid != null) {
			clearInterval(_pid);
			_pid = null;
		}
        if (!jQuery('#wiki__text').length || _didInit) {return;}
        _didInit = true;
		_pid = setInterval(cache_data, 5000);
    }

    init();

    // fastwiki plugin support
    jQuery(window).on('fastwiki:afterSwitch', function(evt, viewMode, isSectionEdit, prevViewMode) {
        if (viewMode == 'edit' || isSectionEdit) {
            init();
        }
    });
});
