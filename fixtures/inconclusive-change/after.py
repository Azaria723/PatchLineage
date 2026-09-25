def inspect_archive(archive_path: str, runner) -> bytes:
    request = {"program": "tar", "arguments": ["-tf", archive_path]}
    return runner(request)
