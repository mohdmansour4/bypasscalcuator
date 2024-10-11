<div id="calculator">
    <h2>Coffee Bypass Calculator</h2>

    <label for="coffeeWeight">My Coffee Weighs (g):</label>
    <input type="number" id="coffeeWeight" placeholder="Enter coffee weight" required>

    <label for="currentTDS">Current TDS (%):</label>
    <input type="number" id="currentTDS" placeholder="Enter current TDS" required>

    <label for="targetTDS">Target TDS (%):</label>
    <input type="number" id="targetTDS" placeholder="Enter target TDS" required>

    <button id="calculate-btn">Calculate</button>

    <div class="results">
      <p id="finalWeight" style="display: none;">Final Weight (g): --</p> <!-- Hidden by default -->
      <p id="waterToAdd">Water to Add (g): --</p>
    </div>
</div>
