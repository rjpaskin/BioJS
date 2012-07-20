module('Bio.Sequence', {
  setup: function() {
    Bio.TSequence = function(seq) {
      Bio.Sequence.call(this, seq, 'ABCD');
    }
    
    Bio.extend(Bio.Sequence, Bio.TSequence);
  },
  teardown: function() {
    delete Bio.TSequence;
  }
});

test('Initialises correctly', function() {
  var seq = 'ABCDABCDDCBA',
      obj = new Bio.TSequence(seq);
  
  equal(seq, obj.toString(), 'Assigns sequence correctly');
  equal(seq.length, obj.toString().length, 'Sequence.toString() correct length');
  equal(seq.length, obj.length, 'Sequence correct length');
});

test('Strips out non-DNA letters', function() {
  var seq = ' A\t\rBC\nD+£$abcd',
      obj = new Bio.TSequence(seq);
  
  equal('ABCDABCD', obj.toString(), 'Assigns sequence correctly');
  equal('ABCDABCD'.length, obj.toString().length, 'Sequence.toString() correct length');
  equal('ABCDABCD'.length, obj.length, 'Sequence correct length');
});

test('Count', function() {
  var seq1 = new Bio.TSequence('ABCDABCD'),
      seq2 = new Bio.TSequence('ABCABC'),
      seq3 = new Bio.TSequence('AAAA'),
      seq4 = new Bio.TSequence('A');
      
  equal(2, seq1.count('A'), 'Counts sequence correctly');
  equal(0, seq2.count('D'), 'Zero-count for letter not in sequence');
  equal(0, seq1.count('Z'), 'Zero-count for illegal letter');
  equal(4, seq3.count('A'), 'Counts homogenous sequence correctly');
  equal(1, seq4.count('A'), 'Counts single-letter sequence correctly');
});

test('Composition', function() {
  var seq1 = new Bio.TSequence('ABCDABCD'),
      seq2 = new Bio.TSequence('ABCABC'),
      seq3 = new Bio.TSequence('AAAA'),
      seq4 = new Bio.TSequence('A');
      
  deepEqual({ A: 2, B: 2, C: 2, D: 2 }, seq1.composition(), 'Correct composition');
  deepEqual({ A: 2, B: 2, C: 2 }, seq2.composition(), 'Correct composition if missing a letter');
  deepEqual({ A: 4 }, seq3.composition(), 'Homogenous sequence correct');
  deepEqual({ A: 1 }, seq4.composition(), 'Single-letter sequence correct');
});

test('Reverse', function() {
  var orig  = 'ABCDABCD',
      rev_s = 'DCBADCBA',
      seq   = new Bio.TSequence(orig),
      rev   = new Bio.TSequence(rev_s);
  
  notEqual(seq.toString(), seq.reverse().toString(), "Doesn't affect original object");
  
  equal(rev_s, seq.reverse().toString(), 'Reverses correctly');
  deepEqual(rev, seq.reverse(), 'Produces identical object');
  
  equal(orig, seq.reverse().reverse().toString(), 'Reverses a reversed sequence correctly');
  deepEqual(seq, seq.reverse().reverse(), 'Produces identical object for reversed reverse');
});


