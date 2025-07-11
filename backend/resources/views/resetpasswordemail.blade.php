<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 0;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; padding: 30px;">
          <tr>
            <td align="center" style="padding: 20px;">
              <h2 style="color: #333333;">Hello {{ $name }},</h2>
              <p style="color: #555555; font-size: 16px;">
                We received a request to reset your password. Click the button below to set a new password.
              </p>
              <a href="{{ $origin }}/reset-password/?token={{ urlencode($token) }}&email={{ urlencode($email) }}"
                 style="display: inline-block; padding: 12px 24px; margin: 20px 0; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
                Reset Password
              </a>
              <p style="color: #888888; font-size: 14px;">
                If you didn't request this, you can safely ignore this email.
              </p>
              <p style="font-size: 12px; color: #aaaaaa;">
                “Nothing worth having comes easy.” – Theodore Roosevelt
              </p>
            </td>
          </tr>
        </table>
        <p style="color: #999999; font-size: 12px; padding-top: 10px;">
          &copy; {{ date('Y') }} FWU Incubation Center. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
