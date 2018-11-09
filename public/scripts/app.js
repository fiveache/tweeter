$(document).ready(() => {

  /*
   * =======================
   * HELPER FUNCTIONS
   * =======================
   */

  // Escape characters for malicious html injected.
  const escape = (string) => {
    const newString = string
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return newString;
  };

  // Creates a string of HTML that is the "tweet"
  const createTweetElement = (data) => {
    const htmlString = `
    <article class="tweet">
      <header class="clearfix">
        <img class="user-avatar" src="${data.user.avatars.small}" alt="${escape(data.user.name)}' Avatar">
        <h2>${escape(data.user.name)}</h2>
        <h3>${escape(data.user.handle)}</h3>
      </header>
      <p>${escape(data.content.text)}</p>
      <footer>
        <span class="created-at">
          ${Math.floor((Date.now() - new Date(data.created_at).getTime())/86400000)} Days Ago
        </span>
        <div class="tweet-icons">👍 🎺 💛</div>
      </footer>
    </article>
    `;
    return htmlString;
  };

  // Returns a function that loads all tweets
  const loadTweets = () => $.ajax({
    type: 'GET',
    url: '/tweets',
  });

  // Appends the HTML to the tweet container
  const appendTweet = (tweetHtml) => {
    $('#tweet-container').append(tweetHtml);
  };

  // Appends the HTML to the tweet container
  const prependTweet = (tweetHtml) => {
    $('#tweet-container').prepend(tweetHtml);
  };


  /*
   * =======================
   * EVENT HANDLERS
   * =======================
   */

  // handle submit event

  $('.new-tweet form').on('submit', function(e) {
    e.preventDefault();
    const queryResults = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: '/tweets',
        data: queryResults,
      })
      .then((data) => {
        $('.new-tweet form textarea').val('').trigger('input');
        loadTweets()
          .then((data) => {
            const $tweet = createTweetElement(data[Object.keys(data).length - 1]);
            prependTweet($tweet);
          })
      });
  });
  // end $('.new-tweet form').on('submit');

  // LOGIN AND COMPOSE BUTTONS:
  $('span.compose-button').click((e) => {
    $('section.new-tweet').slideToggle(300, () => {
      $('section.new-tweet textarea ').focus();
    });
  });

  $('span.login-button').click((e) => {
    $('section.user-login').slideToggle(150, () => {
      $('.user-login #username').focus();
    });
    $('section.user-register').slideUp(150, () => {});
  });

  $('input.register-button').click((e) => {
    $('section.user-register').slideToggle(150, () => {
      $('.user-login #username').focus();
    });
    $('section.user-login').slideUp(150, () => {
    });
  });

  /*
   * =======================
   * Implementation
   * =======================
   */

  // On load, gather tweets and display them.
  loadTweets()
    .then((data) => {
      Object.keys(data).forEach((tweet) => {
        prependTweet(createTweetElement(data[tweet]));
      });
    });

    $('.register-area #username').focus();

});
// end $(document).ready()
