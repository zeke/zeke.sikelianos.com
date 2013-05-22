class Poesis

  @patterns:
    hypertextual: new RegExp("@|#|https?:\/\/")
    conversational: new RegExp("^@")
    linky: new RegExp("https?:\/\/")

  @get_tweets_per_day: (user, cb) ->
    url = "https://api.twitter.com/1/users/show.json?screen_name=#{user}&callback=?"
    $.getJSON url, (user) ->
      days_count = ((new Date().getTime())-(new Date(user.created_at).getTime()))/1000/60/60/24
      # debugger
      cb null,
        tweets_per_day: Number((user.statuses_count/days_count).toFixed(1))

  @get_scores: (user, cb) ->
    url = "https://search.twitter.com/search.json?q=from%3a#{user}&rpp=100&callback=?"
    $.getJSON url, (res) ->

      # Collections
      tweets = {}
      tweets.all =            (result.text for result in res.results)
      tweets.poetic =         (tweet for tweet in tweets.all when !tweet.match(Poesis.patterns.hypertextual))
      tweets.conversational = (tweet for tweet in tweets.all when tweet.match(Poesis.patterns.conversational))
      tweets.linky =          (tweet for tweet in tweets.all when tweet.match(Poesis.patterns.linky))

      # Calculate scores as a percentage of total tweets
      scores = {}
      for key in Object.keys(tweets) when key isnt 'all'
        scores[key] = parseInt(tweets[key].length/tweets.all.length*100)

      # scores.poetic_within_nonconversational = parseInt(tweets.poetic.length/(tweets.all.length-tweets.conversational.length)*100)

      # Callback
      cb null,
        scores: scores
        tweets: tweets

window.Poesis = Poesis

$ ->

  $('#user').on 'change', (event) ->
    user = $(this).val()
    Poesis.get_scores user, (err, results) ->
      return console.log(err) if err
      $('#results').text(JSON.stringify(results, null, 2))

    Poesis.get_tweets_per_day user, (err, results) ->
      return console.log(err) if err
      $('#results2').text(JSON.stringify(results, null, 2))

  # Look for something like ?user=bob in the URL
  url_query = location.href.match(new RegExp("=(\\w+)"))
  $('#user').val(url_query[1]).trigger('change') if url_query