(function () {
  var toggles = document.querySelectorAll('[data-nav-toggle]');

  toggles.forEach(function (toggle) {
    var targetId = toggle.getAttribute('aria-controls');
    var nav = targetId ? document.getElementById(targetId) : null;

    if (!nav) {
      return;
    }

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  var yearNodes = document.querySelectorAll('[data-current-year]');
  var year = String(new Date().getFullYear());
  yearNodes.forEach(function (node) {
    node.textContent = year;
  });

  var billingRoot = document.querySelector('[data-billing-root]');
  if (!billingRoot) {
    return;
  }

  var billingButtons = billingRoot.querySelectorAll('[data-billing-option]');
  var priceBlocks = billingRoot.querySelectorAll('[data-price]');
  var saveNote = billingRoot.querySelector('[data-billing-save]');

  function applyBilling(mode) {
    var isAnnual = mode === 'annual';
    billingRoot.setAttribute('data-billing', mode);

    billingButtons.forEach(function (button) {
      var active = button.getAttribute('data-billing-option') === mode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    priceBlocks.forEach(function (block) {
      var valueNode = block.querySelector('[data-price-value]');
      var noteNode = block.querySelector('[data-billing-note]');

      if (!valueNode || !noteNode) {
        return;
      }

      var value = isAnnual ? block.getAttribute('data-annual') : block.getAttribute('data-monthly');
      valueNode.textContent = value || '';
      noteNode.textContent = isAnnual ? 'facturé annuellement' : 'facturation mensuelle';
    });

    if (saveNote) {
      saveNote.textContent = 'Économisez 10% avec l’annuel';
    }
  }

  billingButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var mode = button.getAttribute('data-billing-option');
      applyBilling(mode === 'annual' ? 'annual' : 'monthly');
    });
  });

  applyBilling('monthly');
})();
