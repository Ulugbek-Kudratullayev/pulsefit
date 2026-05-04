#!/usr/bin/env python
"""Django'ning admin vazifalari uchun command-line yordamchisi."""
import os
import sys


def main():
    """Asosiy administrativ vazifalarni bajarish."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Django import qilib bo'lmadi. Virtualenv faollashtirilganmi?\n"
            "Buyruq: python -m venv venv && venv\\Scripts\\activate && pip install -r requirements.txt"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
