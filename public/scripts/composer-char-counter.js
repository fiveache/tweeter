$(document).ready(() => {
  const maxLength = 140;
  const counter = $('section.new-tweet textarea').siblings().filter('.counter');
  counter.text(maxLength);

  const inputButton = $('.new-tweet form input');
  inputButton.attr('disabled', 'disabled');

  const warningArea = $('section span.warning-message');

  $('section.new-tweet textarea').on('input change ', (e) => {
    const counterVal = maxLength - e.target.value.length;
    counter.text(counterVal);
    if (counterVal < 0) {
      counter.css('color', 'red');
      inputButton.attr('disabled', 'disabled');
      warningArea.html('Your tweet is too long!');
    } else if (counterVal === maxLength) {
      counter.css('color', 'inherit');
      inputButton.attr('disabled', 'disabled');
      warningArea.html('What do you have to say?');
    } else {
      counter.css('color', 'inherit');
      inputButton.removeAttr('disabled');
      warningArea.html('');
    }
  });
  // end $('section.new-tweet textarea').on
});
// end $(document).ready
