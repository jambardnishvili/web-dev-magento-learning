# Find the Magento Root

Magento root is the folder that contains the application.

You know a folder is a Magento root when these paths exist:

```text
bin/magento
app/etc/env.php
pub/
vendor/
var/
generated/
```

But that only proves "this is a Magento project".

It does not prove "this is the live Magento project".

## Safety level

Read-only.

The commands on this page inspect config, paths, symlinks, and marker files. They should not change the server.

## The reliable proof chain

Use this order:

```text
domain -> active web server config -> document root -> Magento marker files
```

The strongest proof is:

```text
nginx or Apache serves /some/path/pub
/some/path has bin/magento and app/etc/env.php
```

Then `/some/path` is the live Magento root.

## 1. If you know the domain

For nginx:

```bash
sudo nginx -T 2>/dev/null | grep -n -A20 -B5 "server_name .*shop.example.com"
```

Command anatomy:

- `sudo nginx -T` prints the full active nginx config, including included files.
- `2>/dev/null` hides warning noise.
- `grep -n` shows matching line numbers.
- `-A20 -B5` shows context after and before the match.
- `"server_name .*shop.example.com"` searches for the domain in a server block.

If `sudo` is unavailable:

```bash
grep -R "shop.example.com" /etc/nginx 2>/dev/null
```

This fallback reads config files directly. It may miss generated or included config that only `nginx -T` shows.

For Apache:

```bash
sudo apachectl -S
grep -R "shop.example.com" /etc/apache2 /etc/httpd 2>/dev/null
```

You are looking for the active vhost that owns the domain.

## 2. Find the document root

In nginx config, look for:

```nginx
server_name shop.example.com;
root /srv/client/project/current/pub;
```

In Apache config, look for:

```apache
ServerName shop.example.com
DocumentRoot /srv/client/project/current/pub
```

For Magento, the document root should usually end in `/pub`.

If the document root is:

```text
/srv/client/project/current/pub
```

then the Magento root is:

```text
/srv/client/project/current
```

Do not care what the folder is called. It might be `/var/www`, `/data`, `/srv`, `/opt`, `/client`, `/www/users`, or something custom.

The web server config is what matters.

## 3. Confirm marker files

```bash
cd /srv/client/project/current
ls -la bin/magento app/etc/env.php pub vendor 2>/dev/null
```

Good sign:

```text
app/etc/env.php
bin/magento
pub
vendor
```

Then confirm Magento answers:

```bash
bin/magento --version
bin/magento deploy:mode:show
```

If those work, you found a Magento root.

If the web server points to its `pub`, you found the live Magento root.

## 4. Resolve symlinks

Deployments often use symlinks.

```bash
pwd
readlink -f .
readlink -f pub
```

Example:

```text
/srv/client/project/current
/srv/client/project/releases/20260426120000
/srv/client/project/releases/20260426120000/pub
```

This means:

- `current` is the stable deploy path.
- `releases/20260426120000` is the exact active release.
- normal commands should usually use `current`.

## 5. If you do not know the domain

List active web server config first.

nginx:

```bash
sudo nginx -T 2>/dev/null | egrep "server_name|root |fastcgi_pass"
```

Without sudo:

```bash
grep -R "server_name\\|root \\|fastcgi_pass" /etc/nginx 2>/dev/null
```

Apache:

```bash
sudo apachectl -S
grep -R "ServerName\\|DocumentRoot" /etc/apache2 /etc/httpd 2>/dev/null
```

Then match the domain or document root to a Magento folder.

## 6. If web config is not readable

Then you cannot fully prove the live root from this user.

You can still find candidate Magento projects:

```bash
sudo find / -path "*/bin/magento" -type f \
  -not -path "/proc/*" \
  -not -path "/sys/*" \
  -not -path "/dev/*" \
  -not -path "/run/*" 2>/dev/null
```

Without sudo:

```bash
find / -path "*/bin/magento" -type f \
  -not -path "/proc/*" \
  -not -path "/sys/*" \
  -not -path "/dev/*" \
  -not -path "/run/*" 2>/dev/null
```

For each result, remove `/bin/magento` and check marker files:

```bash
cd /candidate/path
ls -la bin/magento app/etc/env.php pub vendor 2>/dev/null
```

This finds Magento installations, but it does not prove which one is live.

To prove live, you still need web server config, hosting panel config, container config, or deployment documentation.

## 7. If the site is containerized

Look for Docker or Compose files:

```bash
ls -la
find . -maxdepth 3 -iname "docker-compose*.yml" -o -iname "compose*.yml" 2>/dev/null
```

Check running containers:

```bash
docker ps
```

Look for volume mounts:

```bash
docker inspect <container-name> | grep -A20 '"Mounts"'
```

In containerized setups, the host path and container path may be different.

You need the path where commands are expected to run, not only the path nginx sees inside a container.

## Mini exercise

You find this in active nginx config:

```nginx
server_name shop.example.com;
root /data/sites/client-a/releases/current/pub;
```

Question: what is the Magento root?

Answer:

```text
/data/sites/client-a/releases/current
```

Why: nginx serves the `pub` folder. Magento root is the parent folder that contains `bin/magento` and `app/etc/env.php`.

## Common mistake

Do not use folder names as proof.

These are guesses:

- `/home/magento`
- `/var/www/html`
- `/srv/www`
- `/data/web`

These are proof:

- active vhost has `root /path/to/project/pub`
- `/path/to/project/bin/magento` exists
- `/path/to/project/app/etc/env.php` exists
- Magento commands run from `/path/to/project`

## Related pages

[First 30 minutes on a new server](first-30-minutes-new-magento-server.md){ .lesson-link }
[Onboard a new Magento server](onboard-new-magento-server.md){ .lesson-link }
[Find the site config](find-site-config.md){ .lesson-link }
[Search files on a server](search-files-on-server.md){ .lesson-link }

## Concepts behind this

[What does the web server do?](../what-does-the-web-server-do.md){ .lesson-link }
[What is nginx?](../what-is-nginx.md){ .lesson-link }
[Where does Magento fit?](../where-does-magento-fit.md){ .lesson-link }
