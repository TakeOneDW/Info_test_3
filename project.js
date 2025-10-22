/ Nur Prof darf Projekte anlegen
if (userRole === 'prof') {
  const createBtn = document.createElement('button');
  createBtn.textContent = "➕ Neues Projekt";
  createBtn.classList.add('submit-button');
  createBtn.addEventListener('click', async () => {
    const name = prompt("Projektname (z. B. Labor1_Kiste3):");
    if (!name) return;

    // Projekt in Supabase anlegen → Bucket wird automatisch erstellt
    const { error } = await window.supabase
      .from('projects')
      .insert([{ name, created_by: user.id }]);

    if (error) {
      alert("❌ Fehler beim Anlegen: " + error.message);
    } else {
      alert(⁠ ✅ Projekt '${name}' erstellt – Bucket ebenfalls angelegt! ⁠);
      await loadProjects();
    }
  });
  document.body.insertBefore(createBtn, boxContainer);
}