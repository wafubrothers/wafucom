import os
import re

# ==========================================================
# 网站根目录
# Python 脚本放在网站根目录时使用 "."
# ==========================================================

ROOT_DIR = "."


def get_relative_solu_path(file_path):
    """
    根据 HTML 文件所在目录，
    自动计算到网站根目录 solu 文件夹的相对路径。
    """

    file_dir = os.path.dirname(file_path)

    relative_dir = os.path.relpath(file_dir, ROOT_DIR)

    # HTML 在网站根目录
    if relative_dir == ".":
        return "solu"

    # HTML 在子目录
    depth = len(relative_dir.split(os.sep))

    return "../" * depth + "solu"


def process_html_file(file_path):

    try:

        # ==================================================
        # 读取 HTML
        # ==================================================

        with open(file_path, "r", encoding="utf-8-sig") as f:
            content = f.read()

        original_content = content

        # ==================================================
        # ① 判断这个页面是否已经添加过
        #
        # 只要页面中已经存在：
        # solu-micromobility.html
        #
        # 就认为这个页面已经处理过，直接跳过
        # ==================================================

        if "solu-micromobility.html" in content:

            print(f"[已存在，跳过] {file_path}")

            return

        # ==================================================
        # ② 根据当前 HTML 所在目录计算路径
        # ==================================================

        solu_path = get_relative_solu_path(file_path)

        lighting_href = solu_path + "/solu-lighting.html"
        micromobility_href = solu_path + "/solu-micromobility.html"

        # ==================================================
        # ③ 查找“安防照明行业”对应的 <a>
        #
        # 不要求固定缩进、换行
        # ==================================================

        pattern = re.compile(
            r'<a\b'
            r'[^>]*?'
            r'href\s*=\s*["\'][^"\']*solu/solu-lighting\.html["\']'
            r'[^>]*>'
            r'.*?'
            r'</a>',
            re.DOTALL | re.IGNORECASE
        )

        matches = list(pattern.finditer(content))

        # ==================================================
        # 没有找到安防照明行业
        # ==================================================

        if not matches:

            print(f"[未找到目标] {file_path}")

            return

        # ==================================================
        # ④ 准备两个版本的新菜单
        # ==================================================

        desktop_insert = f'''<a href="{micromobility_href}" 
                                    class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-all">Moped Manufacturing Industry</a>'''

        mobile_insert = f'''<a href="{micromobility_href}" 
                                class="block py-2.5 px-4 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-r-md">Moped Manufacturing Industry</a>'''

        replacements = []

        # ==================================================
        # ⑤ 第一个安防照明行业 → 桌面端
        # ==================================================

        if len(matches) >= 1:

            old = matches[0].group(0)

            new = old + "\n" + desktop_insert

            replacements.append(
                (
                    matches[0].start(),
                    matches[0].end(),
                    new
                )
            )

        # ==================================================
        # ⑥ 第二个安防照明行业 → 移动端
        # ==================================================

        if len(matches) >= 2:

            old = matches[1].group(0)

            new = old + "\n" + mobile_insert

            replacements.append(
                (
                    matches[1].start(),
                    matches[1].end(),
                    new
                )
            )

        # ==================================================
        # ⑦ 从后往前替换
        # ==================================================

        for start, end, replacement in reversed(replacements):

            content = (
                content[:start]
                + replacement
                + content[end:]
            )

        # ==================================================
        # ⑧ 保存
        # ==================================================

        if content != original_content:

            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)

            print(
                f"[已添加] {file_path} "
                f"| 找到 {len(matches)} 个目标 "
                f"| 新链接：{micromobility_href}"
            )

        else:

            print(f"[无需修改] {file_path}")

    except Exception as e:

        print(f"[错误] {file_path}：{e}")


# ==========================================================
# 遍历整个网站
# ==========================================================

for root, dirs, files in os.walk(ROOT_DIR):

    # 排除不需要处理的目录
    dirs[:] = [
        d for d in dirs
        if d not in {
            ".git",
            "node_modules"
        }
    ]

    for file in files:

        if file.lower().endswith(".html"):

            file_path = os.path.join(root, file)

            process_html_file(file_path)


print()
print("==========================================")
print("全部 HTML 文件处理完成！")
print("==========================================")