$(document).ready(() => {

  /*
   * =======================
   * HELPER FUNCTIONS
   * =======================
   */

  // Escape characters for malicious html injected.
  const escape = (string) => {
    const newString = string
      .replace(/\'/g, '&#39;')
      .replace(/\"/g, '&quot;')
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
        $('.new-tweet form textarea').val('');
        loadTweets()
          .then((data) => {
            const $tweet = createTweetElement(data[Object.keys(data).length - 1]);
            appendTweet($tweet);
          })
      });
  });
  // end $('.new-tweet form').on('submit');

  /*
   * =======================
   * Implementation
   * =======================
   */

  // On load, gather tweets and display them.
  loadTweets()
    .then((data) => {
      Object.keys(data).forEach((tweet) => {
        appendTweet(createTweetElement(data[tweet]));
      });
    });

});
// end $(document).ready()
