import random

# Guessing Range and Max number of attempts
lower_bound = 1
upper_bound = 1000
max_attempts = 10

# Generate random number within Lower and upper range
secret_num = random.randint(lower_bound, upper_bound)

# Player's guess


def player_guess():
    while True:
        try:
            guess = int(input(f"Guess a number between {lower_bound} and "
                              f"{upper_bound}: "))
            if lower_bound <= guess <= upper_bound:
                return guess
            else:
                print("Oh no!! This number is out of range!! "
                      "Please enter a number within the range.")
        except ValueError:
            print("Oh!! That's not a number!! Please enter a number in range.")

# Check player guess


def check_guess(guess, secret_num):
    if guess == secret_num:
        return "Woohoo! That's correct!!!"
    elif guess < secret_num:
        return "That number is too low"
    else:
        return "That number is too high"

# Game play - Track the number of guesses and check if the game is over


def game_play():
    attempts = 0
    won = False

    while attempts < max_attempts:
        attempts += 1
        guess = player_guess()
        result = check_guess(guess, secret_num)

        if result == "Woohoo! That's correct!!!":
            print(f"Congratulations! You guessed correctly {secret_num} "
                  f"in {attempts} attempts.")
            won = True
            break
        else:
            print(f"{result}. Try again!")

    if not won:
        print(f"Sorry, you ran out of guesses! The number is {secret_num}.")


if __name__ == "__main__":
    print("Welcome to the Number Guessing Game!!!")
    game_play()
