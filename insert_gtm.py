from pathlib import Path

GTM_CODE = r"""    <!-- Google Tag Manager -->
    <script>(function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-KQVWXWZW');</script>
    <!-- End Google Tag Manager -->
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KQVWXWZW" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->"""

for html_file in Path(".").rglob("*.html"):
    try:
        content = html_file.read_text(encoding="utf-8")

        # 已存在则跳过
        if "GTM-KQVWXWZW" in content:
            print(f"跳过：{html_file}")
            continue

        # 插入到 </head> 前
        if "</head>" in content:
            content = content.replace("</head>", GTM_CODE + "\n</head>", 1)
            html_file.write_text(content, encoding="utf-8")
            print(f"完成：{html_file}")
        else:
            print(f"未找到 </head>：{html_file}")

    except Exception as e:
        print(f"处理失败：{html_file}\n原因：{e}")

print("全部处理完成！")