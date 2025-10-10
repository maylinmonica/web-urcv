import os

TEMPLATE_DIR = 'app/templates'

templates = {
    'template1.html': """
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #2c3e50; }
    h1, h2 { color: #2980b9; }
    .section { margin-bottom: 30px; }
    .header { border-bottom: 2px solid #2980b9; padding-bottom: 10px; margin-bottom: 30px; }
    .photo { float: right; width: 100px; height: 100px; object-fit: cover; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="header">
    <img src="{{ cv.photo_url }}" alt="Foto" class="photo">
    <h1>{{ cv.first_name }} {{ cv.last_name }}</h1>
    <p>{{ cv.email }} | {{ cv.phone }}</p>
  </div>

  <div class="section">
    <h2>Profil</h2>
    <p>{{ cv.profile_description }}</p>
  </div>

  <div class="section">
    <h2>Pendidikan</h2>
    {% for edu in cv.educations %}
      <p><strong>{{ edu.school_name }}</strong> — {{ edu.degree }}<br>
      <small>{{ edu.start_date }} - {{ edu.end_date }}</small></p>
    {% endfor %}
  </div>

  <div class="section">
    <h2>Pengalaman Kerja</h2>
    {% for exp in cv.experiences %}
      <p><strong>{{ exp.job_title }}</strong> di {{ exp.company }}<br>
      <small>{{ exp.start_date }} - {{ exp.end_date }}</small></p>
      <p>{{ exp.description }}</p>
    {% endfor %}
  </div>
</body>
</html>
""",

    'template2.html': """
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Georgia', serif; padding: 40px; background: #f9f9f9; color: #333; }
    h1 { font-size: 28px; color: #2c3e50; }
    h2 { font-size: 22px; margin-top: 30px; }
    .photo { float: left; margin-right: 20px; width: 90px; height: 90px; object-fit: cover; border-radius: 50%; }
    .info { margin-left: 120px; }
    .section { margin-bottom: 25px; }
  </style>
</head>
<body>
  <img src="{{ cv.photo_url }}" class="photo" alt="Foto">
  <div class="info">
    <h1>{{ cv.first_name }} {{ cv.last_name }}</h1>
    <p>{{ cv.email }} | {{ cv.phone }}</p>
  </div>

  <div class="section">
    <h2>Profil Singkat</h2>
    <p>{{ cv.profile_description }}</p>
  </div>

  <div class="section">
    <h2>Riwayat Pendidikan</h2>
    <ul>
      {% for edu in cv.educations %}
        <li>
          <strong>{{ edu.school_name }}</strong> — {{ edu.degree }}<br>
          <small>{{ edu.start_date }} - {{ edu.end_date }}</small>
        </li>
      {% endfor %}
    </ul>
  </div>

  <div class="section">
    <h2>Pengalaman</h2>
    {% for exp in cv.experiences %}
      <p><strong>{{ exp.job_title }}</strong> @ {{ exp.company }} ({{ exp.start_date }} - {{ exp.end_date }})</p>
      <p>{{ exp.description }}</p>
    {% endfor %}
  </div>
</body>
</html>
""",

    'template3.html': """
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Courier New', monospace; padding: 40px; background: #fffefc; color: #000; }
    h1 { border-bottom: 2px dashed #444; padding-bottom: 5px; }
    h2 { color: #555; }
    .photo { float: right; width: 80px; height: 80px; object-fit: cover; border: 2px solid #444; }
    .section { margin-top: 30px; }
  </style>
</head>
<body>
  <div>
    <img src="{{ cv.photo_url }}" alt="Foto" class="photo">
    <h1>{{ cv.first_name }} {{ cv.last_name }}</h1>
    <p>{{ cv.email }} | {{ cv.phone }}</p>
  </div>

  <div class="section">
    <h2>Profil</h2>
    <p>{{ cv.profile_description }}</p>
  </div>

  <div class="section">
    <h2>Pendidikan</h2>
    {% for edu in cv.educations %}
      <p>- {{ edu.school_name }} ({{ edu.degree }})<br><small>{{ edu.start_date }} - {{ edu.end_date }}</small></p>
    {% endfor %}
  </div>

  <div class="section">
    <h2>Pengalaman Kerja</h2>
    {% for exp in cv.experiences %}
      <p>- {{ exp.job_title }} @ {{ exp.company }}<br><small>{{ exp.start_date }} - {{ exp.end_date }}</small></p>
      <p>{{ exp.description }}</p>
    {% endfor %}
  </div>
</body>
</html>
"""
}

# Buat direktori jika belum ada
os.makedirs(TEMPLATE_DIR, exist_ok=True)

# Simpan template ke file
for filename, content in templates.items():
    path = os.path.join(TEMPLATE_DIR, filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"[✓] Template {filename} berhasil disimpan di {TEMPLATE_DIR}")
