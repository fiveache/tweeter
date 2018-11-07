$(document).ready(() => {
  const inputButton = $('.new-tweet form input');
  inputButton.attr('disabled', 'disabled');
  $('section.new-tweet textarea').on('input', (e) => {
    const counter = $('section.new-tweet textarea').siblings().filter('.counter');
    const counterVal = 140 - e.target.value.length;
    counter.text(counterVal);
    if (counterVal < 0) {
      counter.css('color', 'red');
      inputButton.attr('disabled', 'disabled');
    } else if (counterVal === 140) {
      inputButton.attr('disabled', 'disabled');
    } else {
      counter.css('color', 'inherit');
      inputButton.removeAttr('disabled');
    }
  });
  // end $('section.new-tweet textarea').keyup
});
// end $(document).ready
