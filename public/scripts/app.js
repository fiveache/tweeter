$(document).ready(() => {
  const escapeCharacters = (string) => {
    const newString = string.replace(/\'/g, '&#39;').replace(/\"/g, '&quot;').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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
        <img class="user-avatar" src="${data.user.avatars.small}" alt="${data.user.name}' Avatar">
        <h2>${data.user.name}</h2>
        <h3>${data.user.handle}</h3>
      </header>
      <p>${escapeCharacters(data.content.text)}</p>
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

  const $tweet = createTweetElement(tweetData);
  $('#tweet-container').append($tweet);
});
// end $(document).ready()
