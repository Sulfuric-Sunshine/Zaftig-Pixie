var twitterCallBackURL = process.env.OAUTH_TWITTER_CALLBACK_URI || 'http://127.0.0.1:3000/auth/twitter/callback';

module.exports = {

  //modularizing this. once facebook is in, adding Twitter should be a cinch.
  'facebookAuth': {
    'clientID': '1666396103573629',
    'clientSecret': '21352511ea81f083bc803c46f7398c6e',
    'callbackURL': 'http://localhost:3000/auth/facebook/callback'
  },

  'twitterAuth': {
    'consumerKey': '62M6VKUW3NwAWoniM9V5raPRx',
    'consumerSecret': 'hZgqQOKe2OMJtcvg5L34zHcXzsTblToFCPHHcPCA6OpWqUs9sT',
    'callbackURL': twitterCallBackURL
  }
};