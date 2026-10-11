import os

def bundle():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    css_path = os.path.join(base_dir, 'styles.css')
    js_path = os.path.join(base_dir, 'app.js')
    html_path = os.path.join(base_dir, 'index.html')
    out_path = os.path.join(base_dir, 'ecodispose-dashboard.html')

    with open(css_path, 'r', encoding='utf-8') as f:
        css = f.read()
    with open(js_path, 'r', encoding='utf-8') as f:
        js = f.read()
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    html = html.replace('<link rel="stylesheet" href="styles.css">', f'<style>\n{css}\n</style>')
    html = html.replace('<script src="app.js"></script>', f'<script>\n{js}\n</script>')

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Bundle created successfully: ecodispose-dashboard.html")

if __name__ == '__main__':
    bundle()
