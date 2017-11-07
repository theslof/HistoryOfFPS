var gameID;
var chapter;

$(function () {
    chapter = url('?ch');
    gameID = url('?id');

    var score;
    var elTitle = document.getElementById('titleName');
    var elCover = document.getElementById('cover');
    var elDeveloper = document.getElementById('developer');
    var elYear = document.getElementById('year');
    var elSummary = document.getElementById('summary');
    var elFeatures = document.getElementById('features');

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
                var gameData = data[chapter][gameID];
                elTitle.textContent = gameData['title'];
                elCover.src = gameData['cover'];
                elDeveloper.textContent = gameData['developer'];
                elYear.textContent = gameData['year'];
                elSummary.textContent = gameData['summary'];
                var jFeatures = gameData['features'];
                if (jFeatures.length > 0) {
                    for (var i = 0; i < jFeatures.length; i++) {
                        var li = document.createElement('li');
                        elFeatures.appendChild(li);
                        li.textContent = jFeatures[i];
                    }
                } else {
                    $('#features').hide();
                    $('#featHead').hide();
                }
            }).fail(function () {
            $('#event').html('Sorry! Error while fetching data for ID ' + gameID);
        });
        score = localStorage.getItem(gameID + '_score');
    }

    loadGameData();
    if (score !== undefined) {
        getScore(score);
    }
});

function getScore(newScore) {
    var star = 'gold';
    for (var i = 1; i <= 5; i++) {
        star = (i <= newScore) ? 'gold' : 'empty';
        document.getElementById('star' + i).setAttribute('src', 'img/star_' + star + '.svg');
    }
}

function setScore(newScore) {
    getScore(newScore);
    if (gameID !== undefined)
        localStorage.setItem(gameID + '_score', newScore);
}
