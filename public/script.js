'use static';

(function () {
  var command = document.querySelector('.command');
  var status = document.querySelector('.status');
  var startBtn = document.querySelector('.start');

  // Disabling the start button until the click event is enabled
  startBtn.disabled = true;

  // Version 1
  // var phrases = [
  //   'turn off the light',
  //   'turn on the light',
  //   'turn off light',
  //   'turn on light'
  // ];

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  if(SpeechRecognition) {
    startBtn.addEventListener('click', testSpeech);
    // Enabling the start button
    startBtn.disabled = false;
  } else {
    // Display an error message if the speech recognition is not available
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
      recognition.lang = 'es-ES';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.start();

      // Handle the events of the recognition
      recognition.onspeechstart = onSpeechStartRecognition;
      recognition.onerror = onErrorRecognition;
      recognition.onresult = onResultRecognition;
      recognition.onspeechend = function () {
        onSpeechEndRecognition(recognition);
      };
    }

    function onResultRecognition (event) {
      console.log('Event: onresult');
      console.log('Confidence: ' + event.results[0][0].confidence);
      var inputCommand = event.results[0][0].transcript;
      command.textContent = inputCommand;

      // Version 1
      // var isValidCommand = false;
      // phrases.forEach(function (phrase) {
      //   if(inputCommand === phrase) {
      //     isValidCommand = true;
      //   }
      // });
      // if(isValidCommand) {
      //     status.textContent = 'Valid command';
      // } else {
      //     status.textContent = 'Invalid command';
      // }

      // Version 2
      fetchRequest('/action', { command: inputCommand })
        .then(function () {
          status.textContent = '';
        });
    };

    function onSpeechEndRecognition (recognition) {
      console.log('Event: onspeechend');
      recognition.stop();
      startBtn.disabled = false;
      startBtn.textContent = 'Empezar de nuevo';
      status.textContent = 'Procesando ...';
    }

    function onSpeechStartRecognition () {
      console.log('Event: onspeechstart');
      status.textContent = 'Escuchando ...';
    }

    function onErrorRecognition (event) {
      console.log('Event: onerror');
      startBtn.disabled = false;
      startBtn.textContent = 'Empezar de nuevo';
      status.textContent = 'Error en el reconocimiento: ' + event.error;
    }

    function fetchRequest (url, data, method) {
      var method = method || 'post';
      var headers = new Headers({ 'Content-Type': 'application/json' });
      var payload = {
        headers: headers,
        method: method,
        body: JSON.stringify(data)
      };

      console.log({ url: url, payload: payload });
      return fetch(url, payload);
    }
})();
