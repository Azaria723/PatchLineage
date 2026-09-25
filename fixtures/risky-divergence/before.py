import subprocess


def list_archive(archive_path: str) -> bytes:
    return subprocess.run(
        ["tar", "-tf", archive_path],
        check=True,
        capture_output=True,
    ).stdout
