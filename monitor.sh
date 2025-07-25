#!/bin/bash

# Ormen Tekstil Website Monitoring Script
# Comprehensive monitoring for production environment

set -e

# Configuration
SITE_NAME="ormentekstil"
WEBSITE_URL="https://www.ormentekstil.com"
ADMIN_URL="https://www.ormentekstil.com/#admingiris"
LOG_FILE="/var/log/${SITE_NAME}/monitor.log"
ALERT_EMAIL="info@ormentekstil.com"
MAX_RESPONSE_TIME=5 # seconds
MAX_DISK_USAGE=85   # percentage
MAX_MEMORY_USAGE=90 # percentage
MAX_CPU_USAGE=80    # percentage

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Status counters
CHECKS_PASSED=0
CHECKS_FAILED=0
WARNINGS=0

# Logging functions
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a ${LOG_FILE}
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a ${LOG_FILE}
    CHECKS_FAILED=$((CHECKS_FAILED + 1))
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a ${LOG_FILE}
    WARNINGS=$((WARNINGS + 1))
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a ${LOG_FILE}
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a ${LOG_FILE}
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
}

# Check website availability
check_website_availability() {
    info "Checking website availability..."
    
    local response_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$WEBSITE_URL")
    local response_time=$(curl -s -o /dev/null -w "%{time_total}" --max-time 10 "$WEBSITE_URL")
    
    if [ "$response_code" = "200" ]; then
        success "Website is accessible (HTTP $response_code)"
        
        # Check response time
        if [ "$(echo "$response_time > $MAX_RESPONSE_TIME" | bc -l)" = "1" ]; then
            warning "Website response time is slow: ${response_time}s (max: ${MAX_RESPONSE_TIME}s)"
        else
            success "Website response time is good: ${response_time}s"
        fi
    else
        error "Website is not accessible (HTTP $response_code)"
    fi
}

# Check SSL certificate
check_ssl_certificate() {
    info "Checking SSL certificate..."
    
    local cert_info=$(echo | openssl s_client -servername ormentekstil.com -connect ormentekstil.com:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
    
    if [ $? -eq 0 ]; then
        local expiry_date=$(echo "$cert_info" | grep "notAfter" | cut -d= -f2)
        local expiry_timestamp=$(date -d "$expiry_date" +%s)
        local current_timestamp=$(date +%s)
        local days_until_expiry=$(( (expiry_timestamp - current_timestamp) / 86400 ))
        
        if [ $days_until_expiry -lt 30 ]; then
            warning "SSL certificate expires in $days_until_expiry days"
        elif [ $days_until_expiry -lt 7 ]; then
            error "SSL certificate expires in $days_until_expiry days - URGENT"
        else
            success "SSL certificate is valid (expires in $days_until_expiry days)"
        fi
    else
        error "SSL certificate check failed"
    fi
}

# Check Nginx status
check_nginx_status() {
    info "Checking Nginx status..."
    
    if systemctl is-active --quiet nginx; then
        success "Nginx is running"
        
        # Check Nginx configuration
        if nginx -t >/dev/null 2>&1; then
            success "Nginx configuration is valid"
        else
            error "Nginx configuration has errors"
        fi
    else
        error "Nginx is not running"
        
        # Try to restart Nginx
        info "Attempting to restart Nginx..."
        if systemctl start nginx; then
            success "Nginx restarted successfully"
        else
            error "Failed to restart Nginx"
        fi
    fi
}

# Check disk usage
check_disk_usage() {
    info "Checking disk usage..."
    
    local disk_usage=$(df /var/www/${SITE_NAME} | tail -1 | awk '{print $5}' | sed 's/%//')
    
    if [ "$disk_usage" -gt "$MAX_DISK_USAGE" ]; then
        error "Disk usage is high: ${disk_usage}% (max: ${MAX_DISK_USAGE}%)"
    elif [ "$disk_usage" -gt 70 ]; then
        warning "Disk usage is moderate: ${disk_usage}%"
    else
        success "Disk usage is normal: ${disk_usage}%"
    fi
}

# Check memory usage
check_memory_usage() {
    info "Checking memory usage..."
    
    local memory_usage=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
    
    if [ "$memory_usage" -gt "$MAX_MEMORY_USAGE" ]; then
        error "Memory usage is high: ${memory_usage}% (max: ${MAX_MEMORY_USAGE}%)"
    elif [ "$memory_usage" -gt 70 ]; then
        warning "Memory usage is moderate: ${memory_usage}%"
    else
        success "Memory usage is normal: ${memory_usage}%"
    fi
}

# Check CPU usage
check_cpu_usage() {
    info "Checking CPU usage..."
    
    local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | sed 's/%us,//')
    local cpu_percentage=$(echo "$cpu_usage" | cut -d'%' -f1)
    
    if [ "$(echo "$cpu_percentage > $MAX_CPU_USAGE" | bc -l)" = "1" ]; then
        error "CPU usage is high: ${cpu_percentage}% (max: ${MAX_CPU_USAGE}%)"
    elif [ "$(echo "$cpu_percentage > 50" | bc -l)" = "1" ]; then
        warning "CPU usage is moderate: ${cpu_percentage}%"
    else
        success "CPU usage is normal: ${cpu_percentage}%"
    fi
}

# Check log files for errors
check_error_logs() {
    info "Checking error logs..."
    
    local nginx_errors=$(tail -n 100 /var/log/nginx/error.log 2>/dev/null | grep -c "$(date +%Y/%m/%d)" || echo "0")
    local site_errors=$(tail -n 100 /var/log/nginx/ormentekstil_error.log 2>/dev/null | grep -c "$(date +%Y/%m/%d)" || echo "0")
    
    if [ "$nginx_errors" -gt 10 ]; then
        warning "High number of Nginx errors today: $nginx_errors"
    else
        success "Nginx error count is normal: $nginx_errors"
    fi
    
    if [ "$site_errors" -gt 5 ]; then
        warning "High number of site errors today: $site_errors"
    else
        success "Site error count is normal: $site_errors"
    fi
}

# Check backup status
check_backup_status() {
    info "Checking backup status..."
    
    local backup_dir="/var/backups/${SITE_NAME}"
    local latest_backup=$(find "$backup_dir" -name "${SITE_NAME}_backup_*.tar.gz" -type f -printf '%T@ %p\n' 2>/dev/null | sort -n | tail -1 | cut -d' ' -f2-)
    
    if [ -n "$latest_backup" ]; then
        local backup_age_hours=$(( ($(date +%s) - $(stat -c %Y "$latest_backup")) / 3600 ))
        
        if [ "$backup_age_hours" -gt 48 ]; then
            error "Latest backup is $backup_age_hours hours old"
        elif [ "$backup_age_hours" -gt 24 ]; then
            warning "Latest backup is $backup_age_hours hours old"
        else
            success "Latest backup is $backup_age_hours hours old"
        fi
    else
        error "No backups found"
    fi
}

# Check admin panel accessibility
check_admin_panel() {
    info "Checking admin panel accessibility..."
    
    local admin_response=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$ADMIN_URL")
    
    if [ "$admin_response" = "200" ]; then
        success "Admin panel is accessible"
    else
        error "Admin panel is not accessible (HTTP $admin_response)"
    fi
}

# Check security headers
check_security_headers() {
    info "Checking security headers..."
    
    local headers=$(curl -I -s --max-time 10 "$WEBSITE_URL")
    
    # Check for important security headers
    if echo "$headers" | grep -qi "Strict-Transport-Security"; then
        success "HSTS header is present"
    else
        warning "HSTS header is missing"
    fi
    
    if echo "$headers" | grep -qi "X-Content-Type-Options"; then
        success "X-Content-Type-Options header is present"
    else
        warning "X-Content-Type-Options header is missing"
    fi
    
    if echo "$headers" | grep -qi "X-Frame-Options"; then
        success "X-Frame-Options header is present"
    else
        warning "X-Frame-Options header is missing"
    fi
}

# Generate monitoring report
generate_report() {
    log "=== Monitoring Report ==="
    log "Timestamp: $(date)"
    log "Checks passed: $CHECKS_PASSED"
    log "Checks failed: $CHECKS_FAILED"
    log "Warnings: $WARNINGS"
    log "Website URL: $WEBSITE_URL"
    log "Overall status: $([ $CHECKS_FAILED -eq 0 ] && echo "HEALTHY" || echo "ISSUES DETECTED")"
    log "========================"
}

# Send alert if issues detected
send_alert() {
    if [ $CHECKS_FAILED -gt 0 ] || [ $WARNINGS -gt 3 ]; then
        local subject="Ormen Tekstil Monitoring Alert"
        local message="Monitoring alert for Ormen Tekstil website:

Failed Checks: $CHECKS_FAILED
Warnings: $WARNINGS
Timestamp: $(date)

Please check the monitoring logs for details: $LOG_FILE

This is an automated alert from the monitoring system."

        # Uncomment to enable email alerts
        # echo "$message" | mail -s "$subject" $ALERT_EMAIL
        
        error "Alert conditions met - notification would be sent"
    else
        success "All systems operating normally"
    fi
}

# Main monitoring function
main() {
    log "Starting Ormen Tekstil monitoring check"
    
    check_website_availability
    check_ssl_certificate
    check_nginx_status
    check_disk_usage
    check_memory_usage
    check_cpu_usage
    check_error_logs
    check_backup_status
    check_admin_panel
    check_security_headers
    
    generate_report
    send_alert
    
    log "Monitoring check completed"
}

# Handle script interruption
trap 'error "Monitoring script interrupted"' INT TERM

# Execute main function
main "$@"

# Exit with appropriate code
if [ $CHECKS_FAILED -gt 0 ]; then
    exit 1
else
    exit 0
fi
