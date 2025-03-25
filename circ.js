import { Cirq } from './sim.js'; 

const qubits = [
  { state: [{ re: 0, im: 0 }, { re: 1, im: 0 }] },
  { state: [{ re: 1, im: 0 }, { re: 0, im: 0 }] },
  { state: [{ re: 0, im: 0 }, { re: 1, im: 0 }] }
];

const circuit = new Cirq(qubits);

// Apply QFT
circuit.applyGate(Cirq.Gates.H, [0]);
circuit.applyGate(Cirq.Gates.Rk(2), [1], 0);
circuit.applyGate(Cirq.Gates.Rk(3), [2], 0);

circuit.applyGate(Cirq.Gates.H, [1]);
circuit.applyGate(Cirq.Gates.Rk(2), [2], 1);

circuit.applyGate(Cirq.Gates.H, [2]);

[circuit.qubits[0], circuit.qubits[2]] = [circuit.qubits[2], circuit.qubits[0]];

console.log("After QFT:");
circuit.simulate();

// Apply Inverse QFT (IQFT)
circuit.applyGate(Cirq.Gates.H, [2]);
circuit.applyGate(Cirq.Gates.Rk(-2), [2], 1);

circuit.applyGate(Cirq.Gates.H, [1]);
circuit.applyGate(Cirq.Gates.Rk(-3), [2], 0);
circuit.applyGate(Cirq.Gates.Rk(-2), [1], 0);

circuit.applyGate(Cirq.Gates.H, [0]);

[circuit.qubits[0], circuit.qubits[2]] = [circuit.qubits[2], circuit.qubits[0]];

console.log("After IQFT:");
circuit.simulate();

// Measure qubits
const measuredBits = [
  circuit.measure(0),
  circuit.measure(1),
  circuit.measure(2)
];

console.log("Measured bits:", measuredBits.join(""));