"""
Outlook Job Email Summary Dashboard
Reads job notification emails and creates a visual summary
"""

import win32com.client
from datetime import datetime, timedelta
import re
from collections import defaultdict
import html

def connect_to_outlook():
    """Connect to Outlook application"""
    try:
        outlook = win32com.client.Dispatch("Outlook.Application")
        namespace = outlook.GetNamespace("MAPI")
        return namespace
    except Exception as e:
        print(f"Error connecting to Outlook: {e}")
        return None

def parse_job_email(email):
    """Extract job information from email"""
    subject = email.Subject
    body = email.Body
    received_time = email.ReceivedTime
    
    # Detect status from subject/body
    status = "Unknown"
    if any(word in subject.lower() or word in body.lower() 
           for word in ["success", "completed", "successful", "passed"]):
        status = "Success"
    elif any(word in subject.lower() or word in body.lower() 
             for word in ["fail", "failed", "error", "critical"]):
        status = "Failed"
    elif any(word in subject.lower() or word in body.lower() 
             for word in ["warning", "warn", "timeout"]):
        status = "Warning"
    elif any(word in subject.lower() or word in body.lower() 
             for word in ["running", "started", "in progress"]):
        status = "Running"
    
    return {
        'subject': subject,
        'status': status,
        'time': received_time,
        'sender': email.SenderName
    }

def analyze_emails(folder_name="Inbox", days_back=1, sender_filter=None):
    """Analyze job emails and return summary"""
    namespace = connect_to_outlook()
    if not namespace:
        return None
    
    # Get the folder
    inbox = namespace.GetDefaultFolder(6)  # 6 = Inbox
    
    # If you want a specific subfolder, uncomment and modify:
    # folder = inbox.Folders["YourJobFolder"]
    folder = inbox
    
    # Filter emails from last N days
    cutoff_date = datetime.now() - timedelta(days=days_back)
    
    jobs = []
    emails = folder.Items
    emails.Sort("[ReceivedTime]", True)  # Sort by newest first
    
    for email in emails:
        try:
            received = email.ReceivedTime
            if received < cutoff_date:
                break
            
            # Filter by sender if specified
            if sender_filter and sender_filter.lower() not in email.SenderName.lower():
                continue
            
            job_info = parse_job_email(email)
            jobs.append(job_info)
            
        except Exception as e:
            continue
    
    return jobs

def generate_html_report(jobs):
    """Generate HTML report from job data"""
    
    # Calculate statistics
    total = len(jobs)
    if total == 0:
        return "<h2>No job emails found</h2>"
    
    status_counts = defaultdict(int)
    for job in jobs:
        status_counts[job['status']] += 1
    
    success_rate = (status_counts['Success'] / total * 100) if total > 0 else 0
    
    # Generate HTML
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }}
            .container {{ max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
            h1 {{ color: #333; border-bottom: 3px solid #0078d4; padding-bottom: 10px; }}
            .stats {{ display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap; }}
            .stat-card {{ flex: 1; min-width: 150px; padding: 20px; border-radius: 8px; color: white; }}
            .stat-card h3 {{ margin: 0; font-size: 14px; opacity: 0.9; }}
            .stat-card .number {{ font-size: 32px; font-weight: bold; margin: 10px 0; }}
            .total {{ background: #0078d4; }}
            .success {{ background: #107c10; }}
            .failed {{ background: #d13438; }}
            .warning {{ background: #ff8c00; }}
            .running {{ background: #0099bc; }}
            table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
            th {{ background: #0078d4; color: white; padding: 12px; text-align: left; }}
            td {{ padding: 12px; border-bottom: 1px solid #ddd; }}
            tr:hover {{ background: #f9f9f9; }}
            .status-badge {{ padding: 5px 10px; border-radius: 4px; font-weight: bold; display: inline-block; }}
            .badge-success {{ background: #e7f5e7; color: #107c10; }}
            .badge-failed {{ background: #fde7e9; color: #d13438; }}
            .badge-warning {{ background: #fff4e5; color: #ff8c00; }}
            .badge-running {{ background: #e5f6fd; color: #0099bc; }}
            .badge-unknown {{ background: #e0e0e0; color: #666; }}
            .timestamp {{ color: #666; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📊 Job Execution Summary</h1>
            <p class="timestamp">Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            
            <div class="stats">
                <div class="stat-card total">
                    <h3>Total Jobs</h3>
                    <div class="number">{total}</div>
                </div>
                <div class="stat-card success">
                    <h3>Successful</h3>
                    <div class="number">{status_counts['Success']}</div>
                    <small>{success_rate:.1f}% success rate</small>
                </div>
                <div class="stat-card failed">
                    <h3>Failed</h3>
                    <div class="number">{status_counts['Failed']}</div>
                </div>
                <div class="stat-card warning">
                    <h3>Warnings</h3>
                    <div class="number">{status_counts['Warning']}</div>
                </div>
                <div class="stat-card running">
                    <h3>Running</h3>
                    <div class="number">{status_counts['Running']}</div>
                </div>
            </div>
            
            <h2>📋 Recent Jobs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Job Name</th>
                        <th>Status</th>
                        <th>Source</th>
                    </tr>
                </thead>
                <tbody>
    """
    
    # Add job rows
    for job in jobs:
        status_class = f"badge-{job['status'].lower()}"
        time_str = job['time'].strftime('%Y-%m-%d %H:%M:%S')
        subject = html.escape(job['subject'])
        sender = html.escape(job['sender'])
        
        html_content += f"""
                    <tr>
                        <td>{time_str}</td>
                        <td>{subject}</td>
                        <td><span class="status-badge {status_class}">{job['status']}</span></td>
                        <td>{sender}</td>
                    </tr>
        """
    
    html_content += """
                </tbody>
            </table>
        </div>
    </body>
    </html>
    """
    
    return html_content

def main():
    """Main function"""
    print("Connecting to Outlook...")
    
    # Configuration
    DAYS_BACK = 1  # Look at emails from last N days
    SENDER_FILTER = None  # Set to sender name/email to filter, or None for all
    
    # Analyze emails
    jobs = analyze_emails(days_back=DAYS_BACK, sender_filter=SENDER_FILTER)
    
    if jobs is None:
        print("Failed to connect to Outlook. Make sure Outlook is installed and running.")
        return
    
    print(f"Found {len(jobs)} job emails")
    
    # Generate report
    html_report = generate_html_report(jobs)
    
    # Save to file
    output_file = f"job_summary_{datetime.now().strftime('%Y%m%d_%H%M%S')}.html"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_report)
    
    print(f"✓ Report generated: {output_file}")
    print("Opening in browser...")
    
    # Open in default browser
    import webbrowser
    webbrowser.open(output_file)

if __name__ == "__main__":
    main()