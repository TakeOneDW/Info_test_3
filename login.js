<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SmarterStorage - Startseite</title>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <div class="header-container">
    <div class="logo-container">
      <h2>SmarterStorage</h2>
      <img src="icon2.png" alt="Logo" class="icon" onerror="this.src='placeholder.png'">
    </div>
    <div class="my-chests-container">
      <h2>Meine Projekte</h2>
    </div>
  </div>

  <div class="box-container">
    <p>Projekte werden geladen...</p>
  </div>

  <button id="logoutBtn" class="submit-button">Abmelden</button>

  <!-- Test-Log -->
  <script>
    console.log("🚀 startpage.html geladen");
  </script>

  <!-- Supabase JS -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script>
    const SUPABASE_URL = 'https://iasgpuuzphsissbwavlc.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhc2dwdXV6cGhzaXNzYndhdmxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5ODM1MzUsImV4cCI6MjA3NjU1OTUzNX0.xW6tkp7n029UUxirhCzCB-sl1ErLmRM4K6KgiyNxzQk';
    window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("🔑 Supabase Client initialisiert");
  </script>

  <!-- startpage.js -->
  <script src="startpage.js" defer></script>
</body>
</html>