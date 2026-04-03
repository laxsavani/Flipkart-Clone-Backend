const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.registerMailForSeller = async (toName, toMail) => {
  return transporter.sendMail({
    from: `"MarketPro Ecommerce"<${process.env.EMAIL_USER}>`,
    to: toMail,
    subject: 'Welcome to MarketPro Ecommerce - Your Seller Account is Ready!',
    html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>✨ Seller Registration Successful</title>
    <style type="text/css">
        body, table, td, a, p { text-decoration: none !important; font-family: 'Segoe UI', Tahoma, Helvetica, Arial, sans-serif; }
        @media only screen and (max-width: 600px) {
            .mobile-stack { display: block !important; width: 100% !important; }
            .hide-mobile { display: none !important; }
            .full-width { width: 100% !important; max-width: 100% !important; }
            .mobile-padding { padding: 20px 15px !important; }
            .mobile-small { font-size: 14px !important; line-height: 1.4 !important; }
            .mobile-title { font-size: 24px !important; }
            .mobile-icon { font-size: 16px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; padding: 30px 10px; min-width: 320px;">

    <!--[if mso]>
    <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width: 600px;">
    <tr>
    <td>
    <![endif]-->
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; max-width: 540px; margin: 0 auto;">
        <tr>
            <td align="center">
                
                <!-- Main Success Card -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(145deg, #1e1b4b 0%, #1e293b 100%); border-radius: 28px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08);">
                    
                    <tr>
                        <td class="mobile-padding" align="center" style="padding: 40px 30px 30px 30px; position: relative;">
                            
                            <!-- Responsive Decorative Icons -->
                            <div style="position: absolute; top: 20px; left: 20px; opacity: 0.15;">
                                <span style="font-size: 28px; color: #10b981; line-height: 1;">🏪</span>
                            </div>
                            <div style="position: absolute; bottom: 20px; right: 20px; opacity: 0.12;">
                                <span style="font-size: 26px; color: #10b981; line-height: 1;">🛒</span>
                            </div>

                            <!-- Responsive Success Checkmark -->
                            <table border="0" cellpadding="0" cellspacing="0" style="position: relative; z-index: 2; margin-bottom: 25px;">
                                <tr>
                                    <td align="center" bgcolor="#10b981" style="width: 90px; height: 90px; min-width: 90px; border-radius: 45px; color: #ffffff; font-size: 42px; font-weight: bold; box-shadow: 0 20px 40px rgba(16,185,129,0.4), inset 0 2px 8px rgba(255,255,255,0.3); line-height: 1;">
                                        ✓
                                    </td>
                                </tr>
                            </table>

                            <!-- Responsive Main Title -->
                            <h1 class="mobile-title" style="color: #f8fafc; font-size: 28px; font-weight: 800; margin: 0 0 18px 0; line-height: 1.2;">
                                Seller Account Created!
                            </h1>
                            
                            <!-- Responsive Welcome Text -->
                            <p style="color: #10b981; font-size: 20px; font-weight: 700; margin: 0 0 30px 0; line-height: 1.3;">
                                Welcome to <strong style="font-weight: 800;">MarketPro Ecommerce</strong>
                            </p>

                            <!-- Responsive Seller Data Card -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(145deg, rgba(80, 203, 162, 0.66) 0%, rgba(80, 203, 162, 0.66) 100%); border: 1px solid rgba(16,185,129,0.4); border-radius: 20px; margin: 0 auto 25px; overflow: hidden; box-shadow: 0 12px 30px rgba(16,185,129,0.2);">
                                <tr>
                                    <td class="mobile-padding" style="padding: 22px 25px; color: #e2e8f0; font-size: 15px; line-height: 1.6; text-align: left;">
                                        <div style="margin-bottom: 10px; display: table; width: 100%;">
                                            <span style="display: table-cell; width: 24px; color: #10b981; font-size: 17px; vertical-align: middle;">👨‍💼</span>
                                            <span style="display: table-cell; padding-left: 12px; vertical-align: middle;">
                                                <strong style="color: #ffffff;">Seller: ${toName}</strong> 
                                            </span>
                                        </div>
                                        <div style="margin-bottom: 10px; display: table; width: 100%;">
                                            <span style="display: table-cell; width: 24px; color: #10b981; font-size: 17px; vertical-align: middle;">✉️</span>
                                            <span style="display: table-cell; padding-left: 12px; vertical-align: middle;">
                                                <strong style="color: #ffffff;">Email: ${toMail}</strong> 
                                            </span>
                                        </div>
                                        <div style="display: table; width: 100%;">
                                            <span style="display: table-cell; width: 24px; color: #10b981; font-size: 17px; vertical-align: middle;">🕐</span>
                                            <span style="display: table-cell; padding-left: 12px; vertical-align: middle;">
                                                <strong style="color: #ffffff;">Date: ${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}</strong> 
                                            </span>
                                        </div>
                                        <div style="display: table; width: 100%;">
                                            <span style="display: table-cell; width: 24px; color: #10b981; font-size: 17px; vertical-align: middle;">🕐</span>
                                            <span style="display: table-cell; padding-left: 12px; vertical-align: middle;">
                                                <strong style="color: #ffffff;">Time: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}</strong> 
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Responsive Divider -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.15);"></td>
                                </tr>
                            </table>

                            <!-- Responsive Status Message -->
                            <p class="mobile-small" style="color: #60a5fa; font-size: 14px; font-weight: 600; margin: 0; line-height: 1.5; text-align: center;">
                                <span style="color: #10b981; font-size: 16px; margin-right: 8px; line-height: 1;">🚀</span>
                                Seller account activated! Start listing your products now.
                            </p>

                        </td>
                    </tr>
                    
                    <!-- Card Footer -->
                    <tr>
                        <td style="background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%); padding: 22px 30px; border-top: 1px solid rgba(255,255,255,0.1);">
                            <p class="mobile-small" style="color: #94a3b8; font-size: 13px; margin: 0; line-height: 1.4; text-align: center;">
                                <strong style="color: #10b981;">MarketPro Ecommerce</strong> - Your seller journey begins, ${toName}! 🎉
                            </p>
                        </td>
                    </tr>
                    
                </table>

                <!-- Responsive Email Footer -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; margin-top: 30px;">
                    <tr>
                        <td align="center" style="padding: 25px 20px; color: #64748b; font-size: 13px; line-height: 1.5; background: rgba(255,255,255,0.05); border-radius: 16px;">
                            <p style="margin: 0 0 8px 0; font-size: 14px;">
                                <span style="color: #10b981; font-size: 16px;">⭐</span> Congratulations on becoming a MarketPro seller!
                            </p>
                            <p style="margin: 0; font-size: 12px; opacity: 0.8;">
                                This is an automated confirmation email. Please do not reply.
                            </p>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
    
    <!--[if mso]>
    </td>
    </tr>
    </table>
    <![endif]-->

</body>
</html>
    `,
  })
};

exports.forgotPasswordMailForSeller = async (toName, toMail, resetLink) => {
  return transporter.sendMail({
    from: `"MarketPro Ecommerce" <${process.env.EMAIL_USER}>`,
    to: toMail,
    subject: 'Reset Your Seller Account Password - MarketPro Ecommerce',
    html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>🔐 Password Reset Request</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;padding:30px 10px;min-width:320px;font-family:'Segoe UI',Tahoma,Helvetica,Arial,sans-serif;">
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;max-width:560px;margin:0 auto;">
        <tr>
            <td align="center">       
                <!-- Clean Professional Card -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(145deg,#ffffff 0%,#f8fafc 100%);border-radius:32px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 35px 80px rgba(0,0,0,0.12),0 10px 30px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.8);">
                    
                    <tr>
                        <td align="center" style="padding:50px 35px 35px 35px;position:relative;">
                            
                            <!-- Subtle Decorations -->
                            <div style="position:absolute;top:25px;left:25px;opacity:0.08;">
                                <span style="font-size:32px;">🔒</span>
                            </div>
                            <div style="position:absolute;bottom:25px;right:25px;opacity:0.06;">
                                <span style="font-size:28px;">✨</span>
                            </div>

                            <!-- Professional Lock Icon -->
                            <table border="0" cellpadding="0" cellspacing="0" style="position:relative;margin-bottom:32px;">
                                <tr>
                                    <td align="center" style="background:linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%);width:100px;height:100px;border-radius:50px;color:#ffffff;font-size:52px;font-weight:800;box-shadow:0 20px 50px rgba(59,130,246,0.4),0 0 25px rgba(59,130,246,0.2),inset 0 2px 10px rgba(255,255,255,0.5);line-height:1;text-shadow:0 2px 8px rgba(0,0,0,0.2);">
                                        🔐
                                    </td>
                                </tr>
                            </table>

                            <!-- Professional Title -->
                            <h1 style="color:#1e293b;font-size:32px;font-weight:800;margin:0 0 18px 0;line-height:1.2;letter-spacing:-0.5px;">
                                Password Reset Request
                            </h1>
                            
                            <!-- Clean Greeting -->
                            <p style="color:#475569;font-size:16px;margin:0 0 35px 0;line-height:1.7;max-width:90%;text-align:center;">
                                Hello <strong style="color:#1e293b;">${toName}</strong>,<br>
                                <span style="color:#3b82f6;font-weight:600;">We've received a request</span> to reset your seller account password.
                            </p>

                            <!-- Professional Info Card -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;margin:0 auto 35px;overflow:hidden;box-shadow:0 10px 35px rgba(0,0,0,0.08),0 4px 15px rgba(0,0,0,0.05),inset 0 1px 0 rgba(255,255,255,0.9);">
                                <tr>
                                    <td style="padding:30px 35px;color:#475569;font-size:16px;line-height:1.7;text-align:left;">
                                        <div style="margin-bottom:16px;display:flex;align-items:center;">
                                            <span style="color:#3b82f6;font-size:24px;margin-right:18px;min-width:36px;line-height:1;">👨‍💼</span>
                                            <div>
                                                <strong style="color:#1e293b;font-size:17px;display:block;">Seller Account</strong>
                                                <span style="font-weight:500;color:#64748b;margin-top:2px;display:block;">${toName}</span>
                                            </div>
                                        </div>
                                        <div style="margin-bottom:16px;display:flex;align-items:center;">
                                            <span style="color:#3b82f6;font-size:24px;margin-right:18px;min-width:36px;line-height:1;">✉️</span>
                                            <div>
                                                <strong style="color:#1e293b;font-size:17px;display:block;">Email Address</strong>
                                                <span style="font-weight:500;color:#64748b;margin-top:2px;display:block;">${toMail}</span>
                                            </div>
                                        </div>
                                        <div style="display:flex;align-items:center;">
                                            <span style="color:#3b82f6;font-size:24px;margin-right:18px;min-width:36px;line-height:1;">⏱️</span>
                                            <div>
                                                <strong style="color:#1e293b;font-size:17px;display:block;">Valid For</strong>
                                                <span style="font-weight:700;color:#3b82f6;font-size:16px;margin-top:2px;display:block;">15 Minutes</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Clear Action Box -->
                            <p style="color:#64748b;font-size:15px;margin:0 0 30px 0;line-height:1.6;text-align:center;background:#f1f5f9;padding:18px 24px;border-radius:18px;border-left:5px solid #3b82f6;">
                                <strong style="color:#1e293b;">Click below</strong> to securely reset your password right now.
                            </p>

                            <!-- Professional Button -->
                            <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:30px;">
                                <tr>
                                    <td align="center" style="background:linear-gradient(135deg,#3b82f6 0%,#1d4ed8 50%,#1e40af 100%);border-radius:24px;padding:20px 52px;box-shadow:0 12px 40px rgba(59,130,246,0.4),0 5px 20px rgba(59,130,246,0.25),inset 0 1px 0 rgba(255,255,255,0.4);">
                                        <a href="${resetLink}" target="_blank" style="color:#ffffff;font-size:19px;font-weight:800;text-decoration:none;display:block;letter-spacing:0.8px;text-shadow:0 1px 3px rgba(0,0,0,0.15);">
                                            🔑 Reset Password Now
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Security Notice -->
                            <div style="background:#f0fdf4;border-radius:20px;padding:24px 28px;margin-bottom:12px;border-left:5px solid #10b981;">
                                <p style="color:#166534;font-size:15px;margin:0;line-height:1.7;">
                                    <span style="color:#10b981;font-size:18px;margin-right:12px;">✅</span>
                                    <strong style="color:#14532d;">Didn't request this?</strong> No action needed - your account is completely secure.
                                </p>
                            </div>

                        </td>
                    </tr>
                    
                    <!-- Clean Footer -->
                    <tr>
                        <td style="background:#f8fafc;padding:30px 40px;border-top:1px solid #e2e8f0;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <p style="color:#1e293b;font-size:15px;margin:0 0 6px 0;line-height:1.5;font-weight:600;">
                                            <strong style="color:#3b82f6;">MarketPro Ecommerce</strong>
                                        </p>
                                        <p style="color:#64748b;font-size:14px;margin:0;line-height:1.5;">
                                            Professional seller platform • Automated security notification
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>

                <!-- Support Section -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin-top:35px;">
                    <tr>
                        <td align="center" style="padding:28px 24px;color:#64748b;font-size:14px;line-height:1.6;background:#ffffff;border-radius:24px;border:1px solid #e2e8f0;box-shadow:0 5px 20px rgba(0,0,0,0.08);">
                            <p style="margin:0 0 8px 0;font-size:15px;">
                                <span style="color:#3b82f6;font-size:18px;">🛠️</span> 24/7 Seller Support Available
                            </p>
                            <p style="margin:0;font-size:13px;">
                                <strong style="color:#1e293b;">support@marketpro.com</strong>
                            </p>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>
</html>
    `,
  });
};

exports.forgotPasswordMailForUser = async (toName, toMail, resetLink) => {
  return transporter.sendMail({
    from: `"MarketPro Ecommerce" <${process.env.EMAIL_USER}>`,
    to: toMail,
    subject: 'Reset Your Account Password - MarketPro Ecommerce',
    html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>🔐 Password Reset Request</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;padding:30px 10px;min-width:320px;font-family:'Segoe UI',Tahoma,Helvetica,Arial,sans-serif;">
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;max-width:560px;margin:0 auto;">
        <tr>
            <td align="center">       
                <!-- Clean Professional Card -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(145deg,#ffffff 0%,#f8fafc 100%);border-radius:32px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 35px 80px rgba(0,0,0,0.12),0 10px 30px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.8);">
                    
                    <tr>
                        <td align="center" style="padding:50px 35px 35px 35px;position:relative;">
                            
                            <!-- Subtle Decorations -->
                            <div style="position:absolute;top:25px;left:25px;opacity:0.08;">
                                <span style="font-size:32px;">🔒</span>
                            </div>
                            <div style="position:absolute;bottom:25px;right:25px;opacity:0.06;">
                                <span style="font-size:28px;">✨</span>
                            </div>

                            <!-- Professional Lock Icon -->
                            <table border="0" cellpadding="0" cellspacing="0" style="position:relative;margin-bottom:32px;">
                                <tr>
                                    <td align="center" style="background:linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%);width:100px;height:100px;border-radius:50px;color:#ffffff;font-size:52px;font-weight:800;box-shadow:0 20px 50px rgba(59,130,246,0.4),0 0 25px rgba(59,130,246,0.2),inset 0 2px 10px rgba(255,255,255,0.5);line-height:1;text-shadow:0 2px 8px rgba(0,0,0,0.2);">
                                        🔐
                                    </td>
                                </tr>
                            </table>

                            <!-- Professional Title -->
                            <h1 style="color:#1e293b;font-size:32px;font-weight:800;margin:0 0 18px 0;line-height:1.2;letter-spacing:-0.5px;">
                                Password Reset Request
                            </h1>
                            
                            <!-- Clean Greeting -->
                            <p style="color:#475569;font-size:16px;margin:0 0 35px 0;line-height:1.7;max-width:90%;text-align:center;">
                                Hello <strong style="color:#1e293b;">${toName}</strong>,<br>
                                <span style="color:#3b82f6;font-weight:600;">We've received a request</span> to reset your User account password.
                            </p>

                            <!-- Professional Info Card -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;margin:0 auto 35px;overflow:hidden;box-shadow:0 10px 35px rgba(0,0,0,0.08),0 4px 15px rgba(0,0,0,0.05),inset 0 1px 0 rgba(255,255,255,0.9);">
                                <tr>
                                    <td style="padding:30px 35px;color:#475569;font-size:16px;line-height:1.7;text-align:left;">
                                        <div style="margin-bottom:16px;display:flex;align-items:center;">
                                            <span style="color:#3b82f6;font-size:24px;margin-right:18px;min-width:36px;line-height:1;">👨‍💼</span>
                                            <div>
                                                <strong style="color:#1e293b;font-size:17px;display:block;">User Account</strong>
                                                <span style="font-weight:500;color:#64748b;margin-top:2px;display:block;">${toName}</span>
                                            </div>
                                        </div>
                                        <div style="margin-bottom:16px;display:flex;align-items:center;">
                                            <span style="color:#3b82f6;font-size:24px;margin-right:18px;min-width:36px;line-height:1;">✉️</span>
                                            <div>
                                                <strong style="color:#1e293b;font-size:17px;display:block;">Email Address</strong>
                                                <span style="font-weight:500;color:#64748b;margin-top:2px;display:block;">${toMail}</span>
                                            </div>
                                        </div>
                                        <div style="display:flex;align-items:center;">
                                            <span style="color:#3b82f6;font-size:24px;margin-right:18px;min-width:36px;line-height:1;">⏱️</span>
                                            <div>
                                                <strong style="color:#1e293b;font-size:17px;display:block;">Valid For</strong>
                                                <span style="font-weight:700;color:#3b82f6;font-size:16px;margin-top:2px;display:block;">15 Minutes</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Clear Action Box -->
                            <p style="color:#64748b;font-size:15px;margin:0 0 30px 0;line-height:1.6;text-align:center;background:#f1f5f9;padding:18px 24px;border-radius:18px;border-left:5px solid #3b82f6;">
                                <strong style="color:#1e293b;">Click below</strong> to securely reset your password right now.
                            </p>

                            <!-- Professional Button -->
                            <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:30px;">
                                <tr>
                                    <td align="center" style="background:linear-gradient(135deg,#3b82f6 0%,#1d4ed8 50%,#1e40af 100%);border-radius:24px;padding:20px 52px;box-shadow:0 12px 40px rgba(59,130,246,0.4),0 5px 20px rgba(59,130,246,0.25),inset 0 1px 0 rgba(255,255,255,0.4);">
                                        <a href="${resetLink}" target="_blank" style="color:#ffffff;font-size:19px;font-weight:800;text-decoration:none;display:block;letter-spacing:0.8px;text-shadow:0 1px 3px rgba(0,0,0,0.15);">
                                            🔑 Reset Password Now
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Security Notice -->
                            <div style="background:#f0fdf4;border-radius:20px;padding:24px 28px;margin-bottom:12px;border-left:5px solid #10b981;">
                                <p style="color:#166534;font-size:15px;margin:0;line-height:1.7;">
                                    <span style="color:#10b981;font-size:18px;margin-right:12px;">✅</span>
                                    <strong style="color:#14532d;">Didn't request this?</strong> No action needed - your account is completely secure.
                                </p>
                            </div>

                        </td>
                    </tr>
                    
                    <!-- Clean Footer -->
                    <tr>
                        <td style="background:#f8fafc;padding:30px 40px;border-top:1px solid #e2e8f0;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <p style="color:#1e293b;font-size:15px;margin:0 0 6px 0;line-height:1.5;font-weight:600;">
                                            <strong style="color:#3b82f6;">MarketPro Ecommerce</strong>
                                        </p>
                                        <p style="color:#64748b;font-size:14px;margin:0;line-height:1.5;">
                                            Professional User platform • Automated security notification
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>

                <!-- Support Section -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin-top:35px;">
                    <tr>
                        <td align="center" style="padding:28px 24px;color:#64748b;font-size:14px;line-height:1.6;background:#ffffff;border-radius:24px;border:1px solid #e2e8f0;box-shadow:0 5px 20px rgba(0,0,0,0.08);">
                            <p style="margin:0 0 8px 0;font-size:15px;">
                                <span style="color:#3b82f6;font-size:18px;">🛠️</span> 24/7 User Support Available
                            </p>
                            <p style="margin:0;font-size:13px;">
                                <strong style="color:#1e293b;">support@marketpro.com</strong>
                            </p>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>
</html>
    `,
  });
};

exports.sendOtpMail = async (toName, toMail, otp) => {
  return transporter.sendMail({
    from: `"MarketPro Ecommerce" <${process.env.EMAIL_USER}>`,
    to: toMail,
    subject: 'Your Password Reset OTP - MarketPro Ecommerce',
    html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>✨ Your Password Reset OTP</title>
</head>
<body style="margin:0;padding:0;background:linear-gradient(135deg,#f0f9ff 0%,#e0f2fe 50%,#f0fdf4 100%);padding:25px 15px;min-width:320px;font-family:'Segoe UI',system-ui,Arial,sans-serif;">
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;max-width:540px;margin:0 auto;">
        <tr>
            <td align="center">
                
                <!-- Premium Glass Card -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(145deg,rgba(255,255,255,0.9) 0%,rgba(255,255,255,0.85) 100%);backdrop-filter:blur(20px);border-radius:32px;border:1px solid rgba(255,255,255,0.6);box-shadow:0 30px 80px rgba(0,0,0,0.15),0 0 40px rgba(99,102,241,0.1),inset 0 1px 0 rgba(255,255,255,0.9);position:relative;overflow:hidden;">
                    
                    <!-- Subtle Glow -->
                    <div style="position:absolute;top:-50%;right:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%);opacity:0.5;"></div>
                    
                    <tr>
                        <td align="center" style="padding:55px 35px 45px 35px;position:relative;">
                            
                            <!-- Beautiful Hero Icon -->
                            <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:30px;position:relative;">
                                <tr>
                                    <td align="center" style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);width:90px;height:90px;border-radius:45px;color:#ffffff;font-size:40px;font-weight:800;box-shadow:0 20px 50px rgba(99,102,241,0.4),0 0 30px rgba(99,102,241,0.2),inset 0 1px 0 rgba(255,255,255,0.4);">
                                        🔐
                                    </td>
                                </tr>
                            </table>

                            <!-- Elegant Title -->
                            <h1 style="color:#1e2937;font-size:28px;font-weight:800;margin:0 0 16px 0;text-align:center;line-height:1.3;background:linear-gradient(135deg,#1e2937,#374151);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
                                Your Magic Reset Code
                            </h1>
                            
                            <!-- Warm Personal Greeting -->
                            <p style="color:#475569;font-size:17px;margin:0 0 35px 0;text-align:center;line-height:1.7;max-width:90%;font-weight:400;">
                                Hey <strong style="color:#1e2937;">${toName}</strong>! ✨<br>
                                <span style="color:#6366f1;">Your 6-digit OTP</span> is ready to help you reset your password securely.
                            </p>

                            <!-- Stunning OTP Display -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#ffffff 0%,#fafbff 100%);border:2px solid #e0e7ff;border-radius:24px;margin-bottom:28px;box-shadow:0 15px 45px rgba(99,102,241,0.15),inset 0 1px 0 rgba(255,255,255,1),0 0 0 1px rgba(99,102,241,0.1);">
                                <tr>
                                    <td align="center" style="padding:40px 30px;">
                                        <p style="color:#64748b;font-size:15px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin:0 0 20px 0;">Verification Code</p>
                                        <p style="color:#1e2937;font-size:48px;font-weight:900;letter-spacing:20px;margin:0;font-family:'Courier New',monospace,serif;line-height:1.1;text-shadow:0 3px 12px rgba(0,0,0,0.1);background:linear-gradient(135deg,#6366f1,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${otp}</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Elegant Expiry Notice -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#fef7ff,#fdf2f8);border:1px solid #f3e8ff;border-radius:16px;margin-bottom:22px;box-shadow:0 6px 20px rgba(168,85,247,0.15);">
                                <tr>
                                    <td style="padding:18px 24px;text-align:center;">
                                        <p style="color:#7c3aed;font-size:16px;font-weight:700;margin:0;line-height:1.4;">
                                            <span style="color:#a855f7;font-size:20px;margin-right:10px;">⏰</span>
                                            <strong>Valid for 10 minutes</strong>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Beautiful Security Card -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid #bbf7d0;border-radius:16px;box-shadow:0 6px 20px rgba(16,185,129,0.15);">
                                <tr>
                                    <td style="padding:18px 24px;text-align:center;">
                                        <p style="color:#166534;font-size:15px;margin:0;line-height:1.6;font-weight:500;">
                                            <span style="color:#10b981;font-size:20px;margin-right:10px;">✅</span>
                                            <strong style="color:#14532d;">Not expecting this?</strong> Your account is safe - just ignore.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                    
                    <!-- Premium Footer -->
                    <tr>
                        <td style="background:linear-gradient(135deg,#f8fafc,#f1f5f9);padding:30px 35px;border-top:1px solid #e5e7eb;text-align:center;position:relative;">
                            <div style="position:absolute;top:15px;right:20px;opacity:0.3;font-size:24px;">✨</div>
                            <p style="color:#6b7280;font-size:15px;margin:0 0 6px 0;line-height:1.4;font-weight:600;">
                                <strong style="color:#6366f1;">MarketPro</strong>
                            </p>
                            <p style="color:#9ca3af;font-size:14px;margin:0;line-height:1.4;">
                                Made with ❤️ for you • Automated message
                            </p>
                        </td>
                    </tr>
                    
                </table>

                <!-- Helpful Support -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;margin-top:30px;">
                    <tr>
                        <td align="center" style="padding:25px 25px;color:#475569;font-size:15px;line-height:1.6;background:#ffffff;border-radius:20px;border:1px solid #e5e7eb;box-shadow:0 12px 35px rgba(0,0,0,0.08);">
                            <p style="margin:0 0 8px 0;font-weight:600;font-size:16px;">
                                <span style="color:#6366f1;font-size:20px;margin-right:10px;">💡</span>
                                Need help entering the code?
                            </p>
                            <p style="margin:0;font-size:14px;">
                                <strong style="color:#1e2937;">support@marketpro.com</strong>
                            </p>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>
</html>
    `,
  });
};
