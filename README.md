# GTranslate.js
GTranslate.js is a client for Google Translate API.

## Google Account
To play you will need to create an account on google.
After access [Google API's Console](https://code.google.com/apis/console/) and generate a token.

### Security
For security reasons it **is not a good** option to leave your token directly into a file .js.
Fortunately, this can be solved easily.
Access [Google API's Console](https://code.google.com/apis/console/) and configure the domain you will use so google will validate the domain and not by token.

## Settings
~~~.js
  # default language
  gTranslate.Settings.DEFAULT_LANGUAGE = "en";

  # token
  gTranslate.Settings.TOKEN = "AIzaSy..."
~~~

## Languages
gTranslate.languages(callback);
~~~.ruby
  gTranslate.languages(function(languages){
     #languages
  });
~~~

## Translate
gTranslate.translate(text, from, to, callback);
~~~.ruby
  gTranslate.languages("Hello World", "en", "pt", function(translate){
    
    # Receives an object that contains the 'translatedText' key.

    #translate.translatedText
  });
~~~

## Detect
gTranslate.detect(text, callback);
~~~.ruby
  gTranslate.detect("Hello World", function(language){
     #language
  });
~~~

## TODO
* Extend String 
~~~.ruby
  "Hello World".translate("pt", function(translate){
     #translate
  });
~~~

* Multiple querys
~~~.ruby
  gTranslate.translate("Hello World", "en", ["pt","it","es"], function() {
    #returns 'hello world' in pt, it and es.
  });
~~~

## License
GTranslate.js is available under the MIT license.