import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

type OrderEmailProps = {
  to: string;
  customerName: string;
  orderId: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  address: string;
  payment?: string;
};

export async function sendOrderConfirmationEmail({
  to,
  customerName,
  orderId,
  items,
  total,
  address,
  payment,
}: OrderEmailProps) {
  const paymentLabel =
    payment === "gcash" ? "GCash" :
    payment === "card" ? "Credit / Debit Card" :
    "Cash on Delivery";

  const itemRows = items.map((item) => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid #f0f0f0;">${item.name}</td>
      <td style="padding:10px;border-bottom:1px solid #f0f0f0;text-align:center;">${item.quantity}</td>
      <td style="padding:10px;border-bottom:1px solid #f0f0f0;text-align:right;">&#8369;${(item.price * item.quantity).toFixed(2)}</td>
    </tr>`).join("");

  await transporter.sendMail({
    from: `"Tela Bazaar" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Order Confirmed — Tela Bazaar #${orderId.slice(0, 8).toUpperCase()}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:0;">
        <div style="background:#1a1a1a;padding:32px;text-align:center;">
          <h1 style="color:#f59e0b;margin:0;font-size:24px;letter-spacing:-1px;">Tela Bazaar</h1>
          <p style="color:#666;font-size:12px;margin:4px 0 0;letter-spacing:2px;text-transform:uppercase;">Mura at Maganda</p>
        </div>
        <div style="background:#fff;padding:40px 32px;">
          <h2 style="margin:0 0 8px;font-size:22px;color:#111;">Order Confirmed! &#127881;</h2>
          <p style="color:#666;margin:0 0 24px;">Hi ${customerName}, your order has been received and is being processed.</p>
          <div style="background:#f5f5f5;border-radius:8px;padding:16px;margin-bottom:24px;">
            <p style="margin:0;font-size:13px;color:#888;">Order ID</p>
            <p style="margin:4px 0 0;font-family:monospace;font-size:15px;color:#111;">#${orderId.slice(0, 12).toUpperCase()}</p>
          </div>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <thead>
              <tr style="background:#f5f5f5;">
                <th style="padding:10px;text-align:left;font-size:13px;color:#888;">Product</th>
                <th style="padding:10px;text-align:center;font-size:13px;color:#888;">Qty</th>
                <th style="padding:10px;text-align:right;font-size:13px;color:#888;">Price</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>
          <div style="border-top:2px solid #111;padding-top:16px;margin-bottom:24px;display:flex;justify-content:space-between;">
            <span style="font-weight:bold;font-size:16px;">Total</span>
            <span style="font-weight:bold;font-size:16px;color:#f59e0b;">&#8369;${total.toFixed(2)}</span>
          </div>
          <div style="background:#f5f5f5;border-radius:8px;padding:16px;margin-bottom:16px;">
            <p style="margin:0;font-size:13px;color:#888;">Delivering to</p>
            <p style="margin:4px 0 0;font-size:15px;color:#111;">${address}</p>
          </div>
          <div style="background:#f5f5f5;border-radius:8px;padding:16px;margin-bottom:32px;">
            <p style="margin:0;font-size:13px;color:#888;">Payment method</p>
            <p style="margin:4px 0 0;font-size:15px;color:#111;">${paymentLabel}</p>
          </div>
          <p style="color:#666;font-size:14px;margin:0;">Estimated delivery: <strong>3-5 business days</strong></p>
        </div>
        <div style="background:#f5f5f5;padding:24px 32px;text-align:center;">
          <p style="margin:0;font-size:13px;color:#999;">&#169; 2026 Tela Bazaar. All rights reserved.</p>
        </div>
      </div>
    `,
  });
}

type WelcomeEmailProps = {
  to: string;
  customerName: string;
};

export async function sendWelcomeEmail({ to, customerName }: WelcomeEmailProps) {
  await transporter.sendMail({
    from: `"Tela Bazaar" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Welcome to Tela Bazaar, ${customerName}!`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:0;">
        <div style="background:#1a1a1a;padding:32px;text-align:center;">
          <h1 style="color:#f59e0b;margin:0;font-size:24px;">Tela Bazaar</h1>
          <p style="color:#666;font-size:12px;margin:4px 0 0;letter-spacing:2px;text-transform:uppercase;">Mura at Maganda</p>
        </div>
        <div style="background:#fff;padding:40px 32px;text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">&#127881;</div>
          <h2 style="margin:0 0 8px;font-size:24px;color:#111;">Welcome, ${customerName}!</h2>
          <p style="color:#666;margin:0 0 32px;font-size:16px;">Your Tela Bazaar account has been created. Start shopping now!</p>
          <a href="${process.env.NEXTAUTH_URL}/shop" style="display:inline-block;background:#f59e0b;color:#000;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:15px;margin-bottom:32px;">
            Shop Now &#8594;
          </a>
          <div style="border-top:1px solid #f0f0f0;padding-top:32px;">
            <div style="display:flex;justify-content:center;gap:32px;">
              ${[
                { icon: "&#129525;", label: "Fabrics" },
                { icon: "&#128247;", label: "Clothing" },
                { icon: "&#9986;", label: "Accessories" },
                { icon: "&#129521;", label: "Sinulid" },
              ].map((item) => `
                <div style="text-align:center;">
                  <div style="font-size:24px;margin-bottom:4px;">${item.icon}</div>
                  <div style="font-size:12px;color:#888;">${item.label}</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
        <div style="background:#1a1a1a;padding:24px 32px;text-align:center;">
          <p style="margin:0;font-size:13px;color:#666;">&#169; 2026 Tela Bazaar. All rights reserved.</p>
        </div>
      </div>
    `,
  });
}