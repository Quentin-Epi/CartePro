docker compose -f compose.prod.yml build
docker compose -f compose.prod.yml up -d

sleep 10

curl -X POST \
  "http://localhost:8080/api/auth/register" \
  --header "Content-Type: application/json" \
  --data "{\"mail\": \"jeaneudesberlier@mjeb.gouv\", \"name\": \"JEB\", \"password\": \"jean\", \"role\": \"Manant\"}"
