$(document).ready(() => {
  $('section.new-tweet textarea').on('input', (e) => {
    const counter = $('section.new-tweet textarea').siblings().filter('.counter');
    const counterVal = 140 - e.target.value.length;
    counter.text(counterVal);
    counterVal < 0 ? counter.css('color', 'red') : counter.css('color', 'inherit');
  });
  // end $('section.new-tweet textarea').keyup
});
// end $(document).ready
