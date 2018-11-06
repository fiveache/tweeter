$(document).ready(() => {
  // Using jQuery and an appropriate selector, register an event handler to the textarea element for the form inside of the .new-tweet section.
  $('section.new-tweet textarea').keyup((e) => {
    const counter = $('section.new-tweet textarea').siblings().filter('.counter');
    const counterVal = 140 - e.target.value.length;
    counter.text(counterVal);
    counterVal < 0 ? counter.css('color', 'red') : counter.css('color', 'inherit');
  });
  // end $('section.new-tweet textarea').keyup
});
// end $(document).ready
