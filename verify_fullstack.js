async function run() {
    try {
        const res = await fetch('http://localhost:5000/api/products');
        const products = await res.json();
        if (products.length === 0) {
            console.error('No products found');
            return;
        }
        const pid = products[0]._id;
        console.log('Product ID:', pid);

        const orderRes = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            body: JSON.stringify({
                orderItems: [{
                    name: "Test Item", qty: 1, image: "img.jpg", price: 10,
                    product: pid
                }],
                paymentMethod: "Stripe",
                totalPrice: 10
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (orderRes.ok) {
            const order = await orderRes.json();
            console.log('Order created:', order._id);
        } else {
            console.error('Order creation failed:', await orderRes.text());
        }
    } catch (e) { console.error(e); }
}
run();
