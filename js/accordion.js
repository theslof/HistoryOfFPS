$('.collapsible').on('click',function (e) {
    e.preventDefault();
    $(this).next().not(':animated').slideToggle();
});