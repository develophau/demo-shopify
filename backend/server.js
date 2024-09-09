const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const products = [
    { id: 1, name: 'Gaming Computer', type: 'computer', price: 1000 },
    { id: 2, name: 'Office Computer', type: 'computer', price: 800 },
    { id: 3, name: 'Mechanical Keyboard', type: 'keyboard', price: 150 },
    { id: 4, name: 'Standard Keyboard', type: 'keyboard', price: 50 }
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/purchase', (req, res) => {
    const budget = req.body.budget;

    // Lọc ra máy tính và bàn phím, sắp xếp theo giá tăng dần
    const computers = products.filter(p => p.type === 'computer').sort((a, b) => a.price - b.price);
    const keyboards = products.filter(p => p.type === 'keyboard').sort((a, b) => a.price - b.price);

    let totalSpent = 0;
    let pairs = 0;

    // Tính toán số cặp máy tính - bàn phím tối đa
    while (pairs < computers.length && pairs < keyboards.length && totalSpent + computers[pairs].price + keyboards[pairs].price <= budget) {
        totalSpent += computers[pairs].price + keyboards[pairs].price;
        pairs++;
    }

    const remainingBudget = budget - totalSpent;
    const result = {
        pairs,
        totalSpent,
        remainingBudget,
        suggestions: [] // Gợi ý mua thêm
    };

    // Nếu còn ngân sách, đề xuất mua thêm sản phẩm khác
    if (remainingBudget > 0) {
        const remainingComputers = computers.slice(pairs).filter(c => c.price <= remainingBudget);
        const remainingKeyboards = keyboards.slice(pairs).filter(k => k.price <= remainingBudget);
        result.suggestions.push(...remainingComputers, ...remainingKeyboards);
    }

    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
