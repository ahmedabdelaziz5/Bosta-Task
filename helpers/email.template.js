exports.ForgetPasswordTemplate = (newPassword) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        .password {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>Hi <strong>User</strong>,</p>
        <p>Your password has been successfully reset. Below is your new password:</p>
        <p class="password">${newPassword}</p>
        <p>We recommend that you change this password immediately after logging in to ensure your account's security.</p>
        <p>Thank you,<br>The <strong>Bosta</strong> Team</p>
    </div>
</body>
</html>
`;