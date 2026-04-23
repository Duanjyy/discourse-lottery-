import os
import subprocess

def check_php_syntax(directory):
    errors = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                result = subprocess.run(['php', '-l', file_path], capture_output=True, text=True)
                if result.returncode != 0:
                    errors.append(file_path)
                    print(f"Error in {file_path}:\n{result.stdout}\n")
    return errors

errors = check_php_syntax('/workspace/wp-theme-hao')
print(f"Found {len(errors)} files with PHP syntax errors.")
