import subprocess


def inspect_archive(archive_path: str, runner=subprocess.run) -> bytes:
    return runner(
        ["tar", "-tf", archive_path],
        check=True,
        capture_output=True,
    ).stdout
