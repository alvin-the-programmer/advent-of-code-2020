def solve(filename)
  tiles = get_input(filename)
  flip_count = Hash.new { |h, k| h[k] = 0 }

  tiles.each do |tile|
    coordinate = get_coordinate(tile)
    flip_count[coordinate] += 1
  end
  flip_count.count { |k, v| v.odd? }
end

def get_coordinate(directions)
  delta = {
    "e" => [+1, -1, 0],
    "w" => [-1, +1, 0],
    "ne" => [+1, 0, -1],
    "sw" => [-1, 0, +1],
    "nw" => [0, +1, -1],
    "se" => [0, -1, +1]
  }
  origin = [0, 0, 0]
  directions.inject(origin) { |coord, direction| add_coordinates(coord, delta[direction]) }
end

def add_coordinates(hex_1, hex_2)
  hex_1.map.with_index { |val, idx| val + hex_2[idx] }
end

def get_input(filename)
  file = File.open(filename)
  text = file.read
  lines = text.split("\n")
  lines.map { |line| parse_line(line) }
end

def parse_line(line)
  tokens = []
  i = 0
  while i < line.length
    if line[i] == "s" || line[i] == "n"
      tokens << line[i..i+1]
      i += 2
    else
      tokens << line[i]
      i += 1
    end
  end
  tokens
end

p solve("input")