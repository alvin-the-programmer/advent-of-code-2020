mod = 20201227

def get_loop_size(subject_number, public_key):
  value = 1
  loop = 0
  while value != public_key:
    value = (value * subject_number) % mod
    loop += 1
  return loop

def transform(size, public_key):
  value = 1
  for i in range(size):
    value = (value * public_key) % mod
  return value


# example
# card_public = 5764801
# door_public = 17807724

#input
card_public = 13316116
door_public = 13651422

card_size = get_loop_size(7, card_public)
door_size = get_loop_size(7, door_public)
print(card_size)
print(door_size)
encryption_key = transform(door_size, card_public)
print(encryption_key)

