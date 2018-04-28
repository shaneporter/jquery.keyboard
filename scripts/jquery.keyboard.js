$.fn.attachKeyboard = function(options) {

    var defaults = {
        iconLocation: 'img/keyboard_key.png',
        topOffset : -42,
        leftOffset : 20
    };

    var opts = $.extend(defaults, options);

    return this.each(function() {

        // assignments:
        var input = $(this);
        var keyboardMarkup = '<img src="' + opts.iconLocation + '" class="keyboard_trigger" alt="Toggle Keyboard" /><div class="keyboard" style="display:none;position:absolute;"><div class="keys"><a href="#">q</a><a href="#">w</a><a href="#">e</a><a href="#">r</a><a href="#">t</a><a href="#">y</a><a href="#">u</a><a href="#">i</a><a href="#">o</a><a href="#">p</a></div><div class="keys mid"><a href="#">a</a><a href="#">s</a><a href="#">d</a><a href="#">f</a><a href="#">g</a><a href="#">h</a><a href="#">j</a><a href="#">k</a><a href="#">l</a></div><div class="keys"><a href="#" class="shift">&uarr;</a><a href="#">z</a><a href="#">x</a><a href="#">c</a><a href="#">v</a><a href="#">b</a><a href="#">n</a><a href="#">m</a><a href="#" class="backspace">&larr;</a></div><div class="keys hidden"><a href="#">1</a><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a><a href="#">6</a><a href="#">7</a><a href="#">8</a><a href="#">9</a><a href="#">0</a></div><div class="keys hidden"><a href="#">!</a><a href="#">"</a><a href="#">£</a><a href="#">$</a><a href="#">%</a><a href="#">^</a><a href="#">&</a><a href="#">*</a><a href="#">(</a><a href="#">)</a></div><div class="keys bottom hidden"><a href="#">,</a><a href="#">.</a><a href="#">/</a><a href="#">;</a><a href="#">\'</a><a href="#">#</a><a href="#">?</a><a href="#" class="backspace">&larr;</a></div><div class="keys control"><a class="characterset" href="#">.?123</a><a class="space" href="#">space</a><a class="select" href="#">close</a></div></div>';

        $(input).after(keyboardMarkup);

        var trigger = $(input).next();
        var keyboard = $(input).next().next();

        // trigger click event:
        $(trigger).click(function() {
            $(keyboard).css({
                'top': $(this).offset().top + opts.topOffset,
                'left': $(this).offset().left + opts.leftOffset
            });
            $(keyboard).toggle();
        });

        // bind keyboard characters:        
        $(keyboard).find('a:not(.shift,.backspace,.characterset,.space,.select)').bind('click', function(e) {
            $(input).val($(input).val() + $(this).text());
            e.preventDefault();
        });

        // space bar:
        $(keyboard).find('a.space').bind('click', function(e) {
            $(input).val($(input).val() + ' ');
            e.preventDefault();
        });

        // backspace:            
        $(keyboard).find('a.backspace').bind('click', function(e) {
            var currentValue = $(input).val();

            if (currentValue.length == 0)
                return false;

            $(input).val(currentValue.substr(0, currentValue.length - 1));

            e.preventDefault();
        });

        // shift key:
        $(keyboard).find('a.shift').click(function(e) {

            var isInverse = $(this).hasClass('inverse');

            $(keyboard).find('a:not(.shift,.backspace,.characterset,.space,.select)').each(function() {
                $(this).text($(this).text()[isInverse ? 'toLowerCase' : 'toUpperCase']());
            });

            $(this).toggleClass('inverse');

            e.preventDefault();
        });

        // character set shift:
        $(keyboard).find('a.characterset').click(function(e) {
            var areCharactersShown = $(this).hasClass('charactersShown');

            $(keyboard).find('div:not(.control)').toggleClass('hidden');
            $(this).text(areCharactersShown ? 'abc' : '.?123');

            $(this).toggleClass('charactersShown');

            e.preventDefault();
        });

        // close:
        $(keyboard).find('a.select').bind('click', function(e) {
            $(keyboard).hide();
            e.preventDefault();
        });

        // document click function:
        $(document).bind('click', function(e) {

            var $clicked = $(e.target); // get the element clicked

            if (!$clicked.is('.keyboard') && !$clicked.parents().is('.keyboard') && !$clicked.is('.keyboard_trigger')) {
                $(keyboard).hide();
            }
        });
    });
};