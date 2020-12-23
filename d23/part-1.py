
def solve(n):
  cups = [9,6,2,7,1,3,8,5,4] # input
  # cups = [3,8,9,1,2,5,4,6,7] # example
  for turn in range(n):
    min_cup = min(cups)
    max_cup = max(cups)
    current = cups[0]
    group = cups[1:4]
    cups = [current] + cups[4:]
    destination = current - 1
    while True:
      if destination in cups:
        break
      destination -= 1
      if destination < min_cup:
        destination = max_cup
    idx = cups.index(destination)
    cups = cups[:idx + 1] + group + cups[idx + 1:]    
    cups.append(cups.pop(0))
  num_cups = len(cups)
  start = cups.index(1)
  return (cups + cups)[start+1:start+num_cups]



cups = solve(100)
print("".join([str(c) for c in cups]))
