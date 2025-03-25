import * as math from 'mathjs';

class Cirq {
    constructor(qubits) {
        this.qubits = qubits;
        this.numQubits = qubits.length;
        this.state = math.zeros(1 << this.numQubits).map(() => math.complex(0, 0));
        
        let initialIndex = qubits.reduce((acc, qbit, i) => acc | ((qbit.state[1].re === 1) << i), 0);
        this.state.subset(math.index(initialIndex), math.complex(1, 0));
        this.gates = [];
    }

    applyGate(gate, targets, control = null) {
        this.gates.push({ gate, targets, control });
    }

    applyAllGates() {
        for (const { gate, targets, control } of this.gates) {
            if (gate === 'MEASURE') {
                this.measure(targets[0]);
            } else if (control === null) {
                this._applyMatrix(gate, targets[0]);
            } else {
                this._applyControlledGate(gate, control, targets[0]);
            }
        }
        this.gates = [];
    }

    measure(qubitIndex) {
        const probabilities = this.state.toArray().map(amp => amp.abs() ** 2);
        let rand = Math.random(), cumulative = 0, measuredState = 0;

        for (let i = 0; i < probabilities.length; i++) {
            if ((cumulative += probabilities[i]) > rand) {
                measuredState = i;
                break;
            }
        }

        const bitValue = (measuredState >> qubitIndex) & 1;
        ///console.log(`Measured qubit ${qubitIndex}: |${bitValue}>`);
        
        for (let i = 0; i < (1 << this.numQubits); i++) {
            if (((i >> qubitIndex) & 1) !== bitValue) {
                this.state.subset(math.index(i), math.complex(0, 0));
            }
        }
        return bitValue;
    }

    _applyMatrix(matrix, qubitIndex) {
      if (!Array.isArray(matrix) || matrix.length !== 2 || matrix[0].length !== 2) {
          throw new Error(`Invalid gate matrix for qubit ${qubitIndex}`);
      }
      
      const size = 1 << this.numQubits;
      let newState = math.zeros(size).map(() => math.complex(0, 0));
  
      for (let i = 0; i < size; i++) {
          const bit = (i >> qubitIndex) & 1;
          const i0 = i & ~(1 << qubitIndex);
          const i1 = i0 | (1 << qubitIndex);
  
          newState.subset(
              math.index(i0),
              math.add(newState.subset(math.index(i0)), math.multiply(matrix[0][bit], this.state.subset(math.index(i))))
          );
  
          newState.subset(
              math.index(i1),
              math.add(newState.subset(math.index(i1)), math.multiply(matrix[1][bit], this.state.subset(math.index(i))))
          );
      }
      
      this.state = newState.clone();  // Ensure no reference issues
  }
  

    _applyControlledGate(matrix, control, target) {
        const size = 1 << this.numQubits;
        let newState = math.zeros(size).map(() => math.complex(0, 0));

        for (let i = 0; i < size; i++) {
            if (((i >> control) & 1) === 1) {
                const bit = (i >> target) & 1;
                const i0 = i & ~(1 << target), i1 = i0 | (1 << target);
                
                newState.subset(math.index(i0), math.add(newState.subset(math.index(i0)), math.multiply(matrix[0][bit], this.state.subset(math.index(i)))));
                newState.subset(math.index(i1), math.add(newState.subset(math.index(i1)), math.multiply(matrix[1][bit], this.state.subset(math.index(i)))));
            } else {
                newState.subset(math.index(i), this.state.subset(math.index(i)));
            }
        }
        this.state = newState;
    }

    _formatState() {
      return this.state.toArray()
          .map((amp, i) => amp.equals(math.complex(0, 0)) ? null : 
              `${amp.toString()}|${i.toString(2).padStart(this.numQubits, '0').split("").reverse().join("")}>`)
          .filter(Boolean)
          .join(' + ');
  }  

    simulate() {
        console.log("Initial state:", this._formatState());
        this.applyAllGates();
        console.log("Final state:", this._formatState());
    }

    // Static Gates inside the class
    static Gates = {
        X: [[math.complex(0, 0), math.complex(1, 0)], [math.complex(1, 0), math.complex(0, 0)]],
        Y: [[math.complex(0, 0), math.complex(0, -1)], [math.complex(0, 1), math.complex(0, 0)]],
        Z: [[math.complex(1, 0), math.complex(0, 0)], [math.complex(0, 0), math.complex(-1, 0)]],
        H: [[math.complex(1 / Math.sqrt(2), 0), math.complex(1 / Math.sqrt(2), 0)],
            [math.complex(1 / Math.sqrt(2), 0), math.complex(-1 / Math.sqrt(2), 0)]],
        Rk: (k) => [
          [math.complex(1, 0), math.complex(0, 0)],
          [math.complex(0, 0), math.exp(math.complex(0, Math.PI / (1 << k)))]
        ]
    };
}

export { Cirq };
