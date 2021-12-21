# GitHub Database

Use GitHub Releases as databases.


## How does it work?

It works as a key value store. Whenever you try to write `key=value`, the library will upload a file named `key.txt` with content `value` to a GitHub release.
If the file already exists, it will be replaced.
