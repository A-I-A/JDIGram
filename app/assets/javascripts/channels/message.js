$(document).on("turbolinks:load", function() {
  App.message = App.cable.subscriptions.create({
    channel: 'MessageChannel',
    chat_id: $(".chat-message-submit").attr('chat_id')},
  {
    connected: function() {},

    disconnected: function() {},

    received: function(data) {
      $(".chat-messages-container").append(data.message);
    },
  });

  $(".chat-message-submit").click(function(event) {
    let chat_id = event.target.getAttribute('chat_id');
    let text = $(".chat-message-field").val();
    App.message.send({chat_id: chat_id, text: text});
    $('.chat-message-field').val('');
  });
});



