$(document).ready(() => {
  const maxLength = 140;
  const counter = $('section.new-tweet textarea').siblings().filter('.counter');
  counter.text(maxLength);

  const inputButton = $('.new-tweet form input');
  inputButton.attr('disabled', 'disabled');

  $('section.new-tweet textarea').on('input', (e) => {
    const counterVal = maxLength - e.target.value.length;
    counter.text(counterVal);
    if (counterVal < 0) {
      counter.css('color', 'red');
      inputButton.attr('disabled', 'disabled');
    } else if (counterVal === maxLength) {
      counter.css('color', 'inherit');
      inputButton.attr('disabled', 'disabled');
    } else {
      counter.css('color', 'inherit');
      inputButton.removeAttr('disabled');
    }
  });
  // end $('section.new-tweet textarea').keyup
});
// end $(document).ready
