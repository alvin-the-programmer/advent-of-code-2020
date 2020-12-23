import time

# Circular Linked List w/ references to nodes by value
# n = number of rounds
# m = number of cups
# Linear Complexity
#  O(n) time
#  O(m) space
class CupList:
  def __init__(self, values):
    self.head = self.create_circle(values)
    self.refs = self.create_refs(self.head)
    self.min_value = min(values)
    self.max_value = max(values)

  def simulate(self, n):
    curr = self.head
    for i in range(n):
      triplet_values = self.splice_next_three(curr)
      destination_value = curr.value - 1
      while True:
        if destination_value < self.min_value:
          destination_value = self.max_value
        if destination_value not in triplet_values:
          break
        destination_value -= 1
      insertion_node = self.refs[destination_value]
      triplet_head = self.refs[triplet_values[0]]
      triplet_tail = self.refs[triplet_values[-1]]
      triplet_tail.next = insertion_node.next
      insertion_node.next = triplet_head
      curr = curr.next

  def splice_next_three(self, node):
    count = 0
    spliced_values = []
    splice_tail = node
    while count < 3:
      splice_tail = splice_tail.next
      spliced_values.append(splice_tail.value)
      count += 1
    node.next = splice_tail.next
    splice_tail.next = None
    return spliced_values

  def create_refs(self, head_node):
    refs = {}
    curr = head_node
    while curr.value not in refs:
      refs[curr.value] = curr
      curr = curr.next
    return refs

  def create_circle(self, values):
    head = Node(values[0])
    curr = head
    for value in values[1:]:
      curr.next = Node(value)
      curr = curr.next
    curr.next = head
    return head

class Node:
  def __init__(self, value):
    self.value = value
    self.next = None

def print_list(node, seen):
  if node is None:
    return
  
  if node in seen:
    return

  seen.add(node)
  print(node.value)
  print_list(node.next, seen)

start = time.time()
TEN_MIL = 10000000

arr = [9,6,2,7,1,3,8,5,4] # input

for i in range(10, 1000001):
  arr.append(i)

cl = CupList(arr)
cl.simulate(TEN_MIL)

a = cl.refs[1].next
b = cl.refs[1].next.next
res = a.value * b.value

end = time.time()
print(f"finished in {round(end - start)}s")
print(res);
