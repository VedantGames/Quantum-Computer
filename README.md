
<body>

<div class="container">
    <h1>⚛️ Quantum Simulator JS</h1>
    <p>🚀 <strong>Quantum Simulator JS</strong> is a powerful quantum computing simulator built with JavaScript. It enables you to simulate multi-qubit quantum circuits, apply fundamental quantum gates, and perform <strong>Quantum Fourier Transform (QFT)</strong> and <strong>Inverse QFT (IQFT)</strong> with accurate state evolution and measurement.</p>

<hr>

<h2>🌟 Features</h2>
    <ul>
        <li>✅ <strong>Multi-Qubit Simulation</strong> – Supports quantum circuits with multiple qubits.</li>
        <li>✅ <strong>Quantum Gates</strong> – Includes standard gates like <strong>Hadamard (H), Pauli (X, Y, Z), and Phase Gates</strong>.</li>
        <li>✅ <strong>Quantum Fourier Transform (QFT)</strong> – Implements QFT for fast quantum state transformation.</li>
        <li>✅ <strong>Inverse QFT (IQFT)</strong> – Reverses QFT for quantum signal processing.</li>
        <li>✅ <strong>Measurement & Averaging</strong> – Simulates quantum measurement with depth-based averaging for reliable results.</li>
    </ul>

<hr>

<h2>🛠️ Installation</h2>
    <p>Clone the repository and install dependencies:</p>
    <pre><code>npm i quantum-computer</code></pre>

<h2>📜 Usage</h2>
    <h3>Run the simulator:</h3>
    <pre><code>node circ.js</code></pre>

<h3>Example: Applying QFT & IQFT</h3>
    <pre><code>const circuit = new Cirq(3);
circuit.applyQFT();
circuit.measureAll();
circuit.applyIQFT();
circuit.measureAll();</code></pre>

<hr>

<h2>🧠 How It Works</h2>
    <ul>
        <li><strong>State Initialization</strong> – Creates a quantum state vector.</li>
        <li><strong>Gate Operations</strong> – Applies unitary transformations to simulate quantum evolution.</li>
        <li><strong>QFT & IQFT</strong> – Transforms and reconstructs quantum states.</li>
        <li><strong>Measurement</strong> – Collapses quantum states and averages results over multiple runs.</li>
    </ul>

<h2>🎯 Future Enhancements</h2>
    <ul>
        <li>🔹 Support for custom quantum gates</li>
        <li>🔹 Entanglement operations</li>
        <li>🔹 Grover’s & Shor’s algorithm implementation</li>
    </ul>

<h2>🤝 Contributing</h2>
    <p>Fork, improve, and submit a pull request! All contributions are welcome.</p>

<h3>🔗 GitHub Repository: <a href="#">Quantum Simulator JS</a></h3>
</div>

</body>
