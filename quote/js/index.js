// First, an array of quotes
// These quotes are tweetable, so don't enter any that are longer than 140 chars, incl citation
var quotes = [
  {
    "quote": "It's hard to bargle nargle zouz<br>with all these marbles in my mouth",
    "cite": "\"Weird\" Al Yankovic"
  },
  
  {
    "quote": "Bawitdaba, da bang, da dang diggy diggy, diggy, said the boogie, said up jump the boogie",
    "cite": "Kid Rock"
  },
  
  {
    "quote": "bababadalgharaghtakamminarronnkonnbronntonnerronntuonnthunntrovarrhounawnskawntoohoohoordenenthurnuk!",
    "cite": "James Joyce"
  },
  
  {
    "quote": "Twas brillig and the slithy toves<br>Did gyre and gimble in the wabe",
    "cite": "Lewis Carroll"
  },
  
  {
    "quote": "Lorem ipsum dolor sit amet, consul delenit principes sit ei.",
    "cite": "probably not Cicero"
  },
  
  {
    "quote": "They say the owl was a baker's daughter.",
    "cite": "Ophelia"
  },
  
  {
    "quote": "How Can Mirrors Be Real If Our Eyes Aren't Real",
    "cite": "Jaden Smith"
  }
]

// Declare some other relevant variables
// Random rolls on load
// set roll to quoted and cited vars

var newRandom = Math.floor(Math.random() * quotes.length);

var currentRandom = newRandom;

var quoted = quotes[newRandom].quote;

var cited = quotes[newRandom].cite;

// This is the fcn that'll do all the work

function getQuote(){
  
  currentRandom = newRandom;
  
  newRandom = Math.floor(Math.random() * quotes.length);

  //loop to prevent re-rolling the same number

  if(newRandom === currentRandom){
    
    while(newRandom === currentRandom){
      
      newRandom = Math.floor(Math.random() * quotes.length);
      
    }
    
  }
  
  // Set quoted and cited to new random roll
  quoted = quotes[newRandom].quote;
  
  cited = quotes[newRandom].cite;

  //a loop to insert "-" after every 35th character
  //in case the quote string is an unbroken string
  //that would overflow the .quote-container
  var lineLength = 32
  
  var lineLengthCounter = lineLength;
  
  if (quoted.length > lineLength && quoted.includes(" ") === false) {
    
    while (/[aeiouy]/i.test(quoted.charAt(lineLengthCounter - 1))){
      
      lineLengthCounter--;
      
    }

    var tweetArray = quoted.slice(lineLengthCounter);
    
    quoted = quoted.replace(tweetArray, "-").concat(tweetArray);
    
    while(tweetArray.length > (lineLength + 1)) {

      lineLengthCounter = lineLength;
      
      while (/[aeiouy]/i.test(tweetArray.charAt(lineLengthCounter - 1))){

        lineLengthCounter--;

        console.log("lineLength on next pass = " + lineLengthCounter);

      }
      
      tweetArray = tweetArray.slice(lineLengthCounter);
      
      quoted = quoted.replace(tweetArray, "-").concat(tweetArray);

    };
    
  };
  
  $("#quote").html(quoted);
  
  $("#cite").html(cited);
  
  //defines tweet button values
  var tweetQuote = '"' + quotes[newRandom].quote + '" \u2014 ' + cited;
  
  //clean tweetQuote of impermissible special characters

  if (tweetQuote.includes("<br>")){
    
    tweetQuote = tweetQuote.replace("<br>","&#10;");
    
  }
  
  //the .replace only finds all the " if I put the escape sequence \" inside the regex
  //note that escape the \ and then escaping the quote " like \\\" doesn't work
  //next problem: \22 is css. I think I need the html entity here
  if (tweetQuote.includes("\"")){
    
    tweetQuote = tweetQuote.replace(/\"/g,"&#34;");
    
  }
  
  var tweetButton = '<a class="twitter-share-button" href="https://twitter.com/share" data-text="' + tweetQuote + '" data-url="none">Tweet</a>';
  
  $('.tweet-box').empty();
  
  $('.tweet-box').html(tweetButton);
  
  twttr.widgets.load();

};

// Call that main fcn on doc ready and on button click

$("document").ready(getQuote);

$("#newQuote").on("click", function(){
  
  $(".quote-container").addClass("whiteOut").on("transitionend -webkit-transitionEnd", function(){ 
    $(".quote-container").removeClass("whiteOut");
    getQuote()
  });
});