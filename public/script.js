'use static';

(function () {
  var command = document.querySelector('.command');
  var status = document.querySelector('.status');
  var startBtn = document.querySelector('.start');

  // Disabling the start button until the click event is enabled
  startBtn.disabled = true;

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  var phrases = [
    'turn off the light',
    'turn on the light',
    'turn off light',
    'turn on light'
  ];

  if(SpeechRecognition && SpeechGrammarList && SpeechRecognitionEvent) {
    startBtn.addEventListener('click', testSpeech);
    // Enabling the start button
    startBtn.disabled = false;
  } else {
    // Display an error message if the speech recognition is not availabled
    var errorMsg = document.querySelector('.error-msg');
    errorMsg.classList.remove('hidden');
  }

  function testSpeech () {
      console.log('Event: click');
      // reset the defatul status of the code
      status.textContent = '';
      command.textContent = '';
      startBtn.disabled = true;

      // Start the voice recognition
      var recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.start();

      recognition.onresult = function (event) {
        console.log('Event: onresult');
        var inputCommand = event.results[0][0].transcript;
        command.textContent = inputCommand;

        var isValidCommand = false;
        phrases.forEach(function (phrase) {
          if(inputCommand === phrase) {
            isValidCommand = true;
          }
        });

        if(isValidCommand) {
            status.textContent = 'Valid result';
        } else {
            status.textContent = 'Invalid result';
        }

        console.log('Confidence: ' + event.results[0][0].confidence);
      };

      recognition.onspeechend = function () {
        console.log('Event: onspeechend');
        recognition.stop();
        startBtn.disabled = false;
        startBtn.textContent = 'Start new test';
        status.textContent = 'Processing ...';
      }

      recognition.onspeechstart= function () {
        console.log('Event: onspeechstart');
        status.textContent = 'listening ...';
      }

      recognition.onerror = function (event) {
        console.log('Event: onerror');
        startBtn.disabled = false;
        startBtn.textContent = 'Start new test';
        status.textContent = 'Error occurred in recognition: ' + event.error;
      }
    }
})();
