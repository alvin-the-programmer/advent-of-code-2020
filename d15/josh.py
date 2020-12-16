from datetime import datetime

inputs = [7,14,0,17,11,1,2]

memory = dict()
spoken_twice = set()
prev_num = None
current_turn = 0
print(datetime.now())
while current_turn < 30000000:
    if current_turn < len(inputs):
        turn_num = inputs[current_turn]
        if turn_num in memory:
            memory[turn_num].append(current_turn)
        else:
            memory[turn_num] = [current_turn]
    else:
        if len(memory[prev_num]) > 1:
            arr = memory[prev_num]
            turn_num = arr[-1] - arr[-2]
        else:
            turn_num = 0

        if turn_num in memory:
            memory[turn_num].append(current_turn)
        else:
            memory[turn_num] = [current_turn]

    prev_num = turn_num
    current_turn += 1

print(datetime.now())
print(turn_num)