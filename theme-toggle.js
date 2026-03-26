/* ══ Theme Toggle — single source of truth ══ */
(function(){
  var KEY = 'maxmin-theme';
  var saved = localStorage.getItem(KEY);
  if (!saved) {
    saved = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  document.documentElement.setAttribute('data-theme', saved);

  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
    if (!localStorage.getItem(KEY)) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    }
  });

  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  function updateIcon(btn) {
    var theme = document.documentElement.getAttribute('data-theme');
    btn.innerHTML = theme === 'light' ? SUN : MOON;
  }

  document.addEventListener('DOMContentLoaded', function(){
    // If page already has a #themeToggleBtn, wire it up instead of creating new one
    var existing = document.getElementById('themeToggleBtn');
    if (existing) {
      updateIcon(existing);
      existing.addEventListener('click', function(){
        var cur = document.documentElement.getAttribute('data-theme');
        var next = cur === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(KEY, next);
        updateIcon(existing);
      });
      return;
    }

    // Create button — use tb-action class for app pages, theme-toggle for others
    var tbRight = document.querySelector('.tb-right');
    var btn = document.createElement('button');
    btn.id = 'themeToggleBtn';
    btn.setAttribute('aria-label', 'Chuyển chế độ sáng/tối');
    btn.setAttribute('title', 'Chuyển chế độ sáng/tối');

    if (tbRight) {
      btn.className = 'tb-action';
    } else {
      btn.className = 'theme-toggle';
    }

    updateIcon(btn);

    btn.addEventListener('click', function(){
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(KEY, next);
      updateIcon(btn);
    });

    // Insert into the best location
    if (tbRight) {
      tbRight.insertBefore(btn, tbRight.firstChild);
      return;
    }
    var navActs = document.querySelector('.nav-acts');
    if (navActs) { navActs.insertBefore(btn, navActs.firstChild); return; }
    var authLogo = document.querySelector('.auth-logo');
    if (authLogo) {
      btn.style.position = 'absolute'; btn.style.top = '24px'; btn.style.right = '24px';
      var wrap = document.querySelector('.auth-left') || document.body;
      wrap.style.position = 'relative'; wrap.appendChild(btn); return;
    }
    var obHeader = document.querySelector('.ob-header');
    if (obHeader) { var s = obHeader.querySelector('.ob-skip'); if(s){obHeader.insertBefore(btn,s)}else{obHeader.appendChild(btn)} return; }
    var ckHeader = document.querySelector('.ck-header');
    if (ckHeader) { ckHeader.appendChild(btn); return; }
    btn.style.position='fixed';btn.style.top='16px';btn.style.right='16px';btn.style.zIndex='9999';
    document.body.appendChild(btn);
  });
})();
