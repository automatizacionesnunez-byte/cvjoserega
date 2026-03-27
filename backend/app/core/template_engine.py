import json
from jinja2 import Environment, BaseLoader

class TemplateEngine:
    """
    TemplateEngine focuses on absolute visual parity for high-end executive CVs.
    Currently implements the "CEO Premium" (Carlos Palacios) model as the gold standard.
    """
    
    CEO_PREMIUM_LAYOUT = """
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Raleway:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: white; font-family: 'Source Sans 3', sans-serif; color: #2d3436; line-height: 1.5; }
      .cv-page { width: 100%; min-height: 1123px; background: white; position: relative; overflow: hidden; }

      /* HEADER */
      .cv-header {
        background: #1a2744;
        padding: 52px 55px;
        position: relative;
        overflow: hidden;
      }
      .cv-header::before {
        content: ''; position: absolute;
        right: -30px; top: -30px;
        width: 220px; height: 220px;
        background: rgba(212,172,13,0.07);
        border-radius: 50%;
      }
      .cv-header::after {
        content: ''; position: absolute;
        right: 60px; bottom: -60px;
        width: 150px; height: 150px;
        background: rgba(212,172,13,0.05);
        border-radius: 50%;
      }
      .cv-header-inner { display: flex; align-items: center; gap: 36px; position: relative; z-index: 1; }
      .cv-photo {
        width: 118px; height: 118px;
        border-radius: 6px;
        border: 3px solid #d4ac0d;
        background: rgba(255,255,255,0.07);
        display: flex; align-items: center; justify-content: center;
        overflow: hidden;
        flex-shrink: 0;
      }
      .cv-photo img { width: 100%; height: 100%; object-fit: cover; }
      .cv-name { font-size: 2.8rem; font-weight: 700; color: white; letter-spacing: 0.02em; line-height: 1; font-family: 'Playfair Display', serif; }
      .cv-role { font-size: 0.8rem; font-weight: 400; font-family: 'Raleway', sans-serif; color: #d4ac0d; letter-spacing: 0.32em; text-transform: uppercase; margin-top: 8px; }
      .cv-gold-line { width: 75px; height: 2px; background: #d4ac0d; margin: 14px 0; }
      .cv-contact-row { display: flex; gap: 2.2rem; }
      .cv-contact-item { font-size: 0.77rem; font-family: 'Raleway', sans-serif; color: rgba(255,255,255,0.52); }

      /* BODY */
      .cv-body { display: grid; grid-template-columns: 1fr 230px; }
      .cv-main { padding: 38px 42px; }
      .cv-sidebar { background: #f7f5f0; padding: 38px 28px; border-left: 1px solid #ede9e0; min-height: 800px; }

      /* Main section title */
      .sec-title {
        font-size: 1.05rem; font-weight: 700; color: #1a2744;
        margin-bottom: 14px; margin-top: 28px;
        display: flex; align-items: center; gap: 10px;
        font-family: 'Playfair Display', serif;
      }
      .sec-title::before { content: ''; width: 4px; height: 20px; background: #d4ac0d; flex-shrink: 0; }
      .sec-title:first-child { margin-top: 0; }

      .summary { font-size: 0.84rem; font-family: 'Source Sans 3', sans-serif; line-height: 1.88; color: #555; font-style: italic; }

      .exp-item { margin-bottom: 22px; padding-bottom: 22px; border-bottom: 1px solid #f0ece4; }
      .exp-item:last-child { border-bottom: none; }
      .exp-header { display: flex; justify-content: space-between; align-items: baseline; }
      .exp-title { font-size: 0.95rem; font-weight: 700; font-family: 'Raleway', sans-serif; color: #1a1a1a; }
      .exp-date { font-size: 0.7rem; color: #bbb; font-family: 'Raleway', sans-serif; }
      .exp-company { font-size: 0.87rem; font-weight: 700; font-family: 'Raleway', sans-serif; color: #1a2744; margin: 2px 0 7px; }
      .exp-desc { font-size: 0.8rem; font-family: 'Source Sans 3', sans-serif; line-height: 1.72; color: #666; }
      .exp-desc ul { padding-left: 1.2rem; }
      .exp-desc li { margin-bottom: 4px; }

      /* Sidebar */
      .s-sec-title {
        font-size: 0.6rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
        color: #1a2744; border-bottom: 2px solid #d4ac0d; padding-bottom: 5px;
        margin-bottom: 12px; margin-top: 26px;
        font-family: 'Raleway', sans-serif;
      }
      .s-sec-title:first-child { margin-top: 0; }

      .contact-line { font-size: 0.77rem; font-family: 'Source Sans 3', sans-serif; color: #666; margin-bottom: 7px; line-height: 1.5; }
      .contact-line strong { display: block; font-size: 0.62rem; font-family: 'Raleway', sans-serif; text-transform: uppercase; letter-spacing: 0.08em; color: #aaa; margin-bottom: 1px; font-weight: 600; }

      .apt-item { font-size: 0.78rem; font-family: 'Source Sans 3', sans-serif; color: #555; padding: 5px 0; border-bottom: 1px dotted #e5e0d5; line-height: 1.4; }
      .apt-item:last-child { border-bottom: none; }

      .edu-it { margin-bottom: 13px; }
      .edu-deg { font-size: 0.82rem; font-family: 'Raleway', sans-serif; font-weight: 700; color: #1a1a1a; line-height: 1.3; }
      .edu-sch { font-size: 0.77rem; font-family: 'Source Sans 3', sans-serif; color: #777; }
      .edu-yr { font-size: 0.7rem; font-family: 'Source Sans 3', sans-serif; color: #bbb; }

      /* Skill bars sidebar */
      .sk-item { margin-bottom: 9px; }
      .sk-name { font-size: 0.73rem; font-family: 'Source Sans 3', sans-serif; color: #555; margin-bottom: 3px; }
      .sk-track { height: 3px; background: #e8e4d9; border-radius: 2px; }
      .sk-fill { height: 3px; background: #1a2744; border-radius: 2px; }

      @media print {
        body { background: white; padding: 0; }
        .cv-page { box-shadow: none; width: 100%; }
      }
    </style>
    </head>
    <body>
    <div class="cv-page">
      <div class="cv-header">
        <div class="cv-header-inner">
          <div class="cv-photo">
            {% if cv.personal_info.photo_url %}<img src="{{ cv.personal_info.photo_url }}">{% else %}{{ cv.personal_info.name[0] }}{% endif %}
          </div>
          <div>
            <div class="cv-name">{{ cv.personal_info.name }}</div>
            <div class="cv-role">{{ cv.experience[0].role if cv.experience else 'Executive Profile' }}</div>
            <div class="cv-gold-line"></div>
            <div class="cv-contact-row">
              <div class="cv-contact-item">{{ cv.personal_info.phone }}</div>
              <div class="cv-contact-item">{{ cv.personal_info.email }}</div>
              <div class="cv-contact-item">{{ cv.personal_info.location }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="cv-body">
        <div class="cv-main">
          <div class="sec-title">Perfil Ejecutivo</div>
          <p class="summary">{{ cv.personal_info.summary }}</p>

          <div class="sec-title">Experiencia Profesional</div>
          {% for exp in cv.experience %}
          <div class="exp-item">
            <div class="exp-header">
              <div class="exp-title">{{ exp.role }}</div>
              <div class="exp-date">{{ exp.start_date }} – {{ exp.end_date if not exp.present else 'Actualidad' }}</div>
            </div>
            <div class="exp-company">{{ exp.company }} — {{ exp.location if exp.location else cv.personal_info.location }}</div>
            <div class="exp-desc">
              <ul>
                {% for bullet in exp.achievements %}
                <li>{{ bullet }}</li>
                {% endfor %}
              </ul>
            </div>
          </div>
          {% endfor %}

          <div class="sec-title">Formación Académica</div>
          {% for ed in cv.education %}
          <div class="exp-item">
            <div class="exp-header">
              <div class="exp-title">{{ ed.degree }}</div>
              <div class="exp-date">{{ ed.start_date }} – {{ ed.end_date }}</div>
            </div>
            <div class="exp-company">{{ ed.institution }}</div>
            <div class="exp-desc" style="font-size: 0.76rem; margin-top: 4px;">{{ ed.description if ed.description else '' }}</div>
          </div>
          {% endfor %}
        </div>

        <div class="cv-sidebar">
          <div class="s-sec-title">Contacto</div>
          <div class="contact-line"><strong>Teléfono</strong>{{ cv.personal_info.phone }}</div>
          <div class="contact-line"><strong>Email</strong>{{ cv.personal_info.email }}</div>
          {% if cv.personal_info.linkedin %}<div class="contact-line"><strong>LinkedIn</strong>{{ cv.personal_info.linkedin }}</div>{% endif %}
          <div class="contact-line"><strong>Ubicación</strong>{{ cv.personal_info.location }}</div>

          <div class="s-sec-title">Competencias Clave</div>
          {% for skill in cv.skills.technical %}
          <div class="apt-item">{{ skill }}</div>
          {% endfor %}

          <div class="s-sec-title">Habilidades Directivas</div>
          {% for skill in cv.skills.technical[:4] %}
          <div class="sk-item">
            <div class="sk-name">{{ skill }}</div>
            <div class="sk-track"><div class="sk-fill" style="width:{{ (90 - (loop.index0 * 2)) }}%"></div></div>
          </div>
          {% endfor %}

          <div class="s-sec-title">Cursos y Certificaciones</div>
          {% for cert in cv.certifications %}
          <div class="edu-it">
            <div class="edu-deg" style="font-size: 0.74rem;">{{ cert.name }}</div>
            <div class="edu-sch" style="font-size: 0.68rem; margin: 2px 0;">{{ cert.issuer }} — {{ cert.date }}</div>
            {% if cert.description %}<div style="font-size: 0.65rem; color: #888; line-height: 1.3; font-style: italic;">{{ cert.description }}</div>{% endif %}
            {% if cert.link %}<div style="font-size: 0.6rem; margin-top: 2px;"><a href="{{ cert.link }}" style="color: #d4ac0d; text-decoration: none; font-weight: 700;">Ver Certificado →</a></div>{% endif %}
          </div>
          {% endfor %}
          {% endif %}

          <div class="s-sec-title">Idiomas</div>
          {% for lang in cv.skills.languages %}
          <div style="margin-bottom: 9px; display: flex; justify-content: space-between; align-items: baseline;">
              <div style="font-size: 0.78rem; font-weight: 600; color: #333; text-transform: uppercase;">{{ lang.language }}</div>
              <div style="font-size: 0.7rem; color: #999; font-weight: 700;">{{ lang.level }}</div>
          </div>
          {% endfor %}

          {% if cv.personal_info.hobbies %}
          <div class="s-sec-title">Intereses</div>
          <div style="font-size: 0.74rem; color: #666; font-style: italic; line-height: 1.4;">
            {{ cv.personal_info.hobbies }}
          </div>
          {% endif %}

          {% if cv.personal_info.licenses %}
          <div class="s-sec-title">Otros Datos</div>
          <div style="font-size: 0.74rem; color: #666; line-height: 1.4;">
            <strong>Carnets:</strong> {{ cv.personal_info.licenses }}
          </div>
          {% endif %}
        </div>
      </div>
    </div>
    </body>
    </html>
    """

    EXECUTIVE_SIDEBAR_LAYOUT = """
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Raleway:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family: 'Raleway', sans-serif; background: white; color: #2d3436; }
      .cv-page { width: 100%; min-height: 1123px; display: flex; }
      .sidebar { width: 30%; background: #1a2744; color: white; padding: 40px 25px; }
      .main { width: 70%; padding: 40px 45px; }
      .photo { width: 120px; height: 120px; border-radius: 50%; border: 3px solid #d4ac0d; margin: 0 auto 20px; overflow: hidden; }
      .photo img { width: 100%; height: 100%; object-fit: cover; }
      .s-title { font-size: 0.7rem; font-weight: 700; color: #d4ac0d; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 15px; border-bottom: 1px solid rgba(212,172,13,0.3); padding-bottom: 5px; margin-top: 30px; }
      .s-content { font-size: 0.8rem; line-height: 1.6; color: rgba(255,255,255,0.8); }
      .name { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #1a2744; margin-bottom: 5px; }
      .role { font-size: 0.9rem; color: #d4ac0d; letter-spacing: 4px; uppercase; margin-bottom: 25px; }
      .section-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #1a2744; margin-bottom: 15px; border-bottom: 2px solid #f0f0f0; padding-bottom: 5px; margin-top: 30px; }
      .entry { margin-bottom: 20px; }
      .entry-header { display: flex; justify-content: space-between; font-weight: 700; font-size: 0.95rem; }
      .entry-sub { color: #666; font-size: 0.85rem; margin-bottom: 5px; }
      .entry-desc { font-size: 0.85rem; color: #555; line-height: 1.6; }
    </style>
    </head>
    <body>
      <div class="cv-page">
        <div class="sidebar">
          <div class="photo">
            {% if cv.personal_info.photo_url %}<img src="{{ cv.personal_info.photo_url }}">{% else %}{{ cv.personal_info.name[0] }}{% endif %}
          </div>
          <div class="s-title">CONTACTO</div>
          <div class="s-content">{{ cv.personal_info.phone }}<br>{{ cv.personal_info.email }}<br>{{ cv.personal_info.location }}</div>
          <div class="s-title">COMPETENCIAS</div>
          {% for s in cv.skills.technical %}<div class="s-content">• {{ s }}</div>{% endfor %}
          <div class="s-title">IDIOMAS</div>
          {% for l in cv.skills.languages %}<div class="s-content">{{ l.language }}: {{ l.level }}</div>{% endfor %}
        </div>
        <div class="main">
          <div class="name">{{ cv.personal_info.name }}</div>
          <div class="role">{{ cv.experience[0].role if cv.experience else 'Executive' }}</div>
          <div class="section-title">PERFIL</div>
          <div class="entry-desc">{{ cv.personal_info.summary }}</div>
          <div class="section-title">EXPERIENCIA</div>
          {% for exp in cv.experience %}
          <div class="entry">
            <div class="entry-header"><span>{{ exp.role }}</span><span>{{ exp.start_date }} - {{ exp.end_date }}</span></div>
            <div class="entry-sub">{{ exp.company }}</div>
            <div class="entry-desc"><ul>{% for b in exp.achievements %}<li>{{ b }}</li>{% endfor %}</ul></div>
          </div>
          {% endfor %}
          <div class="section-title">EDUCACIÓN</div>
          {% for ed in cv.education %}
          <div class="entry">
            <div class="entry-header"><span>{{ ed.degree }}</span><span>{{ ed.end_date }}</span></div>
            <div class="entry-sub">{{ ed.institution }}</div>
          </div>
          {% endfor %}
        </div>
      </div>
    </body>
    </html>
    """

    MODERN_FULL_SIDEBAR_LAYOUT = """
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family: 'Montserrat', sans-serif; background: #fff; color: #333; }
      .cv-page { width: 100%; min-height: 1123px; display: flex; }
      .sidebar { width: 35%; background: #008080; color: white; padding: 50px 30px; }
      .main { width: 65%; padding: 50px 40px; }
      .header { margin-bottom: 40px; }
      .name { font-size: 2.2rem; font-weight: 700; text-transform: uppercase; color: #008080; line-height: 1.1; }
      .role { font-size: 1rem; color: #666; margin-top: 5px; }
      .s-title { font-size: 1.1rem; font-weight: 700; border-bottom: 2px solid rgba(255,255,255,0.2); padding-bottom: 8px; margin-bottom: 20px; margin-top: 40px; }
      .s-item { font-size: 0.9rem; margin-bottom: 10px; opacity: 0.9; }
      .section-title { font-size: 1.2rem; font-weight: 700; color: #008080; margin-bottom: 20px; margin-top: 40px; border-left: 5px solid #008080; padding-left: 15px; }
      .entry { margin-bottom: 30px; }
      .entry-role { font-weight: 700; font-size: 1.1rem; }
      .entry-meta { color: #888; font-size: 0.85rem; margin-bottom: 8px; }
      .entry-desc { font-size: 0.9rem; line-height: 1.7; }
    </style>
    </head>
    <body>
      <div class="cv-page">
        <div class="sidebar">
          <div class="s-title">CONTACTO</div>
          <div class="s-item">{{ cv.personal_info.phone }}</div>
          <div class="s-item">{{ cv.personal_info.email }}</div>
          <div class="s-item">{{ cv.personal_info.location }}</div>
          <div class="s-title">HABILIDADES</div>
          {% for s in cv.skills.technical %}<div class="s-item">{{ s }}</div>{% endfor %}
          <div class="s-title">IDIOMAS</div>
          {% for l in cv.skills.languages %}<div class="s-item">{{ l.language }}: {{ l.level }}</div>{% endfor %}
        </div>
        <div class="main">
          <div class="header">
            <div class="name">{{ cv.personal_info.name }}</div>
            <div class="role">{{ cv.experience[0].role if cv.experience else '' }}</div>
          </div>
          <div class="section-title">SOBRE MÍ</div>
          <div class="entry-desc">{{ cv.personal_info.summary }}</div>
          <div class="section-title">EXPERIENCIA</div>
          {% for exp in cv.experience %}
          <div class="entry">
            <div class="entry-role">{{ exp.role }}</div>
            <div class="entry-meta">{{ exp.company }} | {{ exp.start_date }} - {{ exp.end_date }}</div>
            <div class="entry-desc"><ul>{% for b in exp.achievements %}<li>{{ b }}</li>{% endfor %}</ul></div>
          </div>
          {% endfor %}
        </div>
      </div>
    </body>
    </html>
    """

    TECH_CLEAN_LAYOUT = """
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family: 'Inter', sans-serif; background: #f4f7f6; color: #1a1a1a; padding: 40px; }
      .cv-page { max-width: 800px; margin: 0 auto; background: white; padding: 60px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      .header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 4px solid #1a1a1a; padding-bottom: 20px; margin-bottom: 40px; }
      .name { font-size: 3rem; font-weight: 900; letter-spacing: -2px; line-height: 0.9; }
      .contact { text-align: right; font-size: 0.85rem; color: #666; }
      .section { margin-bottom: 40px; display: grid; grid-template-columns: 200px 1fr; gap: 30px; }
      .section-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #888; letter-spacing: 1px; }
      .content { font-size: 0.95rem; line-height: 1.6; }
      .entry { margin-bottom: 25px; }
      .entry-title { font-weight: 700; font-size: 1.1rem; margin-bottom: 5px; }
      .entry-meta { font-size: 0.85rem; color: #0066cc; margin-bottom: 10px; font-weight: 600; }
    </style>
    </head>
    <body>
      <div class="cv-page">
        <div class="header">
          <div class="name">{{ cv.personal_info.name }}</div>
          <div class="contact">{{ cv.personal_info.phone }}<br>{{ cv.personal_info.email }}<br>{{ cv.personal_info.location }}</div>
        </div>
        <div class="section">
          <div class="section-label">Perfil</div>
          <div class="content">{{ cv.personal_info.summary }}</div>
        </div>
        <div class="section">
          <div class="section-label">Experiencia</div>
          <div class="content">
            {% for exp in cv.experience %}
            <div class="entry">
              <div class="entry-title">{{ exp.role }} / {{ exp.company }}</div>
              <div class="entry-meta">{{ exp.start_date }} - {{ exp.end_date }}</div>
              <div class="entry-desc"><ul>{% for b in exp.achievements %}<li>{{ b }}</li>{% endfor %}</ul></div>
            </div>
            {% endfor %}
          </div>
        </div>
        <div class="section">
          <div class="section-label">Habilidades</div>
          <div class="content">{{ cv.skills.technical | join(', ') }}</div>
        </div>
      </div>
    </body>
    </html>
    """

    UX_SPLIT_LAYOUT = """
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family: 'Space Grotesk', sans-serif; background: #fff; color: #222; }
      .cv-page { width: 100%; min-height: 1123px; padding: 60px; position: relative; }
      .accent-line { position: absolute; left: 0; top: 0; width: 10px; height: 100%; background: #ff4d4d; }
      .header { display: flex; border-bottom: 1px solid #eee; padding-bottom: 40px; margin-bottom: 40px; }
      .photo-box { width: 140px; height: 140px; background: #f9f9f9; border: 1px solid #eee; margin-right: 40px; overflow: hidden; }
      .photo-box img { width: 100%; height: 100%; object-fit: cover; }
      .name-group { flex: 1; }
      .name { font-size: 3.5rem; font-weight: 700; line-height: 1; margin-bottom: 10px; }
      .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9rem; color: #777; }
      .main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 60px; }
      .sec-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 25px; text-transform: lowercase; }
      .sec-title::after { content: '.'; color: #ff4d4d; }
      .exp-item { margin-bottom: 35px; }
      .exp-role { font-size: 1.2rem; font-weight: 700; margin-bottom: 5px; }
      .exp-meta { color: #ff4d4d; font-weight: 500; font-size: 0.9rem; margin-bottom: 10px; }
      .skill-tag { display: inline-block; padding: 5px 12px; border: 1px solid #222; border-radius: 20px; font-size: 0.8rem; margin: 0 5px 5px 0; font-weight: 500; }
    </style>
    </head>
    <body>
      <div class="cv-page">
        <div class="accent-line"></div>
        <div class="header">
          <div class="photo-box">
             {% if cv.personal_info.photo_url %}<img src="{{ cv.personal_info.photo_url }}">{% else %}{{ cv.personal_info.name[0] }}{% endif %}
          </div>
          <div class="name-group">
            <div class="name">{{ cv.personal_info.name }}</div>
            <div class="contact-grid">
              <span>{{ cv.personal_info.email }}</span><span>{{ cv.personal_info.phone }}</span>
              <span>{{ cv.personal_info.location }}</span>
            </div>
          </div>
        </div>
        <div class="main-grid">
          <div>
            <div class="sec-title">experiencia</div>
            {% for exp in cv.experience %}
            <div class="exp-item">
              <div class="exp-role">{{ exp.role }}</div>
              <div class="exp-meta">{{ exp.company }} // {{ exp.start_date }} - {{ exp.end_date }}</div>
              <div class="entry-desc"><ul>{% for b in exp.achievements %}<li>{{ b }}</li>{% endfor %}</ul></div>
            </div>
            {% endfor %}
          </div>
          <div>
            <div class="sec-title">habilidades</div>
            {% for s in cv.skills.technical %}
            <span class="skill-tag">{{ s }}</span>
            {% endfor %}
            <div class="sec-title" style="margin-top: 40px;">idiomas</div>
            {% for l in cv.skills.languages %}<div style="font-size: 0.9rem; margin-bottom: 5px;"><strong>{{ l.language }}</strong>: {{ l.level }}</div>{% endfor %}
          </div>
        </div>
      </div>
    </body>
    </html>
    """

    def __init__(self):
        self.env = Environment(loader=BaseLoader())
        self.templates = {
            "ceo-premium-v1": self.CEO_PREMIUM_LAYOUT,
            "executive-sidebar-v1": self.EXECUTIVE_SIDEBAR_LAYOUT,
            "modern-full-sidebar-v1": self.MODERN_FULL_SIDEBAR_LAYOUT,
            "tech-clean-v1": self.TECH_CLEAN_LAYOUT,
            "ux-split-v1": self.UX_SPLIT_LAYOUT
        }
        self.template_list = [
            {"id": "ceo-premium-v1", "name": "CEO Premium (Carlos Palacios)", "category": "Executive", "layout": "ceo-premium-v1"},
            {"id": "executive-sidebar-v1", "name": "Executive Sidebar (Alejandro Moreno)", "category": "Executive", "layout": "executive-sidebar-v1"},
            {"id": "modern-full-sidebar-v1", "name": "Modern Full Sidebar (Lucía Fernández)", "category": "Modern", "layout": "modern-full-sidebar-v1"},
            {"id": "tech-clean-v1", "name": "Tech Clean (David Sánchez)", "category": "Tech", "layout": "tech-clean-v1"},
            {"id": "ux-split-v1", "name": "UX Split (Marta Giménez)", "category": "Creative", "layout": "ux-split-v1"}
        ]

    def render_cv_html(self, cv_data: dict, template_id: str = "ceo-premium-v1") -> str:
        template_str = self.templates.get(template_id, self.CEO_PREMIUM_LAYOUT)
        jinja_template = self.env.from_string(template_str)
        return jinja_template.render(cv=cv_data)

    def get_available_templates(self):
        return self.template_list

template_engine = TemplateEngine()
