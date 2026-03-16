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
})();
