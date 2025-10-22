document.addEventListener('DOMContentLoaded', () => {
  console.log("📄 login.js wurde geladen");

  const loginForm = document.querySelector('.login-container form');
  const messageContainer = document.getElementById('message-container');

  console.log("🔎 Formular gefunden:", loginForm);

  if (!window.supabase) {
    console.error('❌ Supabase Client nicht gefunden.');
    return;
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      console.log("📤 Versuche Login mit:", email);

      const { data, error } = await window.supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("🔍 Supabase Antwort:", { data, error });

      if (error) {
        console.error('❌ Login fehlgeschlagen:', error.message);
        messageContainer.textContent = "❌ " + error.message;
        messageContainer.style.display = 'block';
        setTimeout(() => {
          messageContainer.textContent = '';
          messageContainer.style.display = 'none';
        }, 4000);
        return;
      }

      if (data && data.user) {
        console.log('✅ Login erfolgreich! Weiterleitung ...');
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'startpage.html';
      } else {
        console.warn('⚠️ Keine Benutzerinformationen erhalten.');
      }
    });
  }
});