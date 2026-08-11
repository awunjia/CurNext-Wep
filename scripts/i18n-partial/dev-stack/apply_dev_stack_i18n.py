#!/usr/bin/env python3
"""Apply security/technologies/firmware/sdks/api/contact translations into locale JSON files."""
from __future__ import annotations

import copy
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
MESSAGES = ROOT / "messages"
NAMESPACES = ["security", "technologies", "firmware", "sdks", "api", "contact"]
LOCALES = ["fr", "fi", "sv", "es"]

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
CAPS_RE = re.compile(r"^[A-Z][A-Z0-9_]+$")


def walk(obj, prefix=""):
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield from walk(v, f"{prefix}.{k}" if prefix else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from walk(v, f"{prefix}[{i}]")
    elif isinstance(obj, str):
        yield prefix, obj


def set_by_path(obj, path: str, value: str) -> None:
    cur = obj
    parts = re.findall(r"[^.\[\]]+|\[\d+\]", path)
    for i, part in enumerate(parts):
        last = i == len(parts) - 1
        if part.startswith("[") and part.endswith("]"):
            idx = int(part[1:-1])
            if last:
                cur[idx] = value
            else:
                cur = cur[idx]
        else:
            if last:
                cur[part] = value
            else:
                cur = cur[part]


def is_excluded(s: str) -> bool:
    if not isinstance(s, str):
        return True
    if len(s) <= 25:
        return True
    if EMAIL_RE.match(s.strip()):
        return True
    t = s.strip()
    if t.startswith(("http://", "https://", "mailto:")):
        return True
    if t.startswith("/") and "\n" not in t and t.count(" ") <= 1:
        return True
    return False


def leftover_count(en_ns, loc_ns) -> list[tuple[str, str]]:
    en_map = dict(walk(en_ns))
    loc_map = dict(walk(loc_ns))
    out = []
    for p, s in en_map.items():
        if loc_map.get(p) == s and not is_excluded(s):
            out.append((p, s))
    return out


def load_partial(locale: str) -> dict:
    path = Path(__file__).parent / f"{locale}.json"
    return json.loads(path.read_text(encoding="utf-8"))


def apply() -> None:
    en = json.loads((MESSAGES / "en.json").read_text(encoding="utf-8"))
    report = {}
    for locale in LOCALES:
        partial = load_partial(locale)
        data = json.loads((MESSAGES / f"{locale}.json").read_text(encoding="utf-8"))
        for ns in NAMESPACES:
            if ns not in partial:
                raise SystemExit(f"Missing {ns} in {locale}.json partial")
            data[ns] = partial[ns]
        (MESSAGES / f"{locale}.json").write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        report[locale] = {}
        for ns in NAMESPACES:
            left = leftover_count(en[ns], data[ns])
            report[locale][ns] = len(left)
            if left:
                print(f"{locale}.{ns}: {len(left)} leftovers")
                for p, s in left[:12]:
                    print(f"  {p}: {s[:90]}")
    print("--- SUMMARY ---")
    for locale in LOCALES:
        print(locale, report[locale])


if __name__ == "__main__":
    apply()
