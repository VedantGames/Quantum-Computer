# ⚛️ Quantum Simulator JS  

🚀 **Quantum Simulator JS** is a powerful quantum computing simulator built with JavaScript. It enables you to simulate multi-qubit quantum circuits, apply fundamental quantum gates, and perform **Quantum Fourier Transform (QFT)** and **Inverse QFT (IQFT)** with accurate state evolution and measurement.  

---

## 🌟 Features  
✅ **Multi-Qubit Simulation** – Supports quantum circuits with multiple qubits.  
✅ **Quantum Gates** – Includes standard gates like **Hadamard (H), Pauli (X, Y, Z), and Phase Gates**.  
✅ **Quantum Fourier Transform (QFT)** – Implements QFT for fast quantum state transformation.  
✅ **Inverse QFT (IQFT)** – Reverses QFT for quantum signal processing.  
✅ **Measurement & Averaging** – Simulates quantum measurement with depth-based averaging for reliable results.  

---

## 🛠️ Installation  
Clone the repository and install dependencies:  
```bash
git clone https://github.com/yourusername/quantum-simulator-js.git
cd quantum-simulator-js
npm install
```

## 📜 Usage
# Run the simulator:

```bash
node circ.js
Example: Applying QFT & IQFT
```
```javascript
const circuit = new Cirq(3);
circuit.applyQFT();
circuit.measureAll();
circuit.applyIQFT();
circuit.measureAll();
```

## 🧠 How It Works
**State Initialization** – Creates a quantum state vector.

**Gate Operations** – Applies unitary transformations to simulate quantum evolution.

**QFT & IQFT** – Transforms and reconstructs quantum states.

## Measurement – Collapses quantum states and averages results over multiple runs.

🎯 Future Enhancements
🔹 Support for custom quantum gates
🔹 Entanglement operations
🔹 Grover’s & Shor’s algorithm implementation

## 🤝 Contributing
Fork, improve, and submit a pull request! All contributions are welcome.

🔗 GitHub Repository: Quantum Simulator JS