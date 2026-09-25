import subprocess

def scan(path):
    escaped = path.replace(";", "").replace("&", "")
    return subprocess.run("archive-tool inspect " + escaped, shell=True, capture_output=True)

