/* ══ Theme Toggle ══ */
(function(){
  // Restore saved theme or detect system preference
  var saved = localStorage.getItem('maxmin-theme');
  if (!saved) {
    saved = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  document.documentElement.setAttribute('data-theme', saved);

  // Listen for system changes (only if no manual override)
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
    if (!localStorage.getItem('maxmin-theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    }
  });

  // Inject toggle button when DOM ready
  document.addEventListener('DOMContentLoaded', function(){
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Chuyển chế độ sáng/tối');
    btn.setAttribute('title', 'Chuyển chế độ sáng/tối');
    btn.innerHTML =
      '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>' +
      '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

    btn.addEventListener('click', function(){
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('maxmin-theme', next);
    });

    // Find the best place to insert the button
    // 1. App pages: topbar right area (.tb-right) or after .tb-title
    var tbRight = document.querySelector('.tb-right');
    if (tbRight) {
      tbRight.insertBefore(btn, tbRight.firstChild);
      return;
    }
    var topbar = document.querySelector('.topbar');
    if (topbar) {
      // Insert at end of topbar
      topbar.appendChild(btn);
      return;
    }

    // 2. Landing page: nav actions area
    var navActs = document.querySelector('.nav-acts');
    if (navActs) {
      navActs.insertBefore(btn, navActs.firstChild);
      return;
    }

    // 3. Auth pages: after auth-logo
    var authLogo = document.querySelector('.auth-logo');
    if (authLogo) {
      btn.style.position = 'absolute';
      btn.style.top = '24px';
      btn.style.right = '24px';
      var wrap = document.querySelector('.auth-left') || document.body;
      wrap.style.position = 'relative';
      wrap.appendChild(btn);
      return;
    }

    // 4. Onboarding: header
    var obHeader = document.querySelector('.ob-header');
    if (obHeader) {
      var skipBtn = obHeader.querySelector('.ob-skip');
      if (skipBtn) {
        btn.style.marginRight = '10px';
        obHeader.insertBefore(btn, skipBtn);
      } else {
        obHeader.appendChild(btn);
      }
      return;
    }

    // 5. Checkout: header
    var ckHeader = document.querySelector('.ck-header');
    if (ckHeader) {
      ckHeader.appendChild(btn);
      return;
    }

    // Fallback: fixed position
    btn.style.position = 'fixed';
    btn.style.top = '16px';
    btn.style.right = '16px';
    btn.style.zIndex = '9999';
    document.body.appendChild(btn);
  });
})();
