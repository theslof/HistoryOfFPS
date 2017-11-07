$(function () {
    $.ajax({
        beforeSend: function (xhr) {
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("application/json");
            }
        }
    });

    function loadGameData() {
        $.getJSON('data/gameInfo.json')
            .done(function (data) {
                var chapters = ['ch1', 'ch2', 'ch3', 'ch4'];
                for (var i in chapters) {
                    var ch = chapters[i];
                    buildChapter(ch, data[ch]);
                }
            }).fail(function () {
            $('#event').html('Sorry! Error while fetching data');
        });
    }

    loadGameData();
});

function buildChapter(chapter, data) {
    var section = document.getElementById(chapter);

    for (var item in data) {
        var article = document.createElement('article');
        article.className = 'grid-50 mobile-grid-100 tablet-grid-50 game_item';
        section.appendChild(article);

        var a = document.createElement('a');
        a.className = 'big';
        a.setAttribute('href', 'info.html?ch=' + chapter + '&id=' + item);
        article.appendChild(a);

        var h3Title = document.createElement('h3');
        h3Title.className = 'title';
        h3Title.textContent = data[item]['title'];
        a.appendChild(h3Title);

        var splash = document.createElement('img');
        splash.className = 'splash';
        splash.setAttribute('src', data[item]['splash']);
        splash.setAttribute('alt', data[item]['title']);
        a.appendChild(splash);

        var h3Year = document.createElement('h3');
        h3Year.className = 'year';
        h3Year.textContent = data[item]['year'];
        a.appendChild(h3Year);

        var p = document.createElement('p');
        p.className = 'spot clearfix';
        p.textContent = data[item]['spot'];
        article.appendChild(p);
    }
}