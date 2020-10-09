(function () {
  const url = window.location.href;

  const editUrl = (urlVariable) =>
    `https://ipm.srv.int.avast.com/${urlVariable}/Edit/`;

  if (
    url.includes(editUrl('Screens')) ||
    url.includes(editUrl('Interstitials'))
  ) {
    console.log('screen page');

    //! deleting "Select Template Input"
    const templatePanel = document.querySelector('.template-panel');
    const templatePanelDivs = document.querySelectorAll('.template-panel div');

    templatePanel.style.display = 'flex';
    templatePanel.style.justifyContent = 'flex-end';

    templatePanelDivs.forEach((div) => (div.style.display = 'none'));

    //! creating the button
    const templateSelectorButton = document.createElement('button');

    templateSelectorButton.classList.add('template-button');
    templateSelectorButton.textContent = 'Choose Template';
    templateSelectorButton.setAttribute('type', 'button');

    templatePanel.appendChild(templateSelectorButton);

    //! creating elements
    const mainContainer = document.querySelector('.container-fluid');
    const modal = document.createElement('div');
    const templateSelectorOverlay = document.createElement('div');
    const templateSelector = document.createElement('div');
    const templateSelectorHead = document.createElement('div');
    const templateSelectorBody = document.createElement('div');
    const templateSelectorClose = document.createElement('button');
    const templateSelectorTitle = document.createElement('h2');
    const templateSelectorIframe = document.createElement('iframe');

    //! classes
    modal.classList.add('template-modal');
    templateSelectorOverlay.classList.add('template-overlay');
    templateSelector.classList.add('template-selector');
    templateSelectorHead.classList.add('template-selector__head');
    templateSelectorBody.classList.add('template-selector__body');
    templateSelectorClose.classList.add('template-selector__close');
    templateSelectorTitle.classList.add('template-selector__title');
    templateSelectorIframe.classList.add('template-selector__iframe');

    //! content
    templateSelectorClose.textContent = 'X';
    templateSelectorTitle.textContent = 'IPM Template Selector';
    templateSelectorIframe.src =
      'https://quizzical-heyrovsky-6638ae.netlify.app/';
    templateSelectorIframe.setAttribute('onload', `test()`);
    templateSelectorIframe.onload = function () {
      test();
    };

    //! append
    modal.appendChild(templateSelector);
    mainContainer.appendChild(templateSelectorOverlay);
    mainContainer.appendChild(modal);
    templateSelector.appendChild(templateSelectorHead);
    templateSelector.appendChild(templateSelectorBody);
    templateSelectorHead.appendChild(templateSelectorTitle);
    templateSelectorHead.appendChild(templateSelectorClose);
    templateSelectorBody.appendChild(templateSelectorIframe);

    //! functions
    const openTemplateSelector = () => {
      modal.classList.add('template-modal--show');
      templateSelectorOverlay.classList.add('template-overlay--show');
    };

    const closeTemplateSelector = (e) => {
      if (e.target === e.currentTarget) {
        modal.classList.remove('template-modal--show');
        templateSelectorOverlay.classList.remove('template-overlay--show');
      }
    };

    const test = () => {
      console.log('sent a message from the top frame');
      templateSelectorIframe.contentWindow.postMessage('bruh...', '*');
    };

    //! event triggers
    modal.addEventListener('click', closeTemplateSelector);
    templateSelectorClose.addEventListener('click', closeTemplateSelector);
    templateSelectorButton.addEventListener('click', openTemplateSelector);
  }

  // //! recieve message
  // var eventMethod = window.addEventListener
  //   ? 'addEventListener'
  //   : 'attachEvent';
  // var eventer = window[eventMethod];
  // var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

  // eventer(messageEvent, function (e) {
  //   // if (e.origin !== 'http://the-trusted-iframe-origin.com') return;

  //   if (e.data === 'myevent' || e.message === 'myevent')
  //     alert('Message from iframe just came!');

  //   console.log(e.message);
  // });
  // addEventListener support for IE8
  function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
      element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, eventHandler);
    }
  }

  // Send a message to the child iframe
  var iframeEl = document.querySelector('.template-selector__button');

  // Send a message to the child iframe
  var sendMessage = function (msg) {
    // Make sure you are sending a string, and to stringify JSON
    iframeEl.contentWindow.postMessage(msg, '*');
  };

  // Listen to message from child window
  bindEvent(window, 'message', function (e) {
    console.log(`I recieved a message from the inner frame: ${e.data}`);
  });
})();
