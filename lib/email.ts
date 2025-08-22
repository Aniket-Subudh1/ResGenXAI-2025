import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendConfirmationEmail = async (registrationData: any) => {
  const hasGST = registrationData.gstAmount && registrationData.gstAmount > 0
  
  const mailOptions = {
    from: `"ResGenXAI 2025" <${process.env.SMTP_FROM}>`,
    to: registrationData.email,
    subject: 'ResGenXAI 2025 - Registration Confirmation',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Confirmation - ResGenXAI 2025</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          }
          .header {
            background: linear-gradient(135deg, #E65100, #FF9800);
            color: white;
            text-align: center;
            padding: 20px;
          }
          .header img {
            max-width: 100%;
            height: auto;
            margin-bottom: 15px;
          }
          .content {
            padding: 20px;
          }
          .info-box {
            background: #f0f8ff;
            padding: 15px;
            border-left: 4px solid #E65100;
            margin: 20px 0;
            border-radius: 5px;
          }
          .payment-box {
            background: #f8f9fa;
            padding: 15px;
            border: 1px solid #dee2e6;
            margin: 20px 0;
            border-radius: 5px;
          }
          .button {
            background: #E65100;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          .details-table th, .details-table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
            font-size: 14px;
          }
          .details-table th {
            background-color: #f8f9fa;
            font-weight: bold;
          }
          .payment-breakdown {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          .payment-breakdown td {
            padding: 8px 10px;
            border-bottom: 1px solid #eee;
            font-size: 14px;
          }
          .payment-breakdown .total-row {
            border-top: 2px solid #E65100;
            font-weight: bold;
            background-color: #fff5f0;
          }
          ul {
            padding-left: 20px;
          }
          .footer {
            background: #f8f9fa;
            text-align: center;
            padding: 15px;
            font-size: 12px;
            color: #666;
          }

          @media screen and (max-width: 600px) {
            .content, .header, .footer {
              padding: 15px !important;
            }
            .details-table th, .details-table td {
              padding: 8px;
              font-size: 13px;
            }
            .button {
              display: block;
              width: 100%;
              text-align: center;
              padding: 10px 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://www.resgenxai.co.in/rs.png" alt="ResGenXAI 2025 Logo">
            <h1>🎉 Registration Confirmed!</h1>
            <h2>ResGenXAI 2025</h2>
            <p>International Conference on Responsible, Generative and Explainable AI</p>
          </div>

          <div class="content">
            <h3>Dear ${registrationData.participantName},</h3>

            <p>Thank you for registering for <strong>ResGenXAI 2025</strong>! Your registration has been successfully confirmed and your payment has been processed.</p>

            <div class="info-box">
              <h4>📋 Registration Details</h4>
              <table class="details-table">
                <tr><th>Registration ID</th><td>${registrationData.registrationId}</td></tr>
                <tr><th>Name</th><td>${registrationData.participantName}</td></tr>
                <tr><th>Email</th><td>${registrationData.email}</td></tr>
                <tr><th>Category</th><td>${registrationData.category}</td></tr>
                <tr><th>IEEE Member</th><td>${registrationData.ieeeStatus === 'yes' ? 'Yes' : 'No'}</td></tr>
                <tr><th>Nationality</th><td>${registrationData.nationality}</td></tr>
                <tr><th>Paper ID</th><td>${registrationData.paperId}</td></tr>
                <tr><th>Presentation Mode</th><td>${registrationData.presentationMode}</td></tr>
              </table>
            </div>

            <div class="payment-box">
              <h4>💳 Payment Details</h4>
              <table class="payment-breakdown">
                <tr>
                  <td>Registration Fee:</td>
                  <td style="text-align: right;">${registrationData.baseFee || registrationData.calculatedFee} ${registrationData.currency}</td>
                </tr>
                ${hasGST ? `
                <tr>
                  <td>GST (18%):</td>
                  <td style="text-align: right;">+${Math.round(registrationData.gstAmount)} ${registrationData.currency}</td>
                </tr>
                <tr class="total-row">
                  <td><strong>Total Amount Paid:</strong></td>
                  <td style="text-align: right;"><strong>${registrationData.calculatedFee} ${registrationData.currency}</strong></td>
                </tr>
                ` : `
                <tr class="total-row">
                  <td><strong>Total Amount Paid:</strong></td>
                  <td style="text-align: right;"><strong>${registrationData.calculatedFee} ${registrationData.currency}</strong></td>
                </tr>
                `}
              </table>
              <div style="margin-top: 10px; font-size: 12px; color: #666;">
                <p><strong>Payment ID:</strong> ${registrationData.paymentId}</p>
                <p><strong>Order ID:</strong> ${registrationData.orderId}</p>
                ${hasGST ? '<p><em>* GST has been applied as per Indian tax regulations</em></p>' : '<p><em>* No GST applicable for international participants</em></p>'}
              </div>
            </div>

            <div class="info-box">
              <h4>📅 Conference Information</h4>
              <table class="details-table">
                <tr><th>Dates</th><td>September 10-12, 2025</td></tr>
                <tr><th>Venue</th><td>Centurion University of Technology and Management<br>Bhubaneswar, Odisha, India</td></tr>
                <tr><th>Website</th><td><a href="https://www.resgenxai.co.in">www.resgenxai.co.in</a></td></tr>
              </table>
            </div>

            <h4>📋 What's Next?</h4>
            <ul>
              <li><strong>Keep this email safe</strong> - You'll need it for conference check-in</li>
              <li><strong>Save your Registration ID</strong> - ${registrationData.registrationId}</li>
              <li><strong>Prepare your presentation</strong> - Details will be shared closer to the event</li>
              <li><strong>Book accommodation</strong> - We recommend booking early for better rates</li>
              <li><strong>Plan your travel</strong> - Check our website for travel information</li>
              ${hasGST ? '<li><strong>GST Invoice</strong> - This email serves as your tax invoice for GST purposes</li>' : ''}
            </ul>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.resgenxai.co.in" class="button">Visit Conference Website</a>
            </div>

            ${hasGST ? `
            <div class="info-box">
              <h4>🧾 Tax Information</h4>
              <p><strong>GST Details:</strong></p>
              <ul>
                <li>GSTIN: [University GST Number]</li>
                <li>GST Rate: 18%</li>
                <li>GST Amount: ${Math.round(registrationData.gstAmount)} ${registrationData.currency}</li>
                <li>Place of Supply: Odisha, India</li>
              </ul>
              <p><em>This email serves as your GST invoice. Please retain for your tax records.</em></p>
            </div>
            ` : ''}

            <div class="info-box">
              <h4>📞 Contact Information</h4>
              <p>For any queries regarding your registration or the conference:</p>
              <ul>
                <li><strong>Email:</strong> saneev.das@cutm.ac.in</li>
                <li><strong>Phone:</strong> +91 7978029866</li>
                <li><strong>Website:</strong> <a href="https://www.resgenxai.co.in">www.resgenxai.co.in</a></li>
              </ul>
            </div>
          </div>

          <div class="footer">
            <p><strong>ResGenXAI 2025 Organizing Committee</strong></p>
            <p>Centurion University of Technology and Management</p>
            <p>This is an automated email. Please do not reply to this email.</p>
            ${hasGST ? '<p style="margin-top: 10px; font-size: 10px;">This document serves as a tax invoice under GST regulations.</p>' : ''}
          </div>
        </div>
      </body>
      </html>
    `,
  }

  return await transporter.sendMail(mailOptions)
}