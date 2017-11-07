var name, email;

var wishForm    = document.getElementById('wishForm');
var wishName    = document.getElementById('name');
var wishEmail   = document.getElementById('email');
var wishMessage = document.getElementById('wishMessage');

wishForm.addEventListener('submit', function (e) {
    e.preventDefault();
    name = wishName.value;
    email = wishEmail.value;

    wishMessage.textContent = 'Game was added to wish list for ' + name +
        ', a confirmation has been sent to ' + email + '!';
    $('wishMessage')
        .slideToggle();
    $(this)
        .not(':animated')
        .slideToggle();
    return false;
}, false);