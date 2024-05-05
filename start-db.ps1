# This script starts a Docker container for a local development database

# On Windows:
# 1. Ensure Docker Desktop for Windows is installed - https://docs.docker.com/docker-for-windows/install/
# 2. Run this script from PowerShell


$DB_CONTAINER_NAME = "aihr2-postgres"

# Check if Docker is installed
if (-Not (Get-Command "docker" -ErrorAction SilentlyContinue)) {
    Write-Output "Docker is not installed. Please install Docker and try again."
    Write-Output "Docker install guide: https://docs.docker.com/engine/install/"
    exit 1
}

# Check if the database container is already running
if ((docker ps -q -f name=$DB_CONTAINER_NAME)) {
    Write-Output "Database container '$DB_CONTAINER_NAME' already running"
    exit 0
}

# Check if the database container exists and is stopped
if ((docker ps -q -a -f name=$DB_CONTAINER_NAME)) {
    docker start "$DB_CONTAINER_NAME"
    Write-Output "Existing database container '$DB_CONTAINER_NAME' started"
    exit 0
}

# Import environment variables from .env file
Get-Content .env | ForEach-Object {
    if ($_ -match '^[^=]+=[^=]+$') {  # Ensure the line contains exactly one '=' and non-empty key/value
        $keyValue = $_.Split('=')
        $key = $keyValue[0].Trim()   # Trim spaces from key
        $value = $keyValue[1].Trim() # Trim spaces from value
        Set-Item -Path Env:$key -Value $value
    } else {
        Write-Output "Skipping invalid line: $_"
    }
}

# Parse DB_PASSWORD from DATABASE_URL environment variable
$DB_PASSWORD = $env:DATABASE_URL.Split(':')[2].Split('@')[0]

if ($DB_PASSWORD -eq "password") {
    Write-Output "You are using the default database password"
    $REPLY = Read-Host "Should we generate a random password for you? [y/N]"
    if ($REPLY -notmatch "^[Yy]$") {
        Write-Output "Please set a password in the .env file and try again"
        exit 1
    }

    # Generate a random URL-safe password
    $DB_PASSWORD = [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(12)) -replace '\+', '-' -replace '/', '_'
    (Get-Content .env) -replace ':password@', ":$DB_PASSWORD@" | Set-Content .env
}

# Run the Docker container
docker run -d `
  --name $DB_CONTAINER_NAME `
  -e POSTGRES_PASSWORD="$DB_PASSWORD" `
  -e POSTGRES_DB="aihr2" `
  -p 5432:5432 `
  "docker.io/postgres" | Out-Null

if ($?) {
    Write-Output "Database container '$DB_CONTAINER_NAME' was successfully created"
} else {
    Write-Output "Failed to start the Docker container"
}
