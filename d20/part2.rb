# BROKEN BUT VALIANT EFFORT

require 'set'

class Puzzle
  attr_reader :pieces
  def initialize(block_hash)
    @pieces = block_hash.map { |k, v| Piece.new([k], v) }
  end

  def solve_it_please_make_it_stop
    pool = @pieces.to_set
    while pool.size > 1
      if pool.size % 1 == 0
        puts "------------------"
        puts pool.size.to_s + " pieces remaining"
      end

      pool.each do |piece|
        puts piece.dimension + " " + piece.to_s
        
      end

      matched_pieces = Set.new
      new_pieces = Set.new
      pool.each do |piece_a|
        pool.each do |piece_b|
          a_available = !matched_pieces.include?(piece_a)
          b_available = !matched_pieces.include?(piece_b)
          if piece_a != piece_b && a_available && b_available
            merged = piece_a & piece_b
            if !merged.nil?
              matched_pieces.add(piece_a)
              matched_pieces.add(piece_b)
              new_pieces.add(merged) 
            end
          end
        end
      end

      pool = (pool - matched_pieces) + new_pieces
    end
    puts "******************"
    puts "DONE!"
    puts 
    pool.first.block
  end
end

class Piece
  attr_reader :ids, :block

  def initialize(ids, block)
    @ids = ids
    @block = block
  end

  def to_s
    @ids.join('-')
  end

  def dimension
    h = @block.length
    w = @block[0].length
    h.to_s + 'x' + w.to_s
  end

  def &(other_piece)
    2.times do |flip_num|
      flip_a = flip(@block, flip_num)
      2.times do |other_flip_num|
        flip_b = flip(other_piece.block, other_flip_num)
        4.times do |rot_num|
          flip_rot_a = rotate(flip_a, rot_num)
          4.times do |other_rot_num|
            flip_rot_b = rotate(flip_b, other_rot_num)
            if flip_rot_a.last == flip_rot_b.first
              combined_block = flip_rot_a + flip_rot_b
              combined_ids = @ids + other_piece.ids
              return Piece.new(combined_ids, combined_block)
            end
          end
        end
      end
    end
    nil
  end
end

def rotate(grid, num)
  new_grid = grid
  num.times do
    new_grid = new_grid.transpose.map(&:reverse)
  end
  new_grid
end

def flip(grid, num)
  new_grid = grid
  num.times do
    new_grid = new_grid.reverse
  end
  new_grid
end

BLOCK_SIZE = 10

def trim_borders(block)
  new_rows = []
  (0...block.length).each do |r|
    if !(r % BLOCK_SIZE == 0 || (r + 1) % BLOCK_SIZE == 0)
      new_rows.push([*block[r]])
    end
  end

  trimmed = new_rows.map do |row|
    new_row = []
    row.each_with_index do |val, c|
      if !(c % BLOCK_SIZE == 0 || (c + 1) % BLOCK_SIZE == 0)
        new_row.push(val)
      end
    end
    new_row
  end

  trimmed
end

def print_block(block)
  block.each { |row| puts row.join('')}
end

# file = File.open("example")
file = File.open("input")

text = file.read
chunks = text.split("\n\n")

blocks = {}
chunks.each do |chunk|
  header, *rows = chunk.split("\n")
  block_id = header.split.last[0...-1]
  blocks[block_id] = rows.map { |row| row.split('') }
end

puzzle = Puzzle.new(blocks)
solved_block = puzzle.solve_it_please_make_it_stop
# trimmed = trim_borders(solved_block)
# print_block(trimmed)





