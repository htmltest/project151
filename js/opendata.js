j(document).ready(function() {

    j('.opendata-block-title').click(function() {
        j(this).parent().toggleClass('open');
    });

    j('.opendata-group-title').click(function() {
        var curGroup = j(this).parent();
        curGroup.toggleClass('open');
        if (curGroup.hasClass('open')) {
            var curContainer = curGroup.find('.opendata-group-container');
            if (curContainer.attr('data-link')) {
                curContainer.addClass('loading');
                j.ajax({
                    type: 'GET',
                    url: curContainer.attr('data-link'),
                    dataType: 'html',
                    cache: false
                }).done(function(html) {
                    curContainer.html(html);
                    curContainer.removeClass('loading');
                });
                curContainer.removeAttr('data-link');
            }
        }
    });

    j('.opendata-filter-item-current').click(function() {
        var curSelect = j(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            j('.opendata-filter-item.open').removeClass('open');
            curSelect.addClass('open');
        }
    });

    j(document).click(function(e) {
        if (j(e.target).parents().filter('.opendata-filter-item').length == 0) {
            j('.opendata-filter-item.open').removeClass('open');
        }
    });

    j('.opendata-filter-item-list input').change(function() {
        var curSelect = j(this).parents().filter('.opendata-filter-item');
        curSelect.find('.opendata-filter-item-current').removeClass('default').html(curSelect.find('.opendata-filter-item-list input:checked').parent().find('span').html());

        var curResults = curSelect.parents().filter('.opendata-group-container');
        var curForm = curResults.find('.opendata-filter form');
        var allSelected = true;
        curForm.find('.opendata-filter-item').each(function() {
            if (j(this).find('.opendata-filter-item-list input:checked').length == 0) {
                allSelected = false;
            }
        });
        if (allSelected) {
            curResults.find('.opendata-results').addClass('loading');
            var formData = curForm.serialize();

            j.ajax({
                type: 'GET',
                url: curForm.attr('action'),
                dataType: 'html',
                data: formData,
                cache: false
            }).done(function(html) {
                curResults.find('.opendata-results').html(html);
                curResults.find('.opendata-results').removeClass('loading');
            });
        }
    });

    j('.opendata-filter-item-list label').click(function() {
        j('.opendata-filter-item.open').removeClass('open');
    });

    j('.opendata-filter-item').each(function() {
        var curSelect = j(this);
        if (curSelect.find('.opendata-filter-item-list input:checked').length == 1) {
            curSelect.find('.opendata-filter-item-current').removeClass('default').html(curSelect.find('.opendata-filter-item-list input:checked').parent().find('span').html());
        } else {
            curSelect.find('.opendata-filter-item-current').addClass('default').html(curSelect.find('.opendata-filter-item-current').attr('data-placeholder'));
        }
    });

});

j(window).on('load', function() {
    if (window.location.hash != '') {
        var curContainer = j(window.location.hash);
        if (curContainer.length == 1) {
            var curGroup = curContainer.parent();
            var curBlock = curGroup.parent().parent();
            var blockTransition = curBlock.find('.opendata-block-container').eq(0).css('transition');
            var groupTransition = curBlock.find('.opendata-group-container').eq(0).css('transition');
            curBlock.find('.opendata-block-container').css('transition', 'none');
            curGroup.find('.opendata-group-container').css('transition', 'none');
            curGroup.removeClass('open');
            curGroup.find('.opendata-group-title').trigger('click');
            curBlock.removeClass('open');
            curBlock.find('.opendata-block-title').trigger('click');
            j('html, body').animate({'scrollTop': curGroup.offset().top});
            curBlock.find('.opendata-block-container').css('transition', blockTransition);
            curGroup.find('.opendata-group-container').css('transition', groupTransition);
        }
    }
});

j(window).on('load resize', function() {
    j('.opendata-table').each(function() {
        if (j(window).width() < 1025) {
            j(this).mCustomScrollbar({
                axis: 'x',
                scrollButtons: {
                    enable: true
                }
            });
        } else {
            j(this).mCustomScrollbar('destroy');
        }
    });
});