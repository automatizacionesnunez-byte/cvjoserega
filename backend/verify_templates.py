import sys
import os

# Add backend to path
sys.path.append(os.getcwd())

try:
    from app.core.template_engine import template_engine
    templates = template_engine.get_available_templates()
    ids = [t['id'] for t in templates]
    
    required = ['professional-teal-v1', 'executive-classic-v1', 'modern-accent-v1']
    missing = [r for r in required if r not in ids]
    
    if not missing:
        print("SUCCESS: All new templates registered correctly.")
    else:
        print(f"ERROR: Missing templates: {missing}")
        sys.exit(1)
except Exception as e:
    print(f"CRITICAL ERROR: {e}")
    sys.exit(1)
