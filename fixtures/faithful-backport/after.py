import subprocess

def scan(path):
    return subprocess.run(("archive-tool", "inspect", path), shell=False, capture_output=True)

