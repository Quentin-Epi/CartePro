## Docker usage

### Dev

```bash
docker compose -f compose.dev.yml up --build
```

### Prod

Build:

```bash
docker compose -f compose.prod.yml build
```

Deploy:

```bash
docker compose -f compose.prod.yml up -d
```

Check logs:

```bash
docker compose -f compose.prod.yml logs -f
```
