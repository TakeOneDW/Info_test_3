document.addEventListener('DOMContentLoaded', async () => {
  console.log("📄 startpage.js geladen");

  // Supabase-Session abrufen
  const { data: { session } } = await window.supabase.auth.getSession();
  if (!session) {
    console.warn("⚠️ Kein Login gefunden, leite um auf index.html");
    window.location.href = 'index.html';
    return;
  }

  const user = session.user;
  console.log("✅ Eingeloggt als:", user.email);

  // Benutzerrolle aus Supabase laden
  const { data: roleData, error: roleError } = await window.supabase
    .from('roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (roleError) {
    console.error("❌ Fehler beim Laden der Rolle:", roleError.message);
  }

  const userRole = roleData?.role || 'student';
  console.log("🧑‍💼 Benutzerrolle:", userRole);

  const boxContainer = document.querySelector('.box-container');

  // Projekte aus Supabase laden
  async function loadProjects() {
    const { data: projects, error } = await window.supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    boxContainer.innerHTML = '';

    if (error) {
      boxContainer.innerHTML = ⁠ <p>❌ Fehler beim Laden: ${error.message}</p> ⁠;
      return;
    }

    if (!projects || projects.length === 0) {
      boxContainer.innerHTML = ⁠ <p>📦 Noch keine Projekte vorhanden.</p> ⁠;
      return;
    }

    projects.forEach((p) => {
      const el = document.createElement('a');
      el.classList.add('card');
      el.href = ⁠ project.html?name=${encodeURIComponent(p.name)} ⁠;
      el.textContent = p.name;
      boxContainer.appendChild(el);
    });
  }

  await loadProjects();

  // Nur Professor darf neue Projekte erstellen
  if (userRole === 'prof') {
    console.log("🧱 Benutzer ist Professor — Erstelle Button");
    const createBtn = document.createElement('button');
    createBtn.textContent = "➕ Neues Projekt";
    createBtn.classList.add('submit-button');

    // Position: Nach dem Header-Container einfügen
    const header = document.querySelector('.my-chests-container');
    if (header) {
      header.insertAdjacentElement('afterend', createBtn);
    } else {
      document.body.insertBefore(createBtn, boxContainer);
    }

    // Klick-Event
    createBtn.addEventListener('click', async () => {
      console.log("🧱 Button wurde geklickt!");
      const name = prompt("Projektname:");
      if (!name) return;

      const { error } = await window.supabase
        .from('projects')
        .insert([{ name, created_by: user.id }]);

      if (error) {
        console.error("❌ Fehler beim Anlegen:", error.message);
        alert("Fehler beim Anlegen: " + error.message);
      } else {
        alert(⁠ ✅ Projekt '${name}' angelegt! ⁠);
        await loadProjects();
      }
    });
  } else {
    console.log("👀 Kein Prof — Button wird nicht angezeigt");
  }
});