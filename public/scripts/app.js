$(document).ready(() => {
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

  const tweetData = {
    user: {
      name: 'Newton',
      avatars: {
        small: 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png',
        regular: 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png',
        large: 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png',
      },
      handle: '@SirIsaac',
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  };

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

  // Build out sample tweet
  const $tweet = createTweetElement(tweetData);
  $('#tweet-container').append($tweet);

  // handle submit event

  $('.new-tweet form').on('submit', function(e) {
    e.preventDefault();
    const queryResults = $(this).serialize();
    const options = {
      type: 'POST',
      url: '/tweets',
      data: queryResults,
    };

    $.ajax(options)
      .then((data) => {
        $('.new-tweet form textarea').val('');
      });

  });
  // end $('.new-tweet form').on('submit');
});
// end $(document).ready()
