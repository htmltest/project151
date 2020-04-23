j(document).ready(function() {

    j('.opendata-block-title').click(function() {
        j(this).parent().toggleClass('open');
    });

    j('.opendata-group-title').click(function() {
        j(this).parent().toggleClass('open');
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