<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8; padding: 40px;">
    <div style="max-width: 650px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08); overflow: hidden;">

        <!-- Header -->
        <div style="background-color: #007acc; padding: 30px; text-align: center;">
            <img src="https://www.fwu.edu.np/assets/uploads/logo/1626619699-school-front-logo.png" style="max-height: 60px; margin-bottom: 10px;">
            <h1 style="color: #ffffff; font-size: 22px; margin: 0;">Far Western University Incubation Center</h1>
            <p style="color: #e0f3ff; font-size: 14px; margin: 5px 0;">Kanchanpur, Mahendranagar, Nepal</p>
        </div>

        <!-- Body -->
        <div style="padding: 30px;">
            <!-- Greeting -->
            <h2 style="color: #2c3e50; font-size: 20px; margin-bottom: 15px;">Dear Applicant,</h2>

            <p style="font-size: 16px; color: #444; line-height: 1.6;">
                Thank you for submitting your application to the <strong style="color: #007acc;">FWU Incubation Center</strong>. 
                We're thrilled to see your interest and enthusiasm for innovation.
            </p>

            <!-- Status -->
            <div style="background-color: #fff7d6; border-left: 5px solid #facc15; padding: 15px 20px; margin: 25px 0; border-radius: 6px;">
                <strong style="color: #92400e;">⏳ Current Status: <span style="color: #f59e0b;">Pending Review</span></strong>
                <p style="margin: 5px 0 0; color: #92400e; font-size: 14px;">
                    Your application is under review. You will receive a response within <strong>14 business days</strong>.
                </p>
            </div>

            <!-- Application Summary -->
            <h3 style="color: #2c3e50; margin-top: 30px;">📄 Application Summary</h3>
            <table style="width: 100%; font-size: 15px; color: #333; border-spacing: 6px 6px;">
                <tr>
                    <td><strong>👤 Name:</strong></td>
                    <td>{{ $name }}</td>
                </tr>
                <tr>
                    <td><strong>✉️ Email:</strong></td>
                    <td>{{ $email }}</td>
                </tr>
                <tr>
                    <td><strong>📞 Phone:</strong></td>
                    <td>{{ $phone }}</td>
                </tr>
                <tr>
                    <td><strong>📌 Proposal Title:</strong></td>
                    <td>{{ $title }}</td>
                </tr>
                <tr>
                    <td><strong>📝 Description:</strong></td>
                    <td>{{ $userMessage }}</td>
                </tr>
            </table>

            <!-- Team Members -->
            @if(isset($members) && count($members) > 0)
                <div style="margin-top: 30px;">
                    <h4 style="color: #2c3e50; margin-bottom: 10px;">👥 Team Members</h4>
                    <ul style="padding-left: 20px; color: #444; font-size: 14px; line-height: 1.6;">
                        @foreach($members as $member)
                            <li>{{ $member['name'] }} (<a href="mailto:{{ $member['email'] }}" style="color: #007acc;">{{ $member['email'] }}</a>)</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <!-- Footer -->
            <hr style="margin: 35px 0; border: none; border-top: 1px solid #e0e0e0;">

            <p style="font-size: 14px; color: #555; line-height: 1.6;">
                📬 This email was sent from the official address of the <strong>FWU Incubation Center</strong>. 
                If you have any questions or need help, feel free to reply directly to this message.
            </p>

            <p style="font-size: 14px; color: #333;">
                Best regards,<br>
                <strong style="color: #007acc;">FWU Incubation Center Team</strong>
            </p>
        </div>
    </div>
</div>
