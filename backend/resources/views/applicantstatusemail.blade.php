<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8; padding: 40px;">
    <div style="max-width: 650px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08); overflow: hidden;">

        <!-- Header -->
        <div style="background-color: {{ $status === 'approved' ? '#16a34a' : '#dc2626' }}; padding: 30px; text-align: center;">
            <img src="https://www.fwu.edu.np/assets/uploads/logo/1626619699-school-front-logo.png" style="max-height: 60px; margin-bottom: 10px;">
            <h1 style="color: #ffffff; font-size: 22px; margin: 0;">Far Western University Incubation Center</h1>
            <p style="color: #f1f5f9; font-size: 14px;">Kanchanpur, Mahendranagar, Nepal</p>
        </div>

        <!-- Body -->
        <div style="padding: 30px;">
            @if($status ==='approved')
                <h2 style="color: #2c3e50;">🎉 Congratulations!</h2>
                <p style="font-size: 16px; color: #444; line-height: 1.6;">
                    Your application has been <strong>Accepted</strong> by the <strong style="color: #16a34a;">FWU Incubation Center</strong>. We’re excited about your proposal and will be reaching out with the next steps.
                </p>
            @elseif($status === 'rejected')
                <h2 style="color: #2c3e50;">Dear Applicant,</h2>
                <p style="font-size: 16px; color: #444; line-height: 1.6;">
                    Thank you for applying to the <strong style="color: #dc2626;">FWU Incubation Center</strong>. After careful review, we regret to inform you that your application has not been accepted for this cycle.
                </p>
                <p style="font-size: 15px; color: #666; margin-top: 20px;">
                    We appreciate your effort and encourage you to refine your idea and reapply in the future.
                </p>
            @endif

            <!-- Application Details -->
            <h3 style="color: #2c3e50; margin-top: 30px;">📄 Application Summary</h3>
            <table style="width: 100%; font-size: 15px; color: #333; border-spacing: 6px 6px;">
                <tr><td><strong>👤 Name:</strong></td><td>{{ $name }}</td></tr>
                <tr><td><strong>✉️ Email:</strong></td><td>{{ $email }}</td></tr>
                <tr><td><strong>📞 Phone:</strong></td><td>{{ $phone }}</td></tr>
                <tr><td><strong>📌 Title:</strong></td><td>{{ $title }}</td></tr>
                <tr><td><strong>📝 Description:</strong></td><td>{{ $userMessage }}</td></tr>
            </table>

            <!-- Team Members -->
            @if(isset($members) && count($members) > 0)
                <h3 style="color: #2c3e50; margin-top: 30px;">👥 Team Members</h3>
                <table style="width: 100%; font-size: 14px; color: #333; border-spacing: 6px;">
                    <thead>
                        <tr style="background-color: #f3f4f6;">
                            <th align="left">Name</th>
                            <th align="left">Email</th>
                            <th align="left">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($members as $member)
                            <tr>
                                <td>{{ $member['name'] ?? '-' }}</td>
                                <td><a href="mailto:{{ $member->email ?? '#' }}" style="color: #007acc;">{{ $member['email'] ?? '-' }}</a></td>
                                <td>{{ $member['phone'] ?? '-' }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @endif

            <!-- Footer -->
            <hr style="margin: 35px 0; border: none; border-top: 1px solid #e0e0e0;">
            <p style="font-size: 14px; color: #555;">
                Thank you again for your interest in the FWU Incubation Center.
            </p>
            <p style="font-size: 14px; color: #333;">
                Best regards,<br>
                <strong style="color: {{ $status === 'approved' ? '#16a34a' : '#dc2626' }};">FWU Incubation Center Team</strong>
            </p>
        </div>
    </div>
</div>
