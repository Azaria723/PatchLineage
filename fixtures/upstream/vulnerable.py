import subprocess

def inspect_archive(user_path: str):
    return subprocess.run("archive-tool inspect " + user_path, shell=True, capture_output=True)

