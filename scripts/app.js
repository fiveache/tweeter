$(document).ready(() => {

  // Check if user is logged in by making an AJAX request and getting if there is a valid user!


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
  const createTweetElement = (data, isLoggedIn, likes) => {
    let htmlString = `
    <article class="tweet" data-id="${data._id}">
      <header class="clearfix">
        <img class="user-avatar" src="${data.user.avatars.small}" alt="${escape(data.user.name)}' Avatar">
        <h2>${escape(data.user.name)}</h2>
        <h3>${escape(data.user.handle)}</h3>
      </header>
      <p>${escape(data.content.text)}</p>
      <footer>
        <span class="created-at">
          ${Math.floor((Date.now() - new Date(data.created_at).getTime())/86400000)} Days Ago
        </span>`

    if (isLoggedIn) {
      htmlString = `${htmlString} <div class="tweet-icons"><span class="flag">🏳</span><span class="retweet">🎺</span><span class="like-count`;
      if(likes.includes(data._id)){
        htmlString = `${htmlString} user-liked-tweet`;
      }
      htmlString = `${htmlString}" data-ref="${data._id}">${data.likes || '0'} 👍 </span> </div>`;
    }
    htmlString = `${htmlString}</footer></article>`;

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
            const $tweet = createTweetElement(data.tweets[Object.keys(data.tweets).length - 1], data.isLoggedIn, data.likes);
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
    $('section.user-login').slideUp(150, () => {});
  });

  // Like button
  $('#tweet-container').on('click', '.like-count', function(e) {
    const _id = $(e.target).data('ref');
    let value = Number($(e.target).text().match(/\d/g).join(''));

    $.ajax({
      type: 'POST',
      url: `/tweets/like`,
      data: {
        id: _id
      }
    }).then((err, data, jqXHR) => {
      if (err) {
        console.log(err)
      }

      if (jqXHR.status === 201) {
        value++;
        $(e.target).text(`${value} 👍`);
        $(e.target).addClass('user-liked-tweet');

      }

      if (jqXHR.status === 204) {
        value--;
        $(e.target).text(`${value} 👍`);
        $(e.target).removeClass('user-liked-tweet');
      }

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
      Object.keys(data.tweets).forEach((tweet) => {
        prependTweet(createTweetElement(data.tweets[tweet], data.isLoggedIn, data.likes));
      });
    });

  $('.register-area #username').focus();

});
// end $(document).ready()
