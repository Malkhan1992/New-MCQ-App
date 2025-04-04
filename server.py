import http.server
import socketserver
import json
import os
import traceback
import sys
from urllib.parse import urlparse, parse_qs

def ensure_directory_exists(path):
    """Create directory if it doesn't exist, with proper error handling."""
    try:
        os.makedirs(path, exist_ok=True)
        return True
    except Exception as e:
        print(f"Error creating directory {path}: {str(e)}")
        traceback.print_exc()
        return False

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path.startswith('/database/'):
            try:
                file_path = self.path[1:]  # Remove leading slash
                print(f"GET: Attempting to read file: {file_path}")
                
                if not os.path.exists(file_path):
                    print(f"GET: File not found: {file_path}")
                    self.send_response(404)
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'File not found'}).encode())
                    return

                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    print(f"GET: Successfully read file: {file_path}")
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(content.encode('utf-8'))
            except Exception as e:
                print(f"GET: Error reading file: {str(e)}")
                traceback.print_exc()
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
        else:
            super().do_GET()

    def do_PUT(self):
        try:
            print(f"PUT: Received request for path: {self.path}")
            
            if not self.path.startswith('/database/'):
                print("PUT: Invalid path - must start with /database/")
                self.send_response(403)
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Invalid path'}).encode())
                return

            file_path = self.path[1:]  # Remove leading slash
            print(f"PUT: Processing request for: {file_path}")

            # Check if this is a directory creation request
            create_directory = 'X-Create-Directory' in self.headers
            if create_directory:
                try:
                    print(f"PUT: Creating directory: {file_path}")
                    if ensure_directory_exists(file_path):
                        print(f"PUT: Directory created successfully: {file_path}")
                        self.send_response(200)
                        self.end_headers()
                        self.wfile.write(json.dumps({'success': True, 'message': 'Directory created'}).encode())
                    else:
                        raise Exception("Failed to create directory")
                    return
                except Exception as e:
                    print(f"PUT: Error creating directory: {str(e)}")
                    traceback.print_exc()
                    self.send_response(500)
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': f'Failed to create directory: {str(e)}'}).encode())
                    return

            # Handle file write
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 0:
                try:
                    post_data = self.rfile.read(content_length)
                    data = json.loads(post_data.decode('utf-8'))

                    # Ensure directory exists
                    directory = os.path.dirname(file_path)
                    if directory and not ensure_directory_exists(directory):
                        raise Exception(f"Failed to create directory: {directory}")

                    # Write the file
                    print(f"PUT: Writing data to: {file_path}")
                    with open(file_path, 'w', encoding='utf-8') as f:
                        json.dump(data, f, indent=4, ensure_ascii=False)
                    print(f"PUT: Successfully wrote file: {file_path}")

                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        'success': True,
                        'message': 'File updated successfully',
                        'path': file_path
                    }).encode())
                except json.JSONDecodeError as e:
                    print(f"PUT: JSON decode error: {str(e)}")
                    traceback.print_exc()
                    self.send_response(400)
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        'error': 'Invalid JSON data',
                        'details': str(e)
                    }).encode())
                except Exception as e:
                    print(f"PUT: Error writing file: {str(e)}")
                    traceback.print_exc()
                    self.send_response(500)
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        'error': f'Failed to write file: {str(e)}'
                    }).encode())
            else:
                print("PUT: No content received")
                self.send_response(400)
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'No content received'}).encode())

        except Exception as e:
            print(f"PUT: Unexpected error: {str(e)}")
            traceback.print_exc()
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({
                'error': 'Server error',
                'details': str(e)
            }).encode())

def initialize_database():
    """Initialize the database directory structure and required files."""
    try:
        # Create main directories
        base_dirs = ['database', 'database/admin', 'database/Aryan_Singh', 'database/Aditya_Singh']
        for dir_path in base_dirs:
            if not ensure_directory_exists(dir_path):
                print(f"Failed to create directory: {dir_path}")
                return False

        # Create question pool file if it doesn't exist
        pool_file = 'database/admin/question_pool.json'
        if not os.path.exists(pool_file):
            with open(pool_file, 'w', encoding='utf-8') as f:
                json.dump({
                    "General_Awareness": {
                        "easy": [],
                        "medium": [],
                        "hard": [],
                        "expert": []
                    },
                    "Science": {
                        "easy": [],
                        "medium": [],
                        "hard": [],
                        "expert": []
                    },
                    "Math": {
                        "easy": [],
                        "medium": [],
                        "hard": [],
                        "expert": []
                    },
                    "English": {
                        "easy": [],
                        "medium": [],
                        "hard": [],
                        "expert": []
                    }
                }, f, indent=4)
        return True
    except Exception as e:
        print(f"Error initializing database: {str(e)}")
        traceback.print_exc()
        return False

if __name__ == '__main__':
    PORT = 8000
    print(f"Starting server on port {PORT}")
    print("Server will handle file operations in the /database directory")
    print("Press Ctrl+C to stop the server")

    # Initialize database
    if not initialize_database():
        print("Failed to initialize database. Please check permissions and try again.")
        sys.exit(1)

    try:
        with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
            print(f"Server is running at http://localhost:{PORT}")
            httpd.serve_forever()
    except Exception as e:
        print(f"Error starting server: {str(e)}")
        traceback.print_exc()
        sys.exit(1) 