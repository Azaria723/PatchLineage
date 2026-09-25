import subprocess

def scan(path):
    command = "archive-tool inspect " + path
    return subprocess.run(command, shell=True, capture_output=True)

