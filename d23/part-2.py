from os import system
import time

def solve(n):
  cups = [9,6,2,7,1,3,8,5,4] # input
  # cups = [3,8,9,1,2,5,4,6,7] # example
  max_cup = max(cups)
  min_cup = min(cups)

  for i in range(max_cup, 1000001):
    cups.append(i)

  max_cup = max(cups)

  last_percent = 0
  for turn in range(n):
    percent = round(turn / n, 5)
    if percent != last_percent:
      system("clear")
      print(percent)
      last_percent = percent
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
  return cups[start + 1: start + 3]


start = time.time()
a, b = solve(10000000)
# a, b = solve(100)

print(a*b)
end = time.time()
print(f"finished in {round(end - start, 2)} seconds")
