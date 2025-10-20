import { stripe } from "@/lib/stripe/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.text();
    const { cartItems } = body ? JSON.parse(body) : {};

    if (!cartItems || cartItems.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    // ✅ Dynamically get base URL from request
    const origin = request.headers.get("origin") || "https://yourdomain.com";
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [
            item.image?.src?.startsWith("http")
              ? item.image.src
              : "https://via.placeholder.com/150",
          ],
        },
        unit_amount: parseFloat(item.price.replace("$", "")) * 100,
      },
      quantity: item.quantity,
    }));

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/en`,
      cancel_url: `${origin}/en`,
      customer_email: session.user.email,
    });

    return Response.json({ url: stripeSession.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return Response.json(
      { error: "Failed to create Stripe session" },
      { status: 500 }
    );
  }
}
