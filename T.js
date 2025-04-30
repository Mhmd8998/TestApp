app.post('/withdraw-multiple', (req, res) => {
    const { products, userId } = req.body; // products: قائمة المنتجات مع الكميات
    const date = new Date().toISOString();

    // تحقق من كل منتج وحفظ العمليات
    const errors = [];
    products.forEach((product) => {
        const { productId, quantity } = product;

        db.get(`SELECT * FROM products WHERE id = ?`, [productId], (err, productData) => {
            if (err || !productData) {
                errors.push({ productId, error: 'Product not found' });
                return;
            }
            if (productData.quantity < quantity) {
                errors.push({ productId, error: 'Not enough stock available' });
                return;
            }

            // تحديث الكمية في المخزون
            const newQuantity = productData.quantity - quantity;
            db.run(`UPDATE products SET quantity = ? WHERE id = ?`, [newQuantity, productId], (updateErr) => {
                if (updateErr) {
                    errors.push({ productId, error: 'Failed to update stock' });
                    return;
                }

                // تسجيل عملية السحب
                db.run(`INSERT INTO withdrawals (product_id, user_id, quantity, date) VALUES (?, ?, ?, ?)`,
                    [productId, userId, quantity, date], (insertErr) => {
                        if (insertErr) {
                            errors.push({ productId, error: 'Failed to record withdrawal' });
                        }
                    });
            });
        });
    });

    // الرد النهائي بعد معالجة جميع المنتجات
    if (errors.length > 0) {
        res.status(400).json({ message: 'Some errors occurred', details: errors });
    } else {
        res.json({ message: 'Products withdrawn successfully!' });
    }
});
