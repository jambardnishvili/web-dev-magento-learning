# Search Files on a Server

## When to use this

Use this when you need to find a config file, log file, class name, route, template, or text inside a project.

## Safety level

Read-only, but can be slow if you search too widely.

Start inside the Magento root when looking for project files. Search the whole server only when you have a reason.

## Find files by name

```bash
find . -name "*checkout*"
```

Command anatomy:

- `find` searches the filesystem.
- `.` means start in the current folder.
- `-name "*checkout*"` means filenames containing `checkout`.
- The `*` characters mean "anything before or after this text".

Example output:

```text
./vendor/magento/module-checkout
./app/design/frontend/Vendor/theme/Magento_Checkout
```

How to read it:

- Results under `app/` are project customizations.
- Results under `vendor/` are installed package code.
- Results under `generated/` are generated output, not source code.

## Find text inside files

```bash
grep -R "checkout" .
```

Command anatomy:

- `grep` searches text.
- `-R` searches recursively through folders.
- `"checkout"` is the text you are looking for.
- `.` starts in the current folder.

## Faster search when available

```bash
rg "checkout"
```

`rg` means ripgrep. It is usually faster and gives cleaner output than `grep -R`.

## Find Magento templates

```bash
find app vendor -name "*.phtml"
```

## Find Magento XML layout files

```bash
find app vendor -path "*layout*" -name "*.xml"
```

## Search logs for an error

```bash
grep -R "Exception" var/log
```

## Common mistake

Searching the whole server from `/`.

Start in the project root when looking for project files. Search wider only when you know the file is outside the project.

## Related lessons

- [Where does Magento fit?](../where-does-magento-fit.md)
- [What is nginx?](../what-is-nginx.md)

## Related scenarios

[Product page shows 500](product-page-shows-500.md){ .lesson-link }
[Find the Magento root](find-magento-root.md){ .lesson-link }
