document.addEventListener('DOMContentLoaded', function() {
  const calculateButton = document.getElementById('calculate-btn');
  
  calculateButton.addEventListener('click', function() {
    const coffeeWeight = parseFloat(document.getElementById('coffeeWeight').value);
    const currentTDS = parseFloat(document.getElementById('currentTDS').value);
    const targetTDS = parseFloat(document.getElementById('targetTDS').value);

    if (isNaN(coffeeWeight) || isNaN(currentTDS) || isNaN(targetTDS) || coffeeWeight <= 0 || currentTDS <= 0 || targetTDS <= 0) {
      alert("Please enter valid positive numbers.");
      return;
    }

    const finalWeight = (coffeeWeight * currentTDS) / targetTDS;
    const waterToAdd = finalWeight - coffeeWeight;

    // Show the final weight once the calculation is done
    document.getElementById('finalWeight').style.display = 'block';
    document.getElementById('finalWeight').innerText = 'Final Weight (g): ' + finalWeight.toFixed(2);
    document.getElementById('waterToAdd').innerText = 'Water to Add (g): ' + waterToAdd.toFixed(2);
  });
});
