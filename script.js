/**
 * BHUSHAN SHELKE PORTFOLIO - SCRIPT (bhushanshelke.dev / github.io)
 * Interactive UI behaviors, Project Filtering, Skill Search, Theming & Toasts
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. THEME SWITCHER (Dark / Light Mode with LocalStorage)
     ------------------------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  /* ------------------------------------------------------------------------
     2. PROJECT CATEGORY FILTERING
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.proj-tab');
  const projectCards = document.querySelectorAll('.modern-project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     3. SKILLS LIVE SEARCH FILTER
     ------------------------------------------------------------------------ */
  const skillSearch = document.getElementById('skillSearch');
  const skillCards = document.querySelectorAll('.skill-modern-card');

  if (skillSearch) {
    skillSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      skillCards.forEach(card => {
        const chips = card.querySelectorAll('.pill-chip');
        let cardHasMatch = false;

        chips.forEach(chip => {
          const text = chip.textContent.toLowerCase();
          if (text.includes(query)) {
            chip.style.display = 'inline-flex';
            cardHasMatch = true;
          } else {
            chip.style.display = query ? 'none' : 'inline-flex';
          }
        });

        const badgeText = card.querySelector('.skill-cat-badge')?.textContent.toLowerCase() || '';
        if (badgeText.includes(query)) {
          cardHasMatch = true;
          chips.forEach(c => c.style.display = 'inline-flex');
        }

        card.style.display = cardHasMatch || !query ? 'block' : 'none';
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. CLIPBOARD COPY & TOAST NOTIFICATION
     ------------------------------------------------------------------------ */
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied: ${textToCopy}`);
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied: ${text}`);
    } catch (err) {
      showToast('Could not copy to clipboard');
    }
    document.body.removeChild(textArea);
  }

  /* ------------------------------------------------------------------------
     5. CONTACT FORM SUBMISSION HANDLER
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('userName')?.value.trim();
      const email = document.getElementById('userEmail')?.value.trim();
      const subject = document.getElementById('userSubject')?.value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('userMessage')?.value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please fill in all required fields.';
        }
        return;
      }

      const mailtoUrl = `mailto:bhushanpatil6129@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')

' + message)}`;

      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Opening your email client to dispatch message...';
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
      }, 600);
    });
  }

  /* ------------------------------------------------------------------------
     6. BACK TO TOP BUTTON
     ------------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
