def solve
  deck_1, deck_2 = get_input
  winner, winner_deck = play_iter(deck_1, deck_2)
  score = 0
  winner_deck.reverse.each_with_index { |val, idx| score += val * (idx + 1) }
  score
end


def play_iter(deck_1, deck_2)
  deck_1, deck_2 = get_input
  
  while !deck_1.empty? && !deck_2.empty?
    card_1 = deck_1.shift
    card_2 = deck_2.shift
    if card_1 > card_2
      deck_1 += [ card_1, card_2 ]
    else
      deck_2 += [ card_2, card_1 ]
    end
  end


  if deck_2.empty?
    return [1, deck_1]
  else
    return [2, deck_2]
  end
end

def get_input
  file = File.open("input")
  text = file.read
  chunks = text.split("\n\n")
  chunks.map { |chunk| parse_deck(chunk) }
end

def parse_deck(chunk)
  chunk.split("\n")[1..].map(&:to_i)
end


p solve