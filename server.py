"""
EcoDispose Local Development Server
Team: CodeXtra
Runs a lightweight HTTP server and opens the dashboard in your default browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    os.chdir(DIRECTORY)
    for p in [3000, 8000, 8080, 5000]:
        try:
            with socketserver.TCPServer(("", p), Handler) as httpd:
                print("=" * 65)
                print(f"🌱 EcoDispose Dashboard is running live!")
                print(f"👉 Local URL: http://localhost:{p}/")
                print(f"👉 Alternate: http://localhost:{p}/ecodispose-dashboard.html")
                print("Team: CodeXtra")
                print("Press Ctrl+C to stop the server.")
                print("=" * 65)
                webbrowser.open(f"http://localhost:{p}/")
                httpd.serve_forever()
                break
        except OSError:
            continue

if __name__ == "__main__":
    try:
        run()
    except KeyboardInterrupt:
        print("\nEcoDispose server stopped.")
        sys.exit(0)
