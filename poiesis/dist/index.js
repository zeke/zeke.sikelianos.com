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
        var days;

        days = (Date.now() - new Date(user.created_at)) / 1000 / 60 / 60 / 24;
        user.tweets_per_day = Number((user.statuses_count / days).toFixed(1));
        return cb(null, user);
      });
    };

    Poesis.get_scores = function(user, cb) {
      var url;

      url = "https://api.twitter.com/1/statuses/user_timeline/" + user + ".json?count=1000&callback=?";
      return $.getJSON(url, function(tweets) {
        var counts, daily_averages, days, percentages, tweet;

        counts = {
          all: tweets.length,
          poetic: ((function() {
            var _i, _len, _results;

            _results = [];
            for (_i = 0, _len = tweets.length; _i < _len; _i++) {
              tweet = tweets[_i];
              if (!tweet.text.match(Poesis.patterns.hypertextual)) {
                _results.push(tweet);
              }
            }
            return _results;
          })()).length,
          conversational: ((function() {
            var _i, _len, _results;

            _results = [];
            for (_i = 0, _len = tweets.length; _i < _len; _i++) {
              tweet = tweets[_i];
              if (tweet.text.match(Poesis.patterns.conversational)) {
                _results.push(tweet);
              }
            }
            return _results;
          })()).length,
          linky: ((function() {
            var _i, _len, _results;

            _results = [];
            for (_i = 0, _len = tweets.length; _i < _len; _i++) {
              tweet = tweets[_i];
              if (tweet.text.match(Poesis.patterns.linky)) {
                _results.push(tweet);
              }
            }
            return _results;
          })()).length
        };
        counts.nonconversational = counts.all - counts.conversational;
        percentages = {
          poetic: parseInt(counts.poetic / counts.nonconversational * 100),
          conversational: parseInt(counts.conversational / counts.all * 100),
          nonconversational: parseInt(counts.nonconversational / counts.all * 100),
          linky: parseInt(counts.linky / counts.all * 100)
        };
        days = (Date.now() - new Date(tweets[tweets.length - 1].created_at)) / 1000 / 60 / 60 / 24;
        daily_averages = {
          all: Number((counts.all / days).toFixed(1)),
          poetic: Number((counts.poetic / days).toFixed(1)),
          conversational: Number((counts.conversational / days).toFixed(1)),
          nonconversational: Number((counts.nonconversational / days).toFixed(1))
        };
        return cb(null, {
          counts: counts,
          percentages: percentages,
          daily_averages: daily_averages
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
      return Poesis.get_scores(user, function(err, results) {
        if (err) {
          return console.log(err);
        }
        return $('#results').text(JSON.stringify(results, null, 2));
      });
    });
    url_query = location.href.match(new RegExp("=(\\w+)"));
    if (url_query) {
      return $('#user').val(url_query[1]).trigger('change');
    }
  });

}).call(this);
