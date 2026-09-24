const bolt = require('@slack/bolt');
require('dotenv').config();
const axios = require('axios');

const my_token = process.env.SLACK_BOT_TOKEN;
const my_app_token = process.env.SLACK_APP_TOKEN;
var bot = new bolt.App({ token: my_token,
appToken: my_app_token,
socketMode: true
});
console.log("trying to start bot....");
//ping command
bot.command('/my-first-slack-bot-ping', async function(stuff) {console.log("got a ping command! ");
    await stuff.ack();
    var start_time = Date.now();
    var end_time = Date.now();
    var l = end_time - start_time;
    stuff.respond({ text: "pong !! latency is " + l + "ms or something "});

});
// help menu
bot.command('/my-first-slack-bot-help', async(c) => {
  c.ack();
  console.log("help requested");
  var msg = "commands:\n1. /my-first-slack-bot-ping\n2. /my-first-slack-bot-catfact";
  c.respond({ text: msg });
});

// cat fact api 
bot.command('/my-first-slack-bot-catfact', async (obj) => {
  await obj.ack();
  console.log("fetching cat fact from some random api...");
  try {
    let responseObj = await axios.get('https://catfact.ninja/fact');
    let realFact = responseObj.data.fact;
    obj.respond({ text: "here is a cat fact: " + realFact });
  } catch (error) {
    console.log("error happened:", error);
    obj.respond({ text: "rip api is broken" });
  }
});

bot.start().then(() => {
  console.log("IT WORKED BOT IS ONLINE YAY");
});