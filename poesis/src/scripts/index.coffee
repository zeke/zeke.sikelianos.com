class Poesis

  @patterns:
    hypertextual: new RegExp("@|#|https?:\/\/")
    conversational: new RegExp("^@")
    linky: new RegExp("https?:\/\/")

  @get_tweets_per_day: (user, cb) ->
    url = "https://api.twitter.com/1/users/show.json?screen_name=#{user}&callback=?"
    $.getJSON url, (user) ->

      # Days since Twitter account was created
      days = (Date.now() - new Date(user.created_at))/1000/60/60/24

      # Round to one decimal place
      user.tweets_per_day = Number((user.statuses_count/days).toFixed(1))
      cb null, user

  @get_scores: (user, cb) ->
    url = "https://api.twitter.com/1/statuses/user_timeline/#{user}.json?count=1000&callback=?"
    $.getJSON url, (tweets) ->

      counts =
        all:               tweets.length
        poetic:            (tweet for tweet in tweets when !tweet.text.match(Poesis.patterns.hypertextual)).length
        conversational:    (tweet for tweet in tweets when tweet.text.match(Poesis.patterns.conversational)).length
        linky:             (tweet for tweet in tweets when tweet.text.match(Poesis.patterns.linky)).length

      counts.nonconversational = counts.all-counts.conversational

      percentages =
        poetic:             parseInt(counts.poetic/(counts.nonconversational)*100)
        conversational:     parseInt(counts.conversational/counts.all*100)
        nonconversational:  parseInt(counts.nonconversational/counts.all*100)
        linky:              parseInt(counts.linky/counts.all*100)

      days = (Date.now() - new Date(tweets[tweets.length-1].created_at))/1000/60/60/24
      daily_averages =
        all:                Number((counts.all/days).toFixed(1))
        poetic:             Number((counts.poetic/days).toFixed(1))
        conversational:     Number((counts.conversational/days).toFixed(1))
        nonconversational:  Number((counts.nonconversational/days).toFixed(1))

      cb null,
        counts: counts
        percentages: percentages
        daily_averages: daily_averages

window.Poesis = Poesis

$ ->

  $('#user').on 'change', (event) ->
    user = $(this).val()
    Poesis.get_scores user, (err, results) ->
      return console.log(err) if err
      $('#results').text(JSON.stringify(results, null, 2))

    # Poesis.get_tweets_per_day user, (err, results) ->
    #   return console.log(err) if err
    #   $('#results2').text(JSON.stringify(results, null, 2))

  # Look for something like ?user=bob in the URL
  url_query = location.href.match(new RegExp("=(\\w+)"))
  $('#user').val(url_query[1]).trigger('change') if url_query