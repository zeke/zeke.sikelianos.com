(function() {
  var Poesis;

  Poesis = (function() {
    function Poesis() {}

    Poesis.patterns = {
      hypertextual: new RegExp("@|#|https?:\/\/"),
      conversational: new RegExp("^@"),
      linky: new RegExp("https?:\/\/")
    };

    Poesis.get_tweets_per_day = function(user, cb) {
      var url;

      url = "https://api.twitter.com/1/users/show.json?screen_name=" + user + "&callback=?";
      return $.getJSON(url, function(user) {
        var days_count;

        days_count = ((new Date().getTime()) - (new Date(user.created_at).getTime())) / 1000 / 60 / 60 / 24;
        return cb(null, {
          tweets_per_day: Number((user.statuses_count / days_count).toFixed(1))
        });
      });
    };

    Poesis.get_scores = function(user, cb) {
      var url;

      url = "https://search.twitter.com/search.json?q=from%3a" + user + "&rpp=100&callback=?";
      return $.getJSON(url, function(res) {
        var key, result, scores, tweet, tweets, _i, _len, _ref;

        tweets = {};
        tweets.all = (function() {
          var _i, _len, _ref, _results;

          _ref = res.results;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            result = _ref[_i];
            _results.push(result.text);
          }
          return _results;
        })();
        tweets.poetic = (function() {
          var _i, _len, _ref, _results;

          _ref = tweets.all;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tweet = _ref[_i];
            if (!tweet.match(Poesis.patterns.hypertextual)) {
              _results.push(tweet);
            }
          }
          return _results;
        })();
        tweets.conversational = (function() {
          var _i, _len, _ref, _results;

          _ref = tweets.all;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tweet = _ref[_i];
            if (tweet.match(Poesis.patterns.conversational)) {
              _results.push(tweet);
            }
          }
          return _results;
        })();
        tweets.linky = (function() {
          var _i, _len, _ref, _results;

          _ref = tweets.all;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tweet = _ref[_i];
            if (tweet.match(Poesis.patterns.linky)) {
              _results.push(tweet);
            }
          }
          return _results;
        })();
        scores = {};
        _ref = Object.keys(tweets);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          if (key !== 'all') {
            scores[key] = parseInt(tweets[key].length / tweets.all.length * 100);
          }
        }
        return cb(null, {
          scores: scores,
          tweets: tweets
        });
      });
    };

    return Poesis;

  })();

  window.Poesis = Poesis;

  $(function() {
    var url_query;

    $('#user').on('change', function(event) {
      var user;

      user = $(this).val();
      Poesis.get_scores(user, function(err, results) {
        if (err) {
          return console.log(err);
        }
        return $('#results').text(JSON.stringify(results, null, 2));
      });
      return Poesis.get_tweets_per_day(user, function(err, results) {
        if (err) {
          return console.log(err);
        }
        return $('#results2').text(JSON.stringify(results, null, 2));
      });
    });
    url_query = location.href.match(new RegExp("=(\\w+)"));
    if (url_query) {
      return $('#user').val(url_query[1]).trigger('change');
    }
  });

}).call(this);
