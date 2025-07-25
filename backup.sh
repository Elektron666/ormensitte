#!/bin/bash

# Ormen Tekstil Website Backup Script
# Automated backup solution for production environment

set -e

# Configuration
SITE_NAME="ormentekstil"
BACKUP_ROOT="/var/backups/${SITE_NAME}"
SOURCE_DIR="/var/www/${SITE_NAME}"
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${SITE_NAME}_backup_${DATE}.tar.gz"
LOG_FILE="/var/log/${SITE_NAME}/backup.log"
RETENTION_DAYS=30
NOTIFICATION_EMAIL="info@ormentekstil.com"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a ${LOG_FILE}
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a ${LOG_FILE}
    # Send email notification (optional)
    # echo "$1" | mail -s "Ormen Tekstil Backup Error" ${NOTIFICATION_EMAIL}
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a ${LOG_FILE}
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a ${LOG_FILE}
}

# Check if running as root or with sudo
check_permissions() {
    if [[ $EUID -ne 0 ]]; then
        error "This script must be run as root or with sudo"
    fi
}

# Create backup directory if it doesn't exist
setup_backup_directory() {
    if [ ! -d "$BACKUP_ROOT" ]; then
        mkdir -p "$BACKUP_ROOT"
        log "Created backup directory: $BACKUP_ROOT"
    fi
    
    # Set proper permissions
    chmod 750 "$BACKUP_ROOT"
    chown root:root "$BACKUP_ROOT"
}

# Check available disk space
check_disk_space() {
    local required_space_mb=500
    local available_space_mb=$(df "$BACKUP_ROOT" | tail -1 | awk '{print int($4/1024)}')
    
    if [ "$available_space_mb" -lt "$required_space_mb" ]; then
        error "Insufficient disk space. Required: ${required_space_mb}MB, Available: ${available_space_mb}MB"
    fi
    
    info "Available disk space: ${available_space_mb}MB"
}

# Create the backup
create_backup() {
    log "Starting backup process..."
    
    # Check if source directory exists
    if [ ! -d "$SOURCE_DIR" ]; then
        error "Source directory does not exist: $SOURCE_DIR"
    fi
    
    # Create backup with progress
    info "Creating backup archive: $BACKUP_FILE"
    
    if tar --exclude='node_modules' \
           --exclude='*.log' \
           --exclude='backup' \
           --exclude='.git' \
           --exclude='temp' \
           --exclude='tmp' \
           -czf "$BACKUP_ROOT/$BACKUP_FILE" \
           -C "$SOURCE_DIR" . 2>/dev/null; then
        
        local backup_size=$(du -h "$BACKUP_ROOT/$BACKUP_FILE" | cut -f1)
        log "Backup created successfully: $BACKUP_FILE (Size: $backup_size)"
    else
        error "Failed to create backup archive"
    fi
}

# Verify backup integrity
verify_backup() {
    info "Verifying backup integrity..."
    
    if tar -tzf "$BACKUP_ROOT/$BACKUP_FILE" >/dev/null 2>&1; then
        log "Backup verification successful"
    else
        error "Backup verification failed - archive is corrupted"
    fi
}

# Clean up old backups
cleanup_old_backups() {
    info "Cleaning up backups older than $RETENTION_DAYS days..."
    
    local deleted_count=0
    
    # Find and delete old backups
    find "$BACKUP_ROOT" -name "${SITE_NAME}_backup_*.tar.gz" -mtime +$RETENTION_DAYS -type f | while read -r old_backup; do
        if [ -f "$old_backup" ]; then
            rm -f "$old_backup"
            deleted_count=$((deleted_count + 1))
            log "Deleted old backup: $(basename "$old_backup")"
        fi
    done
    
    if [ $deleted_count -eq 0 ]; then
        info "No old backups to clean up"
    else
        log "Cleaned up $deleted_count old backup(s)"
    fi
}

# Generate backup report
generate_report() {
    local total_backups=$(find "$BACKUP_ROOT" -name "${SITE_NAME}_backup_*.tar.gz" -type f | wc -l)
    local total_size=$(du -sh "$BACKUP_ROOT" 2>/dev/null | cut -f1)
    local latest_backup_size=$(du -h "$BACKUP_ROOT/$BACKUP_FILE" | cut -f1)
    
    log "=== Backup Report ==="
    log "Latest backup: $BACKUP_FILE"
    log "Backup size: $latest_backup_size"
    log "Total backups: $total_backups"
    log "Total backup storage: $total_size"
    log "Backup location: $BACKUP_ROOT"
    log "Retention policy: $RETENTION_DAYS days"
    log "===================="
}

# Send notification (optional)
send_notification() {
    local subject="Ormen Tekstil Backup Completed"
    local message="Backup completed successfully at $(date)
    
Backup Details:
- File: $BACKUP_FILE
- Size: $(du -h "$BACKUP_ROOT/$BACKUP_FILE" | cut -f1)
- Location: $BACKUP_ROOT
- Status: Success

This is an automated notification from the Ormen Tekstil backup system."

    # Uncomment and configure if you want email notifications
    # echo "$message" | mail -s "$subject" ${NOTIFICATION_EMAIL}
    
    info "Backup notification sent"
}

# Create database backup (if applicable)
backup_database() {
    # Add database backup logic here if your application uses a database
    # Example for PostgreSQL:
    # pg_dump ormentekstil > "$BACKUP_ROOT/db_backup_${DATE}.sql"
    
    # Example for MySQL:
    # mysqldump -u username -p password ormentekstil > "$BACKUP_ROOT/db_backup_${DATE}.sql"
    
    info "Database backup not configured (static website)"
}

# Main execution
main() {
    log "Starting Ormen Tekstil backup process"
    
    check_permissions
    setup_backup_directory
    check_disk_space
    create_backup
    verify_backup
    backup_database
    cleanup_old_backups
    generate_report
    send_notification
    
    log "Backup process completed successfully"
}

# Handle script interruption
trap 'error "Backup process interrupted"' INT TERM

# Execute main function
main "$@"

# Exit successfully
exit 0
