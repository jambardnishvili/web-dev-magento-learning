# Find Magento Logs

## When to use this

Use this when Magento shows an error page, a blank page, a broken checkout step, or unexpected backend behavior.

## Safety level

Read-only.

These commands read log files. They do not change Magento data, cache, services, or code.

## Main Magento log folder

```bash
ls -lah var/log
```

Command anatomy:

- `ls` lists files.
- `-l` shows details like size, owner, and date.
- `-a` includes hidden files.
- `-h` makes file sizes easier to read.
- `var/log` is Magento's normal application log folder.

Example output:

```text
-rw-rw-r-- 1 www-data www-data  48K Apr 26 16:22 exception.log
-rw-rw-r-- 1 www-data www-data 180K Apr 26 16:22 system.log
-rw-rw-r-- 1 www-data www-data  12K Apr 26 15:58 debug.log
```

How to read it:

- A recent timestamp means Magento has written there recently.
- A growing `exception.log` often means repeated application errors.
- No files may mean logging is elsewhere, permissions differ, or the issue did not reach Magento.

## Common log files

```bash
tail -f var/log/system.log
tail -f var/log/exception.log
tail -f var/log/debug.log
```

Command anatomy:

- `tail` reads the end of a file.
- `-f` keeps watching new lines as they are written.
- Use this while you reproduce the issue in the browser.

## Search recent errors

```bash
grep -R "ERROR\\|CRITICAL\\|Exception" var/log
```

Example output:

```text
var/log/exception.log:[2026-04-26T16:22:18.123456+00:00] main.CRITICAL: No such entity with id = 42
```

How to read it:

- The timestamp tells you whether the error happened during your test.
- `CRITICAL` means Magento considered it serious.
- The message after the colon is the clue you search next.

## Watch logs while reproducing issue

```bash
tail -f var/log/system.log var/log/exception.log
```

Then reload the broken page or repeat the failing action.

## Common mistake

Looking at logs after reproducing the issue hours earlier.

Better flow: clear your terminal, start `tail -f`, reproduce the issue, then read the new lines that appear.

## Related lessons

- [Where does Magento fit?](../where-does-magento-fit.md)
- [Where does page data live?](../where-does-page-data-live.md)

## Related scenarios

[Product page shows 500](product-page-shows-500.md){ .lesson-link }
