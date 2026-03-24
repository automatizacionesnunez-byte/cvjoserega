import json
from jinja2 import Environment, BaseLoader

class TemplateEngine:
    def __init__(self):
        self.env = Environment(loader=BaseLoader())
        
        # Comprehensive Modern Template (Supports Photo, Custom Sections, Present flags)
        modern = """
        <html>
        <head>
            <style>
                body { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; color: #222; line-height: 1.5; margin: 40px; }
                .header { display: flex; align-items: center; border-bottom: 2px solid #2A52BE; padding-bottom: 20px; margin-bottom: 20px; }
                .photo { border-radius: 50%; width: 100px; height: 100px; object-fit: cover; margin-right: 20px; }
                h1 { color: #2A52BE; font-size: 2.2em; margin: 0; }
                .summary { margin-top: 5px; font-size: 0.95em; color: #555; }
                .contact { color: #666; font-size: 0.85em; margin-top: 10px; }
                h2 { color: #2A52BE; font-size: 1.3em; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 30px; }
                .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-top: 15px; }
                .title { font-weight: 600; font-size: 1.1em; }
                .company { font-weight: 500; color: #444; font-style: italic; }
                .date { color: #888; font-size: 0.9em; }
                ul { margin-top: 5px; padding-left: 20px; }
                li { margin-bottom: 4px; font-size: 0.95em; }
                .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
                .skill-badge { background: #f0f4ff; color: #2A52BE; padding: 5px 10px; border-radius: 4px; font-size: 0.85em; font-weight: 500; }
            </style>
        </head>
        <body>
            <div class="header">
                {% if cv.personal_info.photo_url %}
                    <img src="{{ cv.personal_info.photo_url }}" class="photo" alt="Profile Photo">
                {% endif %}
                <div>
                    <h1>{{ cv.personal_info.name }}</h1>
                    <div class="contact">
                        {{ cv.personal_info.email }} &bull; {{ cv.personal_info.phone }} &bull; {{ cv.personal_info.location }}<br/>
                        {% if cv.personal_info.linkedin %}<a href="{{ cv.personal_info.linkedin }}">LinkedIn</a> &bull; {% endif %}
                        {% if cv.personal_info.website %}<a href="{{ cv.personal_info.website }}">Portfolio</a>{% endif %}
                    </div>
                </div>
            </div>
            {% if cv.personal_info.summary %}
                <p class="summary">{{ cv.personal_info.summary }}</p>
            {% endif %}
            
            <div class="section">
                <h2>Experiencia Profesional</h2>
                {% for exp in cv.experience %}
                <div>
                    <div class="item-header">
                        <span class="title">{{ exp.role }} <span class="company">at {{ exp.company }}</span></span>
                        <span class="date">{{ exp.start_date }} - {% if exp.present %}Presente{% else %}{{ exp.end_date }}{% endif %}</span>
                    </div>
                    <ul>
                    {% for bullet in exp.achievements %}
                        <li>{{ bullet }}</li>
                    {% endfor %}
                    </ul>
                </div>
                {% endfor %}
            </div>
            
            <div class="section">
                <h2>Educación</h2>
                {% for ed in cv.education %}
                <div>
                    <div class="item-header">
                        <span class="title">{{ ed.degree }} <span class="company">at {{ ed.institution }}</span></span>
                        <span class="date">{{ ed.start_date }} - {% if ed.present %}Presente{% else %}{{ ed.end_date }}{% endif %}</span>
                    </div>
                </div>
                {% endfor %}
            </div>
            
            <div class="section">
                <h2>Habilidades e Idiomas</h2>
                <div class="skills-grid">
                    {% for skill in cv.skills.technical %}
                        <span class="skill-badge">{{ skill }}</span>
                    {% endfor %}
                    {% for lang in cv.skills.languages %}
                        <span class="skill-badge">{{ lang.language }} ({{ lang.level }})</span>
                    {% endfor %}
                </div>
            </div>

            {% if cv.custom_sections %}
                {% for section in cv.custom_sections %}
                <div class="section">
                    <h2>{{ section.title }}</h2>
                    {% for item in section.items %}
                        <div>
                            <strong>{{ item.title }}</strong>: {{ item.description }}
                        </div>
                    {% endfor %}
                </div>
                {% endfor %}
            {% endif %}
        </body>
        </html>
        """
        
        # Classic Template (Minimalist, no photo usually)
        classic = """
        <html>
        <head>
            <style>
                body { font-family: 'Times New Roman', Times, serif; color: #000; line-height: 1.4; margin: 40px 60px; }
                h1 { text-align: center; text-transform: uppercase; font-size: 2em; margin-bottom: 5px; }
                .contact { text-align: center; font-size: 0.9em; margin-bottom: 20px; }
                h2 { text-transform: uppercase; border-bottom: 1px solid #000; font-size: 1.1em; margin-top: 25px; }
                .flex-row { display: flex; justify-content: space-between; }
                .bold { font-weight: bold; }
                .italic { font-style: italic; }
                ul { margin-top: 3px; padding-left: 20px; }
            </style>
        </head>
        <body>
            <h1>{{ cv.personal_info.name }}</h1>
            <div class="contact">
                {{ cv.personal_info.email }} | {{ cv.personal_info.phone }} | {{ cv.personal_info.location }}<br/>
                {{ cv.personal_info.linkedin }}
            </div>
            
            <div class="section">
                <h2>Professional Experience</h2>
                {% for exp in cv.experience %}
                <div style="margin-top: 10px;">
                    <div class="flex-row">
                        <span class="bold">{{ exp.company }}</span>
                        <span>{{ exp.start_date }} - {% if exp.present %}Present{% else %}{{ exp.end_date }}{% endif %}</span>
                    </div>
                    <div class="italic">{{ exp.role }}</div>
                    <ul>
                    {% for bullet in exp.achievements %}
                        <li>{{ bullet }}</li>
                    {% endfor %}
                    </ul>
                </div>
                {% endfor %}
            </div>
            
            <div class="section">
                <h2>Education</h2>
                {% for ed in cv.education %}
                <div style="margin-top: 10px;">
                    <div class="flex-row">
                        <span class="bold">{{ ed.institution }}</span>
                        <span>{{ ed.start_date }} - {% if ed.present %}Present{% else %}{{ ed.end_date }}{% endif %}</span>
                    </div>
                    <div>{{ ed.degree }}</div>
                </div>
                {% endfor %}
            </div>
        </body>
        </html>
        """

        # 1. Professional-Light (The Modern Academic)
        professional_light = """
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');
                body { font-family: 'Inter', sans-serif; color: #334155; line-height: 1.6; margin: 0; padding: 40px; background: #fff; }
                h1 { font-family: 'Playfair Display', serif; color: #1E293B; font-size: 3.5rem; margin: 0; line-height: 1.1; }
                .subtitle { color: #64748b; font-size: 1.1rem; font-weight: 500; margin-top: 5px; text-transform: uppercase; letter-spacing: 0.05em; }
                .contact { color: #64748b; font-size: 0.85rem; margin-top: 15px; display: flex; gap: 15px; }
                h2 { font-family: 'Playfair Display', serif; color: #1E293B; font-size: 1.5rem; border-bottom: 2px solid #1E293B; padding-bottom: 8px; margin-top: 40px; text-transform: uppercase; }
                .section { margin-bottom: 30px; }
                .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-top: 20px; }
                .title { font-weight: 600; font-size: 1.125rem; color: #1E293B; }
                .company { font-weight: 500; color: #64748b; font-style: italic; }
                .date { color: #94a3b8; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
                ul { margin-top: 10px; padding-left: 20px; }
                li { margin-bottom: 8px; font-size: 0.875rem; }
                .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 15px; }
                .skill-item { font-size: 0.875rem; font-weight: 500; color: #475569; position: relative; padding-left: 15px; }
                .skill-item:before { content: '■'; position: absolute; left: 0; color: #1E293B; font-size: 0.6rem; top: 4px; }
            </style>
        </head>
        <body>
            <header>
                <h1>{{ cv.personal_info.name }}</h1>
                <div class="subtitle">{{ cv.experience[0].role if cv.experience else 'Professional' }}</div>
                <div class="contact">
                    <span>{{ cv.personal_info.email }}</span> | <span>{{ cv.personal_info.phone }}</span> | <span>{{ cv.personal_info.location }}</span>
                </div>
            </header>

            <div class="section">
                <h2>Resumen Profesional</h2>
                <p>{{ cv.personal_info.summary }}</p>
            </div>
            
            <div class="section">
                <h2>Experiencia</h2>
                {% for exp in cv.experience %}
                <div>
                    <div class="item-header">
                        <span class="title">{{ exp.role }} <span class="company">| {{ exp.company }}</span></span>
                        <span class="date">{{ exp.start_date }} - {{ exp.end_date if not exp.present else 'Actualidad' }}</span>
                    </div>
                    <ul>
                    {% for bullet in exp.achievements %}
                        <li>{{ bullet }}</li>
                    {% endfor %}
                    </ul>
                </div>
                {% endfor %}
            </div>
            
            <div class="section">
                <h2>Educación</h2>
                {% for ed in cv.education %}
                <div class="item-header">
                    <span class="title">{{ ed.degree }} <span class="company">| {{ ed.institution }}</span></span>
                    <span class="date">{{ ed.start_date }} - {{ ed.end_date if not ed.present else 'Actualidad' }}</span>
                </div>
                {% endfor %}
            </div>
            
            <div class="section">
                <h2>Habilidades</h2>
                <div class="skills-grid">
                    {% for skill in cv.skills.technical %}
                        <div class="skill-item">{{ skill }}</div>
                    {% endfor %}
                </div>
            </div>
        </body>
        </html>
        """

        # 2. Professional-Dark (The Kinetic Architect)
        professional_dark = """
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Manrope:wght@400;600&display=swap');
                body { font-family: 'Manrope', sans-serif; color: #dae2fd; line-height: 1.6; margin: 0; padding: 0; background: #0b1326; }
                .container { display: flex; min-height: 100vh; }
                .sidebar { width: 30%; background: #131b2e; padding: 40px; border-right: 1px solid rgba(255,255,255,0.05); }
                .main { width: 70%; padding: 40px 60px; }
                h1 { font-family: 'Space Grotesk', sans-serif; font-size: 3rem; margin: 0; color: #fff; line-height: 1; letter-spacing: -0.02em; }
                .role-tag { color: #6366F1; font-family: 'Space Grotesk', sans-serif; font-weight: 700; text-transform: uppercase; font-size: 0.9rem; margin-top: 10px; letter-spacing: 0.1em; }
                h2 { font-family: 'Space Grotesk', sans-serif; color: #c0c1ff; font-size: 1.25rem; text-transform: uppercase; letter-spacing: 0.15em; margin-top: 40px; margin-bottom: 20px; }
                .contact-item { font-size: 0.8rem; margin-bottom: 15px; color: #a3aac4; display: flex; align-items: center; gap: 10px; }
                .contact-item b { color: #fff; width: 20px; text-align: center; }
                .experience-item { margin-bottom: 35px; position: relative; padding-left: 20px; border-left: 2px solid rgba(99, 102, 241, 0.2); }
                .experience-item:before { content: ''; position: absolute; left: -6px; top: 8px; width: 10px; height: 10px; background: #6366F1; border-radius: 50%; box-shadow: 0 0 10px #6366F1; }
                .job-title { font-weight: 700; font-size: 1.25rem; color: #fff; }
                .job-company { color: #6366F1; font-weight: 600; }
                .job-date { color: #6d758c; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; margin-bottom: 10px; }
                ul { padding-left: 20px; margin-top: 10px; }
                li { font-size: 0.9rem; color: #c7c4d7; margin-bottom: 8px; }
                .skill-pill { display: inline-block; background: rgba(139, 92, 246, 0.1); color: #be83fa; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; margin: 4px; border: 1px solid rgba(139, 92, 246, 0.2); }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="sidebar">
                    <header>
                        <h1>{{ cv.personal_info.name.split(' ')[0] }}<br/>{{ cv.personal_info.name.split(' ')[1] if cv.personal_info.name.split(' ')|length > 1 else '' }}</h1>
                        <div class="role-tag">{{ cv.experience[0].role if cv.experience else 'Innovator' }}</div>
                    </header>
                    
                    <h2>Contacto</h2>
                    <div class="contact-item"><b>@</b> {{ cv.personal_info.email }}</div>
                    <div class="contact-item"><b>#</b> {{ cv.personal_info.phone }}</div>
                    <div class="contact-item"><b>L</b> {{ cv.personal_info.location }}</div>

                    <h2>Habilidades</h2>
                    {% for skill in cv.skills.technical %}
                        <span class="skill-pill">{{ skill }}</span>
                    {% endfor %}
                    
                    <h2>Idiomas</h2>
                    {% for lang in cv.skills.languages %}
                        <div class="contact-item"><b>></b> {{ lang.language }} ({{ lang.level }})</div>
                    {% endfor %}
                </div>
                <div class="main">
                    <section>
                        <h2>Resumen Ejecutivo</h2>
                        <p style="color: #c7c4d7; font-size: 1rem;">{{ cv.personal_info.summary }}</p>
                    </section>
                    
                    <section>
                        <h2>Trayectoria</h2>
                        {% for exp in cv.experience %}
                        <div class="experience-item">
                            <div class="job-date">{{ exp.start_date }} — {{ exp.end_date if not exp.present else 'PRESENT' }}</div>
                            <div class="job-title">{{ exp.role }}</div>
                            <div class="job-company">{{ exp.company }}</div>
                            <ul>
                            {% for bullet in exp.achievements %}
                                <li>{{ bullet }}</li>
                            {% endfor %}
                            </ul>
                        </div>
                        {% endfor %}
                    </section>
                </div>
            </div>
        </body>
        </html>
        """

        # 3. Professional-Modern (The Editorial Engineer)
        professional_modern = """
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500&display=swap');
                body { font-family: 'Inter', sans-serif; color: #1b1b1b; line-height: 1.6; margin: 0; padding: 60px; background: #f9f9f9; }
                .header-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; margin-bottom: 60px; }
                h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 4rem; font-weight: 800; margin: 0; letter-spacing: -0.04em; line-height: 0.9; }
                .accent-bar { width: 60px; height: 8px; background: #4F46E5; margin-top: 20px; }
                .contact-box { background: #fff; padding: 25px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
                .contact-box div { font-size: 0.85rem; margin-bottom: 8px; color: #4F46E5; font-weight: 600; }
                h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.75rem; font-weight: 800; margin-top: 50px; display: flex; align-items: center; gap: 15px; }
                h2:before { content: ''; width: 6px; height: 24px; background: #4F46E5; border-radius: 3px; }
                .experience-grid { display: grid; grid-template-columns: 1fr; gap: 40px; }
                .exp-card { background: #fff; padding: 30px; border-radius: 24px; border: 1px solid #eee; }
                .metrics-row { display: flex; gap: 40px; margin-top: 30px; }
                .metric-item { flex: 1; }
                .metric-num { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.5rem; font-weight: 800; color: #4F46E5; line-height: 1; }
                .metric-label { font-size: 0.75rem; font-weight: 600; color: #7c3aed; text-transform: uppercase; }
            </style>
        </head>
        <body>
            <div class="header-grid">
                <div>
                    <h1>{{ cv.personal_info.name.split(' ')[0] }}<br/><span style="color: #4F46E5;">{{ cv.personal_info.name.split(' ')[1:]|join(' ') }}</span></h1>
                    <div class="accent-bar"></div>
                </div>
                <div class="contact-box">
                    <div>EMAIL: {{ cv.personal_info.email }}</div>
                    <div>PHONE: {{ cv.personal_info.phone }}</div>
                    <div>LOC: {{ cv.personal_info.location }}</div>
                </div>
            </div>

            <p style="font-size: 1.25rem; font-weight: 500; max-width: 80%; margin-bottom: 40px;">{{ cv.personal_info.summary }}</p>

            <h2>Experiencia Impactante</h2>
            <div class="experience-grid">
                {% for exp in cv.experience %}
                <div class="exp-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="font-size: 1.25rem; font-weight: 700;">{{ exp.role }}</span>
                        <span style="color: #4F46E5; font-weight: 600;">{{ exp.company }}</span>
                    </div>
                    <ul style="color: #464555;">
                        {% for bullet in exp.achievements %}
                            <li>{{ bullet }}</li>
                        {% endfor %}
                    </ul>
                </div>
                {% endfor %}
            </div>

            <div class="metrics-row">
                <div class="metric-item">
                    <div class="metric-num">100%</div>
                    <div class="metric-label">Compromiso</div>
                </div>
                <div class="metric-item">
                    <div class="metric-num">{{ cv.skills.technical|length }}+</div>
                    <div class="metric-label">Tech Tools</div>
                </div>
            </div>
        </body>
        </html>
        """

        # 4. Eye-Catching (The Modern Curator)
        eye_catching = """
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;900&family=Inter:wght@400;500&display=swap');
                body { font-family: 'Inter', sans-serif; color: #111827; margin: 0; background: #F9FAFB; padding: 0; }
                header { background: linear-gradient(135deg, #FDA4AF, #FB7185); padding: 80px 60px; color: #fff; border-bottom-left-radius: 60px; border-bottom-right-radius: 60px; position: relative; }
                .avatar { width: 150px; height: 150px; border-radius: 50%; border: 8px solid rgba(255,255,255,0.3); background: #eee; position: absolute; right: 60px; top: -75px; background-size: cover; display: none; }
                h1 { font-family: 'Outfit', sans-serif; font-size: 4.5rem; font-weight: 900; margin: 0; line-height: 1; letter-spacing: -2px; }
                .brand-box { background: rgba(255,255,255,0.15); padding: 15px 25px; border-radius: 20px; font-weight: 700; font-size: 1.1rem; margin-top: 25px; display: inline-block; backdrop-blur: 10px; }
                .main { padding: 60px; display: grid; grid-template-columns: 2fr 1fr; gap: 60px; }
                h2 { font-family: 'Outfit', sans-serif; font-size: 2rem; color: #FB7185; margin-bottom: 25px; }
                .card { background: #fff; padding: 40px; border-radius: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.03); margin-bottom: 40px; border: 1px solid #f3f4f6; }
                .skill-row { margin-bottom: 15px; }
                .skill-bar { height: 12px; width: 100%; background: #f3f4f6; border-radius: 6px; overflow: hidden; margin-top: 5px; }
                .skill-progress { height: 100%; background: #FDA4AF; width: 85%; border-radius: 6px; }
            </style>
        </head>
        <body>
            <header>
                <h1>{{ cv.personal_info.name }}</h1>
                <div class="brand-box">{{ cv.experience[0].role if cv.experience else 'Creative Strategist' }}</div>
                <div style="margin-top: 20px; display: flex; gap: 20px; font-weight: 500; opacity: 0.9;">
                    <span>{{ cv.personal_info.email }}</span> | <span>{{ cv.personal_info.phone }}</span>
                </div>
            </header>
            <div class="main">
                <div>
                    <div class="card">
                        <h2>Trayectoria Creativa</h2>
                        {% for exp in cv.experience %}
                        <div style="margin-bottom: 30px;">
                            <h3 style="margin: 0; font-size: 1.5rem;">{{ exp.role }}</h3>
                            <p style="color: #FB7185; font-weight: 700; margin: 5px 0;">{{ exp.company }}</p>
                            <p style="color: #6b7280; font-size: 0.9rem;">{{ exp.start_date }} — {{ exp.end_date if not exp.present else 'Actualidad' }}</p>
                            <ul style="color: #4b5563;">
                                {% for bullet in exp.achievements %}
                                    <li>{{ bullet }}</li>
                                {% endfor %}
                            </ul>
                        </div>
                        {% endfor %}
                    </div>
                </div>
                <div>
                    <div class="card">
                        <h2>Habilidades</h2>
                        {% for skill in cv.skills.technical %}
                        <div class="skill-row">
                            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">
                                <span>{{ skill }}</span>
                                <span>PRO</span>
                            </div>
                            <div class="skill-bar"><div class="skill-progress"></div></div>
                        </div>
                        {% endfor %}
                    </div>
                    
                    <div class="card" style="background: #111827; color: #fff;">
                        <h2 style="color: #FDA4AF;">Educación</h2>
                        {% for ed in cv.education %}
                            <p style="margin-bottom: 5px; font-weight: 700;">{{ ed.degree }}</p>
                            <p style="margin: 0; font-size: 0.8rem; opacity: 0.7;">{{ ed.institution }}</p>
                        {% endfor %}
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        # 5. Dev-Focus (The Fullstack Architect)
        dev_focus = """
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;700&display=swap');
                body { font-family: 'Inter', sans-serif; color: #e2e8f0; line-height: 1.6; margin: 0; padding: 40px; background: #0f172a; }
                header { border-left: 4px solid #38bdf8; padding-left: 30px; margin-bottom: 50px; }
                h1 { font-family: 'JetBrains Mono', monospace; font-size: 3rem; margin: 0; color: #fff; }
                .terminal-line { font-family: 'JetBrains Mono', monospace; color: #38bdf8; font-size: 0.9rem; margin-top: 5px; }
                h2 { font-family: 'JetBrains Mono', monospace; color: #38bdf8; font-size: 1.2rem; margin-top: 40px; text-transform: uppercase; letter-spacing: 0.1em; display: flex; align-items: center; gap: 10px; }
                h2:before { content: 'root@cv:~$'; opacity: 0.5; font-size: 0.7em; }
                .exp-box { background: #1e293b; padding: 25px; border-radius: 12px; margin-top: 15px; border: 1px solid #334155; }
                .role { font-weight: 700; color: #fff; font-size: 1.2rem; }
                .company { color: #94a3b8; }
                .date { float: right; color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; }
                .skill-tag { display: inline-block; background: #0ea5e9; color: #fff; padding: 2px 8px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; margin: 3px; }
            </style>
        </head>
        <body>
            <header>
                <h1>{{ cv.personal_info.name }}</h1>
                <div class="terminal-line">> {{ cv.experience[0].role if cv.experience else 'Engineer' }} | {{ cv.personal_info.location }}</div>
                <div class="terminal-line">> {{ cv.personal_info.email }} | {{ cv.personal_info.phone }}</div>
            </header>
            
            <p style="color: #94a3b8; border-left: 2px solid #334155; padding-left: 20px;">{{ cv.personal_info.summary }}</p>

            <h2>Experience</h2>
            {% for exp in cv.experience %}
            <div class="exp-box">
                <span class="date">{{ exp.start_date }} - {{ exp.end_date if not exp.present else 'Present' }}</span>
                <div class="role">{{ exp.role }}</div>
                <div class="company">{{ exp.company }}</div>
                <ul style="margin-top: 15px; color: #cbd5e1;">
                    {% for bullet in exp.achievements %}
                        <li>{{ bullet }}</li>
                    {% endfor %}
                </ul>
            </div>
            {% endfor %}

            <h2>Tech Stack</h2>
            <div style="margin-top: 15px;">
                {% for skill in cv.skills.technical %}
                    <span class="skill-tag">{{ skill }}</span>
                {% endfor %}
            </div>
        </body>
        </html>
        """

        # 6. Executive-Blue (The Corporate Formal)
        executive_blue = """
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,600;0,700;1,400&family=Montserrat:wght@400;500;700&display=swap');
                body { font-family: 'Montserrat', sans-serif; color: #333; margin: 0; padding: 0; line-height: 1.4; }
                .blue-bar { height: 15px; background: #1e3a8a; width: 100%; }
                .header { padding: 50px 60px; background: #f8fafc; border-bottom: 5px solid #1e3a8a; }
                h1 { font-family: 'Crimson Pro', serif; font-size: 3.5rem; margin: 0; color: #1e3a8a; }
                .contact { display: flex; justify-content: space-between; margin-top: 20px; font-size: 0.8rem; font-weight: 500; color: #64748b; }
                .main { padding: 40px 60px; }
                h2 { font-size: 1rem; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; margin-top: 35px; text-transform: uppercase; letter-spacing: 0.1em; }
                .exp-item { margin-top: 20px; }
                .flex-between { display: flex; justify-content: space-between; align-items: baseline; }
                .bold { font-weight: 700; color: #1e293b; }
                .sidebar-box { margin-top: 40px; }
            </style>
        </head>
        <body>
            <div class="blue-bar"></div>
            <header class="header">
                <h1>{{ cv.personal_info.name }}</h1>
                <div class="contact">
                    <span>{{ cv.personal_info.location }}</span>
                    <span>{{ cv.personal_info.email }}</span>
                    <span>{{ cv.personal_info.phone }}</span>
                </div>
            </header>
            <div class="main">
                <section>
                    <p style="font-family: 'Crimson Pro', serif; font-size: 1.25rem; font-style: italic; color: #475569;">{{ cv.personal_info.summary }}</p>
                </section>
                
                <section>
                    <h2>Historial Corporativo</h2>
                    {% for exp in cv.experience %}
                    <div class="exp-item">
                        <div class="flex-between">
                            <span class="bold" style="font-size: 1.1rem;">{{ exp.role }}</span>
                            <span style="font-size: 0.8rem; font-weight: 600;">{{ exp.start_date }} — {{ exp.end_date if not exp.present else 'ACTUALIDAD' }}</span>
                        </div>
                        <div style="color: #1e3a8a; font-weight: 600; font-size: 0.9rem; margin-bottom: 10px;">{{ exp.company }}</div>
                        <ul style="font-size: 0.9rem; color: #334155;">
                            {% for bullet in exp.achievements %}
                                <li>{{ bullet }}</li>
                            {% endfor %}
                        </ul>
                    </div>
                    {% endfor %}
                </section>
            </div>
        </body>
        </html>
        """

        # 7. Minimal-Grid (The Design Portfolio)
        minimal_grid = """
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap');
                body { font-family: 'Outfit', sans-serif; color: #111; margin: 0; padding: 60px; background: white; }
                .grid-container { display: grid; grid-template-columns: 200px 1fr; gap: 60px; }
                h1 { font-size: 4rem; font-weight: 800; margin: 0; line-height: 0.8; letter-spacing: -2px; }
                .top-info { border-bottom: 10px solid #000; padding-bottom: 30px; margin-bottom: 50px; }
                h2 { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3em; color: #999; margin-bottom: 20px; }
                .content-block { margin-bottom: 40px; }
                .year { font-weight: 800; font-size: 0.8rem; }
                .job-box { margin-bottom: 30px; }
            </style>
        </head>
        <body>
            <div class="top-info">
                <h1>{{ cv.personal_info.name.split(' ')[0] }}<br/>{{ cv.personal_info.name.split(' ')[1:]|join(' ') }}</h1>
                <div style="margin-top: 30px; font-weight: 600; font-size: 1.2rem;">{{ cv.experience[0].role if cv.experience else '' }}</div>
            </div>
            
            <div class="grid-container">
                <aside>
                    <div class="content-block">
                        <h2>Contacto</h2>
                        <div style="font-size: 0.8rem; line-height: 2;">
                            {{ cv.personal_info.email }}<br/>
                            {{ cv.personal_info.phone }}<br/>
                            {{ cv.personal_info.location }}
                        </div>
                    </div>
                    <div class="content-block">
                        <h2>Tech</h2>
                        <div style="font-size: 0.8rem; font-weight: 600; line-height: 2;">
                        {% for skill in cv.skills.technical %}
                            {{ skill }}<br/>
                        {% endfor %}
                        </div>
                    </div>
                </aside>
                
                <main>
                    <div class="content-block">
                        <h2>Perfil</h2>
                        <p style="font-size: 1.1rem; margin: 0;">{{ cv.personal_info.summary }}</p>
                    </div>
                    
                    <div class="content-block">
                        <h2>Trayectoria</h2>
                        {% for exp in cv.experience %}
                        <div class="job-box">
                            <span class="year">{{ exp.start_date.split(' ')[-1] if ' ' in exp.start_date else exp.start_date }} — {{ exp.end_date.split(' ')[-1] if not exp.present and ' ' in exp.end_date else 'PRES' }}</span>
                            <div style="font-weight: 800; font-size: 1.3rem; margin-top: 5px;">{{ exp.role }}</div>
                            <div style="font-weight: 600; opacity: 0.5;">{{ exp.company }}</div>
                        </div>
                        {% endfor %}
                    </div>
                </main>
            </div>
        </body>
        </html>
        """

        self.templates = {
            "modern": modern,
            "classic": classic,
            "professional-light": professional_light,
            "professional-dark": professional_dark,
            "professional-modern": professional_modern,
            "eye-catching": eye_catching,
            "dev-focus": dev_focus,
            "executive-blue": executive_blue,
            "minimal-grid": minimal_grid
        }

        # Expansion to 20 templates by variants/aliases
        self.template_list = [
            {"id": "professional-light-v1", "name": "Ivory Archive", "category": "Professional-Light", "alias": "professional-light"},
            {"id": "professional-light-v2", "name": "Minimal Academic", "category": "Professional-Light", "alias": "professional-light"},
            {"id": "professional-light-v3", "name": "Executive White", "category": "Professional-Light", "alias": "professional-light"},
            {"id": "professional-dark-v1", "name": "Aetheric Tech", "category": "Professional-Dark", "alias": "professional-dark"},
            {"id": "professional-dark-v2", "name": "Midnight Executive", "category": "Professional-Dark", "alias": "professional-dark"},
            {"id": "professional-dark-v3", "name": "Ocean Graphite", "category": "Professional-Dark", "alias": "professional-dark"},
            {"id": "professional-modern-v1", "name": "Indigo Matrix", "category": "Professional-Modern", "alias": "professional-modern"},
            {"id": "professional-modern-v2", "name": "Startup Flow", "category": "Professional-Modern", "alias": "professional-modern"},
            {"id": "professional-modern-v3", "name": "Product Edge", "category": "Professional-Modern", "alias": "professional-modern"},
            {"id": "eye-catching-v1", "name": "Rose Curator", "category": "Eye-Catching", "alias": "eye-catching"},
            {"id": "eye-catching-v2", "name": "Vibrant Portfolio", "category": "Eye-Catching", "alias": "eye-catching"},
            {"id": "eye-catching-v3", "name": "Creative Surge", "category": "Eye-Catching", "alias": "eye-catching"},
            {"id": "dev-focus-v1", "name": "Kernel Architect", "category": "Tech-Special", "alias": "dev-focus"},
            {"id": "dev-focus-v2", "name": "Fullstack Cloud", "category": "Tech-Special", "alias": "dev-focus"},
            {"id": "executive-blue-v1", "name": "Blue Chip Leader", "category": "Executive", "alias": "executive-blue"},
            {"id": "executive-blue-v2", "name": "Royal Corporate", "category": "Executive", "alias": "executive-blue"},
            {"id": "minimal-grid-v1", "name": "Grid Curator", "category": "Minimalist", "alias": "minimal-grid"},
            {"id": "minimal-grid-v2", "name": "Swiss Type", "category": "Minimalist", "alias": "minimal-grid"},
            {"id": "classic", "name": "Standard Times", "category": "Clásico", "alias": "classic"},
            {"id": "modern", "name": "Default Spark", "category": "Moderno", "alias": "modern"},
        ]

    def render_cv_html(self, cv_data: dict, template_id: str = "professional-modern-v1") -> str:
        # Find template by ID or Category alias
        tpl_entry = next((t for t in self.template_list if t["id"] == template_id), None)
        if not tpl_entry:
            tpl_entry = {"alias": "modern"}
            
        alias = tpl_entry["alias"]
        template_str = self.templates.get(alias, self.templates["modern"])
        
        jinja_template = self.env.from_string(template_str)
        return jinja_template.render(cv=cv_data)

    def get_available_templates(self):
        return self.template_list

template_engine = TemplateEngine()
