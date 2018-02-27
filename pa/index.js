$(function () {
    var pageNumber = 0;

    function loading(value) {
        var page = $('#middle').text();
        $.ajax({
            url: 'http://localhost:8080/',
            type: 'POST',
            dataType: 'jsonp',
            jsonp: 'callbackParam',
            jsonpCallback: 'callbackFunction',
            data: {
                index: page,
                url: value
                // url: 'http://book.zongheng.com/chapter/566594/32787907.html'
            },
            success: function (data) {
                pageNumber = data.num;
                if (data.data.length !== 0) {
                    data.data.forEach(function (item) {
                        var html = '<tr class="new"><td class="link"><a href="' + item.link + '">' + item.title + '</a></td>' + '<td>' + item.word + '</td>' + '<td>' + item.chinese + '</td>' + '<td>' + item.english + '</td>' + '<td>' + item.symbol + '</td></tr>';
                        $('table').append(html);
                    });
                }
            },
            error: function (err) {
                console.log(err)
            }
        });
    };
    $('#left').click(function () {
        var middle = $('#middle').text();
        if (middle <= 1) {
            return false;
        } else {
            $('.new').remove();
            $('#middle').text(Number(middle) - 1);
            loading();
        }
    });
    $('#right').click(function () {
        var middle = $('#middle').text();
        if (middle >= pageNumber / 3) {
            return false;
        } else {
            $('.new').remove();
            $('#middle').text(Number(middle) + 1);
            loading();
        }
    });
    $('#add').click(function () {
        // var page = $('#middle').text();
        var value = $('[type=text]').val();
        $('.new').remove();
        loading(value);
        alert('insert success');
        $('input').val('');
    });
    loading();
});