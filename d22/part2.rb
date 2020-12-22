require 'set'
def solve
  deck_1, deck_2 = get_input
  winner, winning_deck = play_game(deck_1, deck_2, Set.new)
  score = 0
  winning_deck.reverse.each_with_index { |val, idx| score += val * (idx + 1) }
  score
end

$game_count = 1

def play_game(deck_1, deck_2, history, game_num=1, round_num=1)
  # puts ""
  # puts "-- Round #{round_num} (Game #{game_num}) --"
  # puts "Player 1's deck: #{deck_1.to_s}"
  # puts "Player 2's deck: #{deck_2.to_s}"

  state = deck_1.to_s + "-" + deck_2.to_s
  return [ 1, deck_1 ] if history.include?(state)
  
  history.add(state)

  if deck_2.empty?
    # puts "The winner of game #{game_num} is player 1"
    return [ 1, deck_1 ]
  end

  if deck_1.empty?
    # puts "The winner of game #{game_num} is player 2"
    return [ 2, deck_2 ]
  end

  card_1 = deck_1.shift
  card_2 = deck_2.shift
  # puts "Player 1 plays: #{card_1}"
  # puts "Player 2 plays: #{card_2}"

  if deck_1.length >= card_1 && deck_2.length >= card_2
    next_deck_1 = deck_1[0...card_1]
    next_deck_2 = deck_2[0...card_2]
    $game_count += 1
    winner, winner_deck = play_game(next_deck_1, next_deck_2, Set.new, $game_count)
    if winner == 1
      next_deck_1 = deck_1 + [ card_1, card_2 ]
      next_deck_2 = [ *deck_2 ]
      return play_game(next_deck_1, next_deck_2, history, game_num, round_num + 1)
    else 
      next_deck_1 = [ *deck_1 ]
      next_deck_2 = deck_2 + [ card_2, card_1 ]
      return play_game(next_deck_1, next_deck_2, history, game_num, round_num + 1)
    end
  else
    if card_1 > card_2
      next_deck_1 = deck_1 + [ card_1, card_2 ]
      next_deck_2 = [ *deck_2 ]
      return play_game(next_deck_1, next_deck_2, history, game_num, round_num + 1)
    else 
      next_deck_1 = [ *deck_1 ]
      next_deck_2 = deck_2 + [ card_2, card_1 ]
      return play_game(next_deck_1, next_deck_2, history, game_num, round_num + 1)
    end
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