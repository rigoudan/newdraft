
jQuery(function () {
    var _didInit = false;
	var _pid = null;
	var _period = 5000;
	function cache_data() {
		var txt = document.getElementById('wiki__text').value;
		// upload via AJAX
		jQuery.ajax({
			url: DOKU_BASE + 'lib/exe/ajax.php',
			type: 'POST',
			async: true,
			data: {
                call: 'plugin_newdraft',
				state: 'ing',
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
		
		jQuery.ajax({
			url: DOKU_BASE + 'lib/exe/ajax.php',
			type: 'POST',
			async: false,
			data: {
                call: 'plugin_newdraft',
				state: 'init',
                data: '0',
                id: JSINFO.id
            },
			success: function (data) {
				_period = parseInt(data.period);
			},
			error: function (xhr, status, error) {}
		});
		
		_pid = setInterval(cache_data, _period);
		//alert(_period);
    }

    init();

    // fastwiki plugin support
    jQuery(window).on('fastwiki:afterSwitch', function(evt, viewMode, isSectionEdit, prevViewMode) {
        if (viewMode == 'edit' || isSectionEdit) {
            init();
        }
    });
});
