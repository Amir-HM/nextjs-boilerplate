export async function sendVerificationEmail(
  email: string,
  url: string
): Promise<void> {
  // Dynamic import to avoid loading Resend in middleware
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: 'Sign in to your account',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(to right, #4F46E5, #7C3AED); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Sign in to Your Account</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 30px;">
                Click the button below to securely sign in to your account. This link will expire in 24 hours.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${url}" style="background: #4F46E5; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block; transition: background 0.3s;">
                  Sign In
                </a>
              </div>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
                If you didn't request this email, you can safely ignore it.
              </p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <p style="font-size: 12px; color: #9ca3af; text-align: center;">
                Or copy and paste this link into your browser:<br>
                <span style="color: #4F46E5; word-break: break-all;">${url}</span>
              </p>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }
}

// Export a helper function for sending custom emails
export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  return await resend.emails.send({
    from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
    ...options,
  });
}
