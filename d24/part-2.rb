require("set")

DELTA = {
  "e" => [+1, -1, 0],
  "w" => [-1, +1, 0],
  "ne" => [+1, 0, -1],
  "sw" => [-1, 0, +1],
  "nw" => [0, +1, -1],
  "se" => [0, -1, +1]
}

def solve(filename)
  tiles = get_input(filename)
  flip_count = Hash.new { |h, k| h[k] = 0 }

  tiles.each do |tile|
    coordinate = get_coordinate(tile)
    flip_count[coordinate] += 1
  end
  
  active_coordinates = flip_count.select { |k, v| v.odd? }.keys
  active = Set.new(active_coordinates)

  (100).times do |round|
    active = simulate_round(active)
    puts "Day #{round + 1}: #{active.size}"
  end

  active.size
end

def simulate_round(active)
  new_active = Set.new
  
  potential_nodes = Hash.new { |h, k| h[k] = 0 }

  active.each do |node|
    neighbors = get_neighbors(node)
    active_neighbor_count = neighbors.count { |neighbor| active.include?(neighbor) }
    if active_neighbor_count == 1 || active_neighbor_count == 2
      new_active.add(node)
    end

    neighbors.each { |neighbor| potential_nodes[neighbor] += 1}
  end

  potential_nodes.each { |node, num_adj| new_active.add(node) if num_adj == 2 }
  new_active
end

def get_neighbors(coordinate)
  DELTA.map { |k, v| add_coordinates(coordinate, v) }
end

def get_coordinate(directions)
  origin = [0, 0, 0]
  directions.inject(origin) { |coord, direction| add_coordinates(coord, DELTA[direction]) }
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