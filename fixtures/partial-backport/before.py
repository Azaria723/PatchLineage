import subprocess

def scan(path):
    return subprocess.run("archive-tool inspect " + path, shell=True, capture_output=True)

