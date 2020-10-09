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

    const recieveMessage = () => {
      console.log(message.log);
    };

    //! event triggers
    modal.addEventListener('click', closeTemplateSelector);
    templateSelectorClose.addEventListener('click', closeTemplateSelector);
    templateSelectorButton.addEventListener('click', openTemplateSelector);
    window.addEventListener('message', recieveMessage);
  }
})();
