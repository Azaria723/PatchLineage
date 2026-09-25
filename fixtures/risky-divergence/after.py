import subprocess


def list_archive(archive_path: str) -> bytes:
    command = "tar -tf " + archive_path
    return subprocess.run(
        command,
        shell=True,
        check=True,
        capture_output=True,
    ).stdout
