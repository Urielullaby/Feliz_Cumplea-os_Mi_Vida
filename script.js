$(document).ready(function(){

  // si tienes cortinas (no afectan aquí, pero lo mantengo)
  $('.left-curtain').css('width', '0%');
  $('.right-curtain').css('width', '0%');

  // click en sobre -> desaparecer sobre y mostrar el libro centrado
  $('.valentines-day').click(function(){
    $('.envelope').css({'animation':'fall 3s linear 1', '-webkit-animation':'fall 3s linear 1'});
    $('.envelope').fadeOut(800, function() {
      $('.valentines-day .heart, .valentines-day .text, .valentines-day .front').hide();

      // mostramos #book (no #card)
   $('#book').css({
  'visibility': 'visible',
  'opacity': 0,
  'transform': 'translate(-50%, -50%) scale(0.6)'
});

setTimeout(function(){
  $('#book').css({
    'transition': 'transform 600ms ease, opacity 600ms',
    'opacity': 1,
    'transform': 'translate(-50%, -50%) scale(1)'
  });
}, 50);

    });
  });

  // --- inicializar apilado (z-index) de las páginas para que la primera esté arriba ---
  const pages = $('.page');
  pages.each(function(i){
    // ponemos la primera página con mayor z-index
    $(this).css('z-index', pages.length - i);
  });

  // manejar el flip de cada página (todo dentro de ready)
  pages.click(function(){
    const $p = $(this);

    // Si la página ya está volteada, la volvemos; si no, la volteamos
    $p.toggleClass('flipped');

    if ($p.hasClass('flipped')) {
      // después de voltear, la mandamos detrás (espera a que termine la transición)
      setTimeout(function(){
        $p.css('z-index', 0);
        $p.css('pointer-events', 'none'); // evitar que al estar atrás interfiera
      }, 900); // igual al tiempo de transición
    } else {
      // la traemos al frente
      $p.css('z-index', pages.length);
      $p.css('pointer-events', 'auto');
    }
  });

  function resetBook() {
  const pages = $('.page');

  pages.removeClass('flipped'); // quitar estado volteado
  pages.css({
    'z-index': '',              // restaurar z-index original
    'pointer-events': 'auto'    // volver a permitir clicks
  });

  // reordenar z-index para que la primera esté arriba
  pages.each(function(i){
    $(this).css('z-index', pages.length - i);
  });
}
$('#restart-btn').click(function(e){
  e.stopPropagation(); // que no dispare flip
  resetBook();
});

}); // end ready
