from get_random_number import get_random_number
from get_user_input import get_user_input


def game(username):
    running = True
    has_won = False
    guess_count = 0
    random_integer = get_random_number()
    while running:
        guess = get_user_input()
        if guess == random_integer:
            has_won = True
            running = False
            return username, guess_count, has_won
        elif guess > random_integer:
            return username, guess_count, has_won, "Try lower"
        elif guess < random_integer:
            return username, guess_count, has_won, "Try higher"