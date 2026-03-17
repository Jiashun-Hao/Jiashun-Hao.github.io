"""
批量修复 Astro 博客 frontmatter 脚本（兼容 Python 3.8+）
处理路径: src/content/blog 下所有子文件夹的 index.md

修复内容：
1. publishDate: 从 date 字段提取标准日期，或修复格式
2. description: 缺失时从文章正文首段自动提取
3. tags: 去除标签中的 # 前缀，过滤 null 值
4. language: 缺失时根据内容自动判断
"""

import os
import re
import glob
from typing import Optional, Tuple

BLOG_DIR = r"C:\Users\lenovo\Desktop\blog\Jiashun-Hao.github.io\src\content\blog"


def extract_date(raw):
    m = re.search(r"(\d{4})-(\d{2})-(\d{2})", raw)
    if m:
        return m.group(0)
    m = re.search(r"(\d{4})/(\d{2})/(\d{2})", raw)
    if m:
        return m.group(0).replace("/", "-")
    m = re.search(r"(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日", raw)
    if m:
        return "{}-{:02d}-{:02d}".format(m.group(1), int(m.group(2)), int(m.group(3)))
    return None


def is_valid_date(s):
    return bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}", s.strip()))


def detect_language(text):
    chinese_chars = len(re.findall(r"[\u4e00-\u9fff]", text))
    return "Chinese" if chinese_chars > 50 else "English"


def extract_description(body, max_len=100):
    lines = body.strip().splitlines()
    for line in lines:
        line = line.strip()
        if not line or line.startswith("#") or line.startswith("!") or line.startswith("```"):
            continue
        clean = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", line)
        clean = re.sub(r"[*_`]", "", clean)
        clean = clean.strip()
        if len(clean) > 10:
            return clean[:max_len] + ("..." if len(clean) > max_len else "")
    return "暂无描述"


def parse_frontmatter(content):
    if not content.startswith("---"):
        return None, content
    end = content.find("\n---", 3)
    if end == -1:
        return None, content
    fm_block = content[3:end].strip()
    body = content[end + 4:].strip()
    return fm_block, body


def fix_tags_line(line):
    m = re.match(r"^(\s*-\s*)(.*)$", line)
    if not m:
        return line
    prefix, value = m.group(1), m.group(2).strip()
    value = value.strip("'\"")
    if value.startswith("#"):
        value = value[1:].strip()
    if not value or value.lower() == "null":
        return None
    return "{}'{}'".format(prefix, value)


def process_frontmatter(fm_block, body):
    lines = fm_block.splitlines()
    result = []

    has_publish_date = False
    has_description = False
    has_language = False
    has_tags = False

    i = 0
    while i < len(lines):
        line = lines[i]

        if re.match(r"^publishDate\s*:", line):
            val = re.sub(r"^publishDate\s*:\s*", "", line).strip().strip("'\"")
            if is_valid_date(val):
                result.append("publishDate: {}".format(val))
            else:
                extracted = extract_date(val)
                result.append("publishDate: {}".format(extracted or "2024-01-01"))
            has_publish_date = True
            i += 1
            continue

        if re.match(r"^date\s*:", line):
            val = re.sub(r"^date\s*:\s*", "", line).strip().strip("'\"")
            extracted = extract_date(val)
            result.append("publishDate: {}".format(extracted or "2024-01-01"))
            has_publish_date = True
            i += 1
            continue

        if re.match(r"^description\s*:", line):
            val = re.sub(r"^description\s*:\s*", "", line).strip().strip("'\"")
            if val and val.lower() != "null":
                result.append("description: '{}'".format(val))
            else:
                result.append("description: '{}'".format(extract_description(body)))
            has_description = True
            i += 1
            continue

        if re.match(r"^language\s*:", line):
            result.append(line)
            has_language = True
            i += 1
            continue

        if re.match(r"^tags\s*:", line):
            result.append("tags:")
            has_tags = True
            i += 1
            fixed_tags = []
            while i < len(lines) and re.match(r"^\s+-", lines[i]):
                fixed = fix_tags_line(lines[i])
                if fixed:
                    fixed_tags.append(fixed)
                i += 1
            if not fixed_tags:
                fixed_tags.append("  - '未分类'")
            result.extend(fixed_tags)
            continue

        result.append(line)
        i += 1

    if not has_publish_date:
        result.append("publishDate: 2024-01-01")
    if not has_description:
        result.append("description: '{}'".format(extract_description(body)))
    if not has_language:
        result.append("language: '{}'".format(detect_language(body)))
    if not has_tags:
        result.append("tags:\n  - '未分类'")

    return "\n".join(result)


def fix_file(filepath, dry_run=False):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    fm_block, body = parse_frontmatter(content)
    if fm_block is None:
        return "⚠️  跳过（无 frontmatter）"

    fixed_fm = process_frontmatter(fm_block, body)
    new_content = "---\n{}\n---\n\n{}\n".format(fixed_fm, body)

    if new_content == content:
        return "✅ 无需修改"

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        return "🔧 已修复"
    else:
        return "🔍 需要修复（dry-run 未写入）"


def main(dry_run=False):
    pattern = os.path.join(BLOG_DIR, "**", "index.md")
    files = glob.glob(pattern, recursive=True)

    if not files:
        print("❌ 未找到任何文件，请检查路径：\n   {}".format(BLOG_DIR))
        return

    print("📂 找到 {} 个文件\n{}".format(len(files), "=" * 50))
    if dry_run:
        print("🔍 dry-run 模式：只检测，不写入\n")

    fixed = skipped = unchanged = 0
    for fp in files:
        rel = os.path.relpath(fp, BLOG_DIR)
        status = fix_file(fp, dry_run=dry_run)
        print("{}  {}".format(status, rel))
        if "修复" in status:
            fixed += 1
        elif "跳过" in status:
            skipped += 1
        else:
            unchanged += 1

    print("\n{}".format("=" * 50))
    print("✅ 无需修改: {}  🔧 已修复: {}  ⚠️  跳过: {}".format(unchanged, fixed, skipped))


if __name__ == "__main__":
    import sys
    dry = "--dry-run" in sys.argv
    main(dry_run=dry)