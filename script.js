/**
 * BHUSHAN SHELKE PORTFOLIO - JAVASCRIPT (bhushanshelke.dev)
 * Interactive UI behaviors, Project Filtering, Skill Search, Theming & Toasts
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. THEME SWITCHER (Dark / Light Mode with LocalStorage)
     ------------------------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or prefer dark by default
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
     2. MOBILE NAVIGATION DRAWER
     ------------------------------------------------------------------------ */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. HERO ROLE TYPING ANIMATION
     ------------------------------------------------------------------------ */
  const typedRoleElement = document.getElementById('typedRole');
  const roles = [
    'Scalable Big Data Pipelines',
    'Production RAG Platforms',
    'PySpark & Kafka Architectures',
    'High-Throughput Microservices',
    'Distributed Data Systems'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeRole() {
    if (!typedRoleElement) return;

    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(typeRole, typingSpeed);
  }

  typeRole();

  /* ------------------------------------------------------------------------
     4. PROJECT CATEGORY FILTERING
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

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
          }, 250);
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     5. SKILLS LIVE SEARCH FILTER
     ------------------------------------------------------------------------ */
  const skillSearch = document.getElementById('skillSearch');
  const skillCategories = document.querySelectorAll('.skill-category-card');

  if (skillSearch) {
    skillSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      skillCategories.forEach(cat => {
        const tags = cat.querySelectorAll('.skill-tag');
        let categoryHasMatch = false;

        tags.forEach(tag => {
          const tagText = tag.textContent.toLowerCase();
          if (tagText.includes(query)) {
            tag.style.display = 'inline-flex';
            categoryHasMatch = true;
          } else {
            tag.style.display = query ? 'none' : 'inline-flex';
          }
        });

        const headerText = cat.querySelector('h3').textContent.toLowerCase();
        if (headerText.includes(query)) {
          categoryHasMatch = true;
          tags.forEach(t => t.style.display = 'inline-flex');
        }

        cat.style.display = categoryHasMatch || !query ? 'block' : 'none';
      });
    });
  }

  /* ------------------------------------------------------------------------
     6. CLIPBOARD COPY & TOAST NOTIFICATION
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
     7. CONTACT FORM SUBMISSION HANDLER
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

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

      // Generate mailto link for direct recruiter communication
      const mailtoUrl = `mailto:bhushanpatil6129@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')

' + message)}`;

      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Opening your email client to dispatch message...';
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
      }, 700);
    });
  }

  /* ------------------------------------------------------------------------
     8. SCROLL-SPY ACTIVE NAVIGATION & BACK TO TOP BUTTON
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Active Nav Highlight
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });

    // Back to top visibility
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
