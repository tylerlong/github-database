# GitHub Database

Use GitHub Releases as databases.


## How to find release id?

In browser, try to edit a release, and watch the network traffic.

There will be a request to `check?tag_name=default`, the response includes the release id.
