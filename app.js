// SoilSense AI - Main Application Logic
// Built by Praise Becklyn & Faith Mumbe

const form = document.getElementById('soilForm');
const formSection = document.getElementById('formSection');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');

// Form submission handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        farmerName: document.getElementById('farmerName').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        ph: parseFloat(document.getElementById('ph').value),
        nitrogen: document.getElementById('nitrogen').value,
        phosphorus: document.getElementById('phosphorus').value,
        farmSize: parseFloat(document.getElementById('farmSize').value),
        crop: document.getElementById('crop').value
    };

    // Show loading state
    formSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');

    // Simulate AI processing time
    await new Promise(r => setTimeout(r, 2500));

    // Generate smart recommendations
    const recommendations = generateSmartRecommendations(data);
    displayResults(recommendations);

    // Show results
    loadingSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
});

// ENHANCED AI FUNCTION - Generates intelligent recommendations
function generateSmartRecommendations(data) {
    const recommendations = [];
    let totalCost = 0;
    let analysis = '';
    let yieldIncrease = '';

    // ADVANCED pH ANALYSIS
    if (data.ph < 5.0) {
        analysis = `⚠️ Critical Alert: Your soil pH of ${data.ph} is severely acidic. At this level, aluminum toxicity can occur, and essential nutrients like phosphorus, calcium, and magnesium are locked up. Your ${data.crop} plants are likely struggling to access nutrients even when fertilizers are applied. This is the PRIMARY issue affecting your farm's productivity. `;

        const limeNeeded = data.farmSize * 2.5;
        const limeCost = limeNeeded * 3000;
        recommendations.push({
            product: '🔸 Agricultural Lime (Priority #1)',
            details: `${limeNeeded.toFixed(1)} tonnes needed`,
            cost: limeCost,
            where: 'MEA Ltd Kiambu, Farmers Co-op, or Twiga Chemical',
            action: 'Apply 2-3 months before planting. Spread evenly and incorporate into top 15cm of soil. Re-test pH after 3 months.',
            impact: 'Will raise pH to 6.0-6.5 (optimal range)'
        });
        totalCost += limeCost;
        yieldIncrease = '40-50%';

    } else if (data.ph < 5.5) {
        analysis = `Your soil pH of ${data.ph} indicates moderate acidity, very common in Kiambu due to high rainfall and intensive farming. This acidity reduces fertilizer efficiency by up to 50% - meaning half your fertilizer investment is wasted. `;

        const limeNeeded = data.farmSize * 2;
        const limeCost = limeNeeded * 3000;
        recommendations.push({
            product: '🔸 Agricultural Lime',
            details: `${limeNeeded.toFixed(1)} tonnes`,
            cost: limeCost,
            where: 'Local Agro-vets in Kiambu town or Ruiru',
            action: 'Apply 2 months before planting. Mix well with soil.',
            impact: 'Unlocks existing soil nutrients'
        });
        totalCost += limeCost;
        yieldIncrease = '30-40%';

    } else if (data.ph >= 5.5 && data.ph <= 6.8) {
        analysis = `Excellent! Your soil pH of ${data.ph} is in the optimal range for ${data.crop}. Nutrients are readily available. `;
        yieldIncrease = '20-30%';

    } else {
        analysis = `Your pH of ${data.ph} is slightly alkaline. While less common in Kiambu, this can limit micronutrient availability. `;
        yieldIncrease = '15-25%';
    }

    // NITROGEN ANALYSIS
    if (data.nitrogen === 'Low') {
        analysis += `\n\n🍃 Nitrogen Deficiency Detected: The yellowing leaves you're seeing are a classic sign. Nitrogen is crucial for leaf growth and chlorophyll production. For ${data.crop}, this directly reduces your yield potential. `;

        const canNeeded = data.farmSize * 50;
        const canCost = canNeeded * 95;
        recommendations.push({
            product: '🔸 CAN (Calcium Ammonium Nitrate 26%)',
            details: `${canNeeded} kg (split into 2 applications)`,
            cost: canCost,
            where: 'Any agro-vet in Kiambu',
            action: `First application: ${(canNeeded * 0.6).toFixed(0)}kg at planting. Second: ${(canNeeded * 0.4).toFixed(0)}kg 4-6 weeks later`,
            impact: 'Visible greening within 7-10 days'
        });
        totalCost += canCost;

    } else if (data.nitrogen === 'Medium') {
        analysis += `\n\n🍃 Nitrogen levels are adequate but can be optimized. `;
        const canNeeded = data.farmSize * 30;
        const canCost = canNeeded * 95;
        recommendations.push({
            product: '🔸 CAN (Maintenance)',
            details: `${canNeeded} kg`,
            cost: canCost,
            where: 'Local agro-vet',
            action: 'Apply at planting and top-dress at 4 weeks',
            impact: 'Maintains healthy growth'
        });
        totalCost += canCost;
    }

    // PHOSPHORUS ANALYSIS
    if (data.phosphorus === 'Low') {
        analysis += `\n\n🌱 Phosphorus Deficiency: This affects root development, flowering, and fruiting. For ${data.crop}, poor roots mean poor nutrient uptake and lower yields. `;

        const dapNeeded = data.farmSize * 50;
        const dapCost = dapNeeded * 90;
        recommendations.push({
            product: '🔸 DAP (Di-Ammonium Phosphate 18-46-0)',
            details: `${dapNeeded} kg`,
            cost: dapCost,
            where: 'Agro-vets, Twiga Chemical',
            action: 'Apply at planting time, place near roots',
            impact: 'Stronger roots, better establishment'
        });
        totalCost += dapCost;
    }

    // ORGANIC MATTER (ALWAYS RECOMMENDED)
    const compostNeeded = data.farmSize * 5;
    const compostCost = compostNeeded * 800;
    analysis += `\n\n🌾 Organic Matter: Critical for Kiambu's heavy clay soils. Improves water retention during dry spells and drainage during rains. `;

    recommendations.push({
        product: '🔸 Well-Decomposed Cattle Manure or Compost',
        details: `${compostNeeded.toFixed(1)} tonnes`,
        cost: compostCost,
        where: 'Local dairy farmers, or make your own compost',
        action: 'Apply 2 weeks before planting. Mix into top 20cm of soil',
        impact: 'Long-term soil health, 15-20% water savings'
    });
    totalCost += compostCost;

    // COST-BENEFIT ANALYSIS
    const averageYieldValue = {
        'Maize': 80000,
        'Beans': 90000,
        'Kale': 120000,
        'Cabbage': 150000,
        'Potatoes': 200000,
        'Coffee': 180000,
        'Tea': 160000,
        'Tomatoes': 140000
    };

    const currentValue = (averageYieldValue[data.crop] || 80000) * data.farmSize;
    const increasePercent = parseInt(yieldIncrease) / 100;
    const expectedGain = currentValue * increasePercent;
    const roi = ((expectedGain - totalCost) / totalCost * 100).toFixed(0);

    return {
        analysis,
        recommendations,
        totalCost,
        yieldIncrease,
        expectedGain,
        roi,
        timeline: data.ph < 5.5
            ? '📅 Timeline: Start with lime application now. Wait 2-3 months, then plant with fertilizers. See full results in one growing season.'
            : '📅 Timeline: Apply manure 2 weeks before planting. Fertilizers at planting and topdressing. Full results in one season.',
        farmerName: data.farmerName,
        location: data.location
    };
}

// Display results in a user-friendly format
function displayResults(results) {
    document.getElementById('analysisText').innerHTML = results.analysis.replace(/\n\n/g, '<br><br>');

    const productsHtml = results.recommendations.map(p => `
        <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #10b981;">
            <h4 style="color: #059669; margin-bottom: 0.5rem;">${p.product}</h4>
            <p style="margin: 0.5rem 0;"><strong>📦 Quantity:</strong> ${p.details}</p>
            <p style="margin: 0.5rem 0;"><strong>💰 Cost:</strong> KES ${p.cost.toLocaleString()}</p>
            <p style="margin: 0.5rem 0;"><strong>🏪 Where to buy:</strong> ${p.where}</p>
            <p style="margin: 0.5rem 0;"><strong>✅ How to apply:</strong> ${p.action}</p>
            <p style="margin: 0.5rem 0; color: #059669;"><strong>📈 Impact:</strong> ${p.impact}</p>
        </div>
    `).join('');

    document.getElementById('productsContainer').innerHTML = productsHtml;

    document.getElementById('totalCost').innerHTML = `
        <strong>KES ${results.totalCost.toLocaleString()}</strong><br>
        <small style="color: #6b7280;">Expected Revenue Increase: KES ${results.expectedGain.toLocaleString()}</small><br>
        <small style="color: #059669; font-weight: bold;">ROI: ${results.roi}% return on investment</small>
    `;

    document.getElementById('yieldIncrease').textContent = results.yieldIncrease + ' yield increase';

    // Add personalized closing message
    const closingMessage = `
        <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem; border-left: 4px solid #10b981;">
            <p style="color: #065f46; font-weight: 500;">
                ${results.farmerName}, you're on the right track! Farmers in ${results.location} who followed similar recommendations saw results within one season. 
                Remember: soil health is a journey, not a destination. Start with the priority items and track your progress.
            </p>
            <p style="color: #6b7280; margin-top: 1rem; font-size: 0.9rem;">
                💡 <strong>Pro Tip:</strong> Take photos of your farm now. Compare them in 3 months after applying these recommendations. The transformation will amaze you!
            </p>
        </div>
    `;

    document.getElementById('productsContainer').innerHTML += closingMessage;
}

// Reset form to test another farm
function resetForm() {
    form.reset();
    resultsSection.classList.add('hidden');
    formSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}