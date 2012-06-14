/** Class DNASequence **/
(function() {
  Bio.DNASequence = function(seq) {
    Bio.Sequence.call(this, seq, 'ATCG');
  };
  
  var p = PD.extend(Bio.Sequence, Bio.DNASequence);
  
  // Return the complement of the sequence.
  p.complement = function() {
    var bases  = { A: 'T', T: 'A', C: 'G', G: 'C' },
        output = '';
    
    var str = this.seq.split('');
    
    for (var i = 0, l = this.seq.length; i <= l; i++) {
      if (bases[str[i]] != undefined) {
        output += bases[str[i]];
      }
    }
       
    return new this.constructor(output);
  };
  
  // Translate sequence into a protein sequence, returning a new
  // Bio.ProteinSequence object.
  // Currently only translates using standard code (see `this.translateCodon`).
  p.translate = function() {
    var protein = "";
    for (var i = 0, l = this.seq.length; i + 2 < l; i += 3) {
      protein += this.translateCodon(this.seq[i], this.seq[i+1], this.seq[i+2]);
    }
    return new Bio.ProteinSequence(protein);
  };
  
  // Translate a single codon into the equivalent amino acid.
  // Currently only translates using standard code.
  p.translateCodon = function(b1, b2, b3) {
    // Private sub-function
    var base2index = function(base) {
      // Switch is faster than Array#indexOf
      switch(base) {
        case 'T': return 0;
        case 'C': return 1;
        case 'A': return 2;
        case 'G': return 3;
        default: return -1;
      }
    };
    var base1 = base2index(b1),
        base2 = base2index(b2),
        base3 = base2index(b3);
    
    if (base1 == -1 || base2 == -1 || base3 == -1) {
      return '?';
    }
    else {
      return Bio.GeneticCode.STANDARD.ncbiString[base1 * 16 + base2 * 4 + base3];
    }
  };
}());